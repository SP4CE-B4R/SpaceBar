import { useState } from 'react';

import Navbar from '../components/Navbar';
import Feed from '../components/Feed';

import { firestore, postToJSON, fromMillis } from '../lib/firebase';

const LIMIT = 15;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);

    const last = posts[posts.length - 1];
    const cursor = typeof last?.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main className="flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center mt-4">
        <Feed posts={posts} img={true} />
      </div>

      {!loading && !postsEnd && <button className="bg-red-500 rounded-lg p-1 px-6 mt-8 font-bold w-64 self-center" onClick={getMorePosts}>Load more</button>}

      {loading && <div className="loading-dots self-center mt-8"></div>}

    </main>
  );
}