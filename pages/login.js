import { useState, useCallback, useContext, useEffect } from 'react';
import { auth, googleAuthProvider, firestore } from '../lib/firebase';
import { UserContext } from '../lib/context';
import debounce from 'lodash.debounce';
import { IoLogoGoogle } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoCheckmarkSharp } from 'react-icons/io5';
import { IoCloseSharp } from 'react-icons/io5';
import Link from 'next/link';


export default function Login(props) {
  const { user, username } = useContext(UserContext);

  return (
    <main className="items-center flex justify-center min-h-screen">
      <div className="p-5 rounded-xl bg-container flex items-center justify-center">
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
  try {
    await auth.signInWithPopup(googleAuthProvider)  
  } catch (e) {
    console.log(e.message)
  }
  
 };

 const [signup, setSignUp] = useState(false);
 const [email, setEmail] = useState('');
 const [pass, setPass] = useState('');
 const [passConfirm, setPassConfirm] = useState('');

 const authWithEmail = async (e) => {
  e.preventDefault();

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
  <div className="flex flex-col items-center">
    <h1 className="text-3xl mb-6">{!signup ? 'Sign In To' : 'Join'} SpaceBar</h1>
    <button className="bg-dark hover:ring-4 px-5 rounded p-2 transition-all duration-300 ease-in-out flex items-center justify-center outline-none ring ring-red-500" onClick={signInWithGoogle}>
      <IoLogoGoogle />
      <span className="ml-2">Sign {!signup ? 'In' : 'Up'} With Google</span>
    </button>
    <span className="text-gray-200 text-sm mt-5 mb-3">OR</span>
    <form onSubmit={authWithEmail} className="flex flex-col items-center justify-center">
      <input className="p-1 px-3 m-2 transition-all duration-300 ease-in-out rounded-md bg-dark outline-none focus:ring-2 ring-red-500" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder={`${signup? '' : 'Username or '}Email`} /  >
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
      <h1 className="text-3xl text-center mb-8">Hey friend! You're already signed in,</h1>
      <h1 className="text-xl mb-2">Would you like to...</h1>
      <div className="flex flex-wrap items-center">
        <Link href="/">
          <button className="bg-blue-500 rounded p-1 px-6 m-2 font-bold">
            Return to Homepage
          </button>
        </Link>
        <button onClick={() => auth.signOut()} className="bg-red-500 rounded p-1 px-6 m-2 font-bold">
          Sign Out
        </button>
      </div>
      
    </div>
  )
}

function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false)

  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  }

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        setIsValid(!exists);
        setLoading(false);
      }
    },  500), 
    []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`)
    const usernameDoc = firestore.doc(`usernames/${formValue}`)

    const batch = firestore.batch();
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName })
    batch.set(usernameDoc, { uid: user.uid })

    await batch.commit();
  }

  return (
    !username && (
      <div className="inline-block flex flex-col items-center">
        <h1 className="text-3xl mb-3">Time to grab a username!</h1>
        <h1 className="mb-2">Choose your username</h1>
        <form className="flex flex-col items-center justify-center" onSubmit={onSubmit}>
          <div className="flex items-center justify-center m-2 transition-all duration-300 ease-in-out rounded-md bg-dark outline-none active:ring-2 ring-red-500">
            <input className="rounded-md bg-dark p-1 pl-3 outline-none" type="text" placeholder="Username" value={formValue} onChange={onChange} />
            <div className="rounded-md p-1 px-3">
              { loading ? 
                <div className="spinner"></div>
                :
                isValid ? <IoCheckmarkSharp size="1.25em" /> : formValue ? <IoCloseSharp size="1.25em" /> : null
              }
            </div> 
          </div>
          <button disabled={!isValid} type="submit" className="bg-red-500 disabled:opacity-50 rounded p-1 px-6 m-2 font-bold">I'll go with this one!</button>
        </form>
      </div>
    )
  )
}