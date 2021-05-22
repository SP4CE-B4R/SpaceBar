import { useState } from 'react';
import { auth, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context';
import { IoLogoGoogle } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


export default function Login(props) {
	const user = null;
	const username = null;

	return (
		<main className="items-center flex justify-center min-h-screen">
			<div className="w-96 p-5 rounded bg-container flex items-center justify-center">
				{
					user ?
						!username ? <UsernameForm /> : <SignOut />
						:
						<SignIn />
				}
			</div>
		</main>
	);
}

function SignIn() {
 const signInWithGoogle = async () => {
 	await auth.signInWithPopup(googleAuthProvider)
 };

 const [email, setEmail] = useState('');
 const [pass, setPass] = useState('');

 const signInWithEmail = (email, pass) => {
 	if (email && pass) {
 		auth.signInWithEmailAndPassword(email, pass)
 		  .then((userCredential) => {
 		    // Signed in
 		    var user = userCredential.user;
 		    // ...
 		  })
 		  .catch((error) => {
 		    var errorCode = error.code;
 		    var errorMessage = error.message;
 		  });
 	}
 };

 return (
 	<div className="inline-block rounded-xl flex flex-col items-center">
 		<h1 className="text-3xl mb-6">Sign In To SpaceBar</h1>
		<button className="bg-dark px-5 rounded p-2 flex items-center justify-center outline-none ring-2 ring-red-500" onClick={signInWithGoogle}>
			<IoLogoGoogle />
			<span className="ml-2">Sign In With Google</span>
		</button>
		<span className="text-gray-200 text-sm mt-5 mb-3">OR</span>
		<form onSubmit={signInWithEmail(email, pass)} className="flex flex-col items-center justify-center">
			<input className="p-1 px-3 m-2 rounded-md bg-dark outline-none focus:ring-2 ring-red-500" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Username or Email" /	>
			<input className="p-1 px-3 m-2 rounded-md bg-dark outline-none focus:ring-2 ring-red-500" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" /	>
			<button disabled={!email || !pass} type="submit" className="bg-red-500 disabled:opacity-50 rounded p-1 px-6 m-2 font-bold">Sign In</button>
		</form>
		
 	</div>
 );
}

function SignOut() {
	return (
		<div className="inline-block rounded-xl flex flex-col items-center">
			<h1 className="text-3xl mb-3">Hey friend! You're already signed in,</h1>
			<h1 className="text-xl mb-2">Would you like to...</h1>
			<div className="flex flex-wrap items-center justify-around"></div>
			<button className="bg-blue-500 rounded p-1 px-6 m-2 font-bold">
				Return to Homepage
			</button>
			<button onClick={() => auth.signOut()} className="bg-red-500 rounded p-1 px-6 m-2 font-bold">
				Sign Out
			</button>
		</div>
	)
}

function UsernameForm() {
	const [formValue, setFormValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false)

	const { user, username } = useContext(UserContext);

	const onChange = (e) => {
		// need to run checks here
	}

	return (
		!username && (
			<div className="inline-block rounded-xl flex flex-col items-center">
				<h1 className="text-3xl mb-3">Time to grab a username!</h1>
				<h1 className="text-xl mb-2">Choose your username</h1>
				<form onSubmit={onSubmit}>
					<input type="text" placeholder="Username" value={formValue} onChange={onChange} />
					<button disabled={!valid} type="submit" className="bg-red-500 disabled:opacity-50 rounded p-1 px-6 m-2 font-bold">I'll go with this one!</button>
				</form>
			</div>
		)
	)
}