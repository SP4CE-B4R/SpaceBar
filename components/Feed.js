import Link from 'next/link';
import { firestore } from '../lib/firebase';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';


export default function Feed({ posts, admin }) {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin = false }) {
  const [photoURL, setPhotoURL] = useState('');

  var userRef = firestore.collection('users').doc(post.uid);
  userRef.get().then((doc) => {
    if (doc.exists) {
      if (doc.data().photoURL) {
        setPhotoURL(doc.data().photoURL)
      }
    }
  })


  return (
    <div className="bg-container m-3 p-3 px-6 rounded-lg w-3/5 mt-8">
      <div className="flex flex-row items-start">
        <div className="mt-2">
          <Link href={`/${post.username}`}>
            <Image className="rounded-full cursor-pointer" src={photoURL || `https://ui-avatars.com/api/?name=${post.username}`} width='40' height='40' alt={`${post.username}'s PFP`} />
          </Link>
        </div>
        <div className="mx-4">
          <Link href={`/${post.username}`}>
            <p className="text-xs text-gray-300 cursor-pointer">
              Posted by <a className="text-yellow-400 hover:underline">@{post.username}</a>
            </p>
          </Link>
          <Link href={`/${post.username}/${post.slug}`}>
            <a className="text-2xl text-green-400 font-bold">{post.title}</a>
          </Link>
          <p>{post.content}</p>
        </div>
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