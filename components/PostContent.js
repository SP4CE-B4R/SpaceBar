import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function PostContent({ post }) {
	const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

	return (
    <div>
      <h1 className="text-green-400 text-2xl font-bold">{post?.title}</h1>
      <span className="text-sm">
        Written by{' '}
        <Link href={`/${post.username}/`}>
          <a className="text-yellow-400">@{post.username}</a>
        </Link>{' '}
        on {createdAt.toISOString()}
      </span>
      <div className="mt-3">
      	<ReactMarkdown>{post?.content}</ReactMarkdown>
      </div>
    </div>
  );
}