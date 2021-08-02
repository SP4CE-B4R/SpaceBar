import Link from 'next/link';
import { firestore } from '../lib/firebase';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';


export default function Feed({ posts, admin, img }) {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} img={img} />) : null;
}

function PostItem({ post, admin = false, img = false }) {
  return (
    <div className="bg-container p-4 px-6 rounded-lg w-11/12 md:w-9/12 lg:w-3/5 mt-4 flex flex-row">
      {img &&
        <PostImg uid={post.uid} username={post.username} />
      }
      <div className="mx-4">
        <Link href={`/${post.username}`}>
          <p className="text-xs text-gray-300 cursor-pointer">
            Posted by <a className="text-yellow-300 hover:underline font-bold">@{post.username}</a>
          </p>
        </Link>
        <Link href={`/${post.username}/${post.slug}`}>
          <a className="text-2xl text-green-400 font-bold">{post.title}</a>
        </Link>
        <ReactMarkdown disallowedElements={["img"]}>{post.content.length > 50 ? (post.content.replace(/^(.{250}[^\s]*).*/, "$1") + '...') : post.content}</ReactMarkdown>
      </div>


      {/* If admin view, show extra controls for user 
        {admin && (
          <>
            <Link href={`/admin/${post.slug}`}>
              <h3>
                <button className="btn-blue">Edit</button>
              </h3>
            </Link>

            {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
          </>
        )}
      */}
    </div>
  );
}

function PostImg({ uid, username }) {
  const [photoURL, setPhotoURL] = useState('');

  var userRef = firestore.collection('users').doc(uid);
  userRef.get().then((doc) => {
    if (doc.exists) {
      if (doc.data().photoURL) {
        setPhotoURL(doc.data().photoURL)
      }
    }
  })

  return (
    <div className="mt-2 flex-shrink-0">
      <Link href={`/${username}`}>
        <Image className="rounded-full cursor-pointer" src={photoURL || `https://ui-avatars.com/api/?name=${username}`} width='40' height='40' alt={`${username}'s PFP`} />
      </Link>
    </div>
  )
}