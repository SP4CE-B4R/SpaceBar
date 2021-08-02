import Navbar from '../../components/Navbar';
import Feed from '../../components/Feed';
import Image from 'next/image';

import { getUserWithUsername, postToJSON     } from '../../lib/firebase';

export async function getServerSideProps({ query }) {
	const { username } = query;

	const userDoc = await getUserWithUsername(username);

	let user = null;
	let posts = null;

	if (userDoc) {
		user = userDoc.data();
		const postsQuery = userDoc.ref
			.collection('posts')
			.where('published', '==', true)
			.orderBy('createdAt', 'desc')
			.limit(10);

		posts = (await postsQuery.get()).docs.map(postToJSON);

	}

	return {
		props: { user, posts },
	};
}

export default function UserProfilePage({ user, posts }) {
	return (
		<>
			<Navbar />
			<main className="flex flex-col items-center mt-8">
				<Image className="rounded-full" src={user.photoURL || `https://ui-avatars.com/api/?name=${user.username}`} width='100' height='100' alt={`${user.username}'s PFP`} />
				<h1 className="text-2xl font-bold">@{user.username}</h1>
				<Feed posts={posts} />
			</main>
		</>
	)
}