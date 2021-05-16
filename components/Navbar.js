import Link from 'next/link';

export default function Navbar() {
	const user = null;
	const username = null;
	return (
		<nav>
			{username && (
				<div>Username of user</div>
			)}
		</nav>
	)
}