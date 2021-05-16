import { auth, googleAuthProvider } from '../lib/firebase';

export default function Login(props) {
	const user = null;
	const username = null;

	return (
		<main>
			{
				user ?
					!username ? <UsernameForm /> : <SignOut />
					:
					<SignIn />
			}
		</main>
	)
}

function SignIn() {
 const signInWithGoogle = async () => {
 	await auth.signInWithPopup(googleAuthProvider)
 };

 return (
 	
 );
}