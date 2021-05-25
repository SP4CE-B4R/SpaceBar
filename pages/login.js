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

 const [signup, setSignUp] = useState(false);
 const [email, setEmail] = useState('');
 const [pass, setPass] = useState('');
 const [passConfirm, setPassConfirm] = useState('');

 const authWithEmail = (email, pass) => {
  if (email && pass) {
    try {
      if (signup) {
        auth.createUserWithEmailAndPassword(email, pass)
      } else {
        auth.signInWithEmailAndPassword(email, pass).then((userCredential) => {var user = userCredential.user;})
      }
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    }
  }
 };

 const authCondition = () => {
  return !signup ? (!email || !pass) : (!email || !pass) || !(pass === passConfirm)
 }

 return (
  <div className="inline-block rounded-xl flex flex-col items-center">
    <h1 className="text-3xl mb-6">{!signup ? 'Sign In To' : 'Join'} SpaceBar</h1>
    <button className="bg-dark hover:ring-4 px-5 rounded p-2 transition-all duration-300 ease-in-out flex items-center justify-center outline-none ring ring-red-500" onClick={signInWithGoogle}>
      <IoLogoGoogle />
      <span className="ml-2">Sign {!signup ? 'In' : 'Up'} With Google</span>
    </button>
    <span className="text-gray-200 text-sm mt-5 mb-3">OR</span>
    <form onSubmit={() => authWithEmail(email, pass)} className="flex flex-col items-center justify-center">
      <input className="p-1 px-3 m-2 transition-all duration-300 ease-in-out rounded-md bg-dark outline-none focus:ring-2 ring-red-500" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Username or Email" /  >
      <input className="p-1 px-3 m-2 transition-all duration-300 ease-in-out rounded-md bg-dark outline-none focus:ring-2 ring-red-500" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" / >
      {
        signup && 
        <input className="p-1 px-3 m-2 transition-all duration-300 ease-in-out rounded-md bg-dark outline-none focus:ring-2 ring-red-500" value={passConfirm} onChange={(e) => setPassConfirm(e.target.value)} type="password" placeholder="Enter Password again" / >
      }
      {
        signup && (pass !== passConfirm) && <span className="text-sm my-1">Passwords do not match!</span>
      }

      <button disabled={authCondition()} type="submit" className="bg-red-500 transition-all duration-300 ease-in-out disabled:opacity-50 rounded p-1 px-6 m-2 font-bold">Sign {!signup ? 'In' : 'Up'}</button>
    </form>

    <button onClick={() => setSignUp(!signup)} className="focus:outline-none transition-all duration-300 ease-in-out mt-4 text-sm text-gray-400 hover:text-white">{!signup ? 'Sign Up' : 'Login'} Instead?</button>
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