import { useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { UserContext } from '../../lib/context';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';

import Navbar from '../../components/Navbar';
import PostContent from '../../components/PostContent';


export async function getStaticProps({ params }) {
	const {username, slug} = params;
	const userDoc = await getUserWithUsername(username);

	let post;
	let path;

	if (userDoc) {
		const postRef = userDoc.ref.collection('posts').doc(slug);
		post = postToJSON(await postRef.get());

		path = postRef.path;
	}

	if (!post.uid) {
		return {
			notFound: true,
		}
	}

	return {
		props: { post, path },
		revalidate: 5000,
	}
}


export async function getStaticPaths() {
	const snapshot = await firestore.collectionGroup('posts').get();

	const paths = snapshot.docs.map((doc) => {
		const { slug, username } = doc.data();
		return {
			params: { username, slug },
		}
	}) 

	return {
		paths,
		fallback: 'blocking',
	}
}

export default function Post(props) {
	const postRef = firestore.doc(props.path);
	const [realTimePost] = useDocumentData(postRef);

	const post = realTimePost || props.post;

	return (
		<>
		<Navbar />
		<main className="flex flex-col items-center mt-8">
			<section className="bg-container p-6 rounded-lg m-2 w-3/5">
				<PostContent post={post} />
			</section>
		</main>
		</>
	)
}