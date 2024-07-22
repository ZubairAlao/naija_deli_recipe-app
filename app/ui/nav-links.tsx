"use client";

import {
  ArrowRightEndOnRectangleIcon,
  ArrowTrendingUpIcon,
  PlusCircleIcon,
  TagIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import NaijaDeli from './naija-deli';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {signIn, signOut, useSession, getProviders, ClientSafeProvider} from 'next-auth/react';
import Provider from './provider';
import { GreenButton } from './button';
import Image from 'next/image';

type Providers = Record<string, ClientSafeProvider> | null;


export default function NavLinks() {

  const { data: session } = useSession();
  const [providers, setProviders] = useState<Providers>(null);
  const pathname = usePathname();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const router = useRouter();

  const handleSignOut = async () => {
    signOut();
    router.push('/');
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

       setProviders(response);
    }
  
    setUpProviders();
  }, [])


  const isLoggedIn = false


  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
      <div className="flex-between max-w-screen-xl mx-auto px-8 relative py-1.5">
        <Link href="/" onClick={() => setToggleDropdown(false)}>
          <NaijaDeli />
        </Link>
        <button 
          className="h-10 w-10 cursor-pointer md:hidden flex text-[#008000] ml-auto" 
          onClick={() => setToggleDropdown((prev) => !prev)}
        >
          {toggleDropdown ? <XMarkIcon className="h-10 w-10" /> : <Bars3Icon className="h-10 w-10" />}
        </button>

        {/* Mobile Navigation */}
        {toggleDropdown && (
          <div className="bg-white">
            {session?.user ? (
              <div 
                className={`md:hidden flex flex-col items-center absolute top-0 left-0 w-full mt-[52px] py-4 bg-white overflow-hidden transition-max-height duration-500 ${toggleDropdown ? 'max-h-96 border border-t-slate-500' : 'max-h-0'}`}
              >
                <Link
                  href="/profile"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                  className={`flex-center gap-2 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathname === "/profile" ? 'font-bold text-green-600' : ''}`}
                >
                  {session?.user.image && (
                    <Image
                    src={session.user.image}
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="profile"
                    />
                  )}

                  <p>{session?.user?.name}</p>
                </Link>
                <Link
                  href="/create-recipe"
                  className={`flex-center gap-2 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathname === "/create-recipe" ? 'font-bold text-green-600' : ''}`}
                  onClick={() => setToggleDropdown((prev) => !prev)}
                >
                  <PlusCircleIcon className="w-6 block md:hidden" />
                  <p>Create Recipe</p>
                </Link>
                <Link
                  href="/categories"
                  className={`flex-center gap-2 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathname === "/categories" ? 'font-bold text-green-600' : ''}`}
                  onClick={() => setToggleDropdown((prev) => !prev)}
                >
                  <TagIcon className="w-6 block md:hidden" />
                  <p>Categories</p>
                </Link>

                <button 
                  type="button" 
                  onClick={() => { handleSignOut(); setToggleDropdown((prev) => !prev) }}
                  className={`flex-center gap-2 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3`}
                >
                    Sign Out
                </button>

              </div>
            ) : (
              <div 
                className={`md:hidden flex flex-col items-center absolute top-0 left-0 w-full mt-[52px] py-4 bg-white overflow-hidden transition-max-height duration-500 ${toggleDropdown ? 'max-h-96 border border-t-slate-500' : 'max-h-0'}`}
              >
                <Link
                  href="/categories"
                  className={`flex-center gap-2 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathname === "/categories" ? 'font-bold text-green-600' : ''}`}
                  onClick={() => setToggleDropdown((prev) => !prev)}
                >
                  <TagIcon className="w-6 block md:hidden" />
                  <p>Categories</p>
                </Link>
                <>
                {providers &&
                  Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='flex-center gap-2 p-3 text-sm font-medium hover:bg-sky-100 hover:text-orange-600 md:flex-none md:justify-start md:p-2 md:px-3'
                  >
                    <ArrowRightEndOnRectangleIcon className="w-6 block md:hidden" />
                    <p>Sign In</p>
                  </button>
                ))}
                </>
              </div>
            )}
          </div>
        )}

        {/* Desktop Navigation */}
        {session?.user ? (
          <div className="hidden md:flex md:items-center">
            <Link
              href="/create-recipe"
              className={`flex-center gap-2 p-3 text-sm font-medium hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathname === "/create-recipe" ? 'font-bold text-green-600' : ''}`}
            >
              <p>Create Recipe</p>
            </Link>
            <Link
              href="/categories"
              className={`flex-center gap-2 p-3 text-sm font-medium hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathname === "/categories" ? 'font-bold text-green-600' : ''}`}
            >
              <p>Categories</p>
            </Link>
            <Link
              href="/profile"
              className={`flex-center gap-2 p-3 text-sm font-medium hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathname === "/profile" ? 'font-bold text-green-600' : ''}`}
            >
              {session?.user.image && (
                <Image
                  src={session.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              )}
            </Link>

            <button 
              type="button" 
              onClick={handleSignOut}
              className={`flex-center gap-2 p-3 text-sm font-medium hover:text-orange-600 md:flex-none md:justify-start md:p-2 md:px-3`}
            >
                Sign Out
            </button>
          </div>
        ) : (
          <div className="hidden md:flex md:items-center">
            <Link
              href="/categories"
              className={`flex-center gap-2 p-3 text-sm font-medium hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathname === "/categories" ? 'font-bold text-green-600' : ''}`}
            >
              <p>Categories</p>
            </Link>
            <>
                {providers &&
                  Object.values(providers).map((provider) => (
                  <GreenButton
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    <ArrowRightEndOnRectangleIcon className="w-6 inline" />
                    <p>Sign In</p>
                  </GreenButton>
                ))}
              </>
          </div>
        )}
      </div>
    </div>

  );
}
