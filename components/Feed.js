import Link from 'next/link';

export default function Feed({ posts, admin }) {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin = false }) {
  return (
    <div className="bg-container m-3 p-3 rounded-xl">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <h2>
        <a>{post.title}</a>
      </h2>

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