import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function AuthCheck(props) {
	const { username } = useContext(UserContext);

	return username ? 
		props.children :
		props.fallback || <Link href="/login">Please Log In or Sign Up</Link>;
}