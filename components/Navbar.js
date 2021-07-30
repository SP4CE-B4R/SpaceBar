import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Navbar() {
  const { user, username } = useContext(UserContext)
  return (
    <nav className="p-2">
      <Image className="rounded-full cursor-pointer ml-auto" src={user.photoURL || `https://ui-avatars.com/api/?name=${username}`} width='30' height='30' alt={`${username}'s PFP`} />
    </nav>
  )
}