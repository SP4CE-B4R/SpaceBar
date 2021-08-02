import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { HiPencilAlt } from "react-icons/hi";
import { IoRocket } from "react-icons/io5";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="p-3 bg-container flex flex-row items-baseline justify-between static">
      <Link href="/"><a className="text-2xl flex items-center">SpaceBar <IoRocket className="ml-1" /></a></Link>
      <div className="flex">
        <button className="border-2 rounded-lg border-white py-1 px-4 flex items-center justify-center mr-4 hover:bg-white hover:text-gray-900 transition duration-200 ease-in-out"><HiPencilAlt className="mr-1" size="1.25em" /> Write</button>
        <Image className="rounded-full cursor-pointer ml-auto" src={user?.photoURL || `https://ui-avatars.com/api/?name=${username}`} width='35' height='35' alt={`${username}'s PFP`} />
      </div>
    </nav>
  )
}