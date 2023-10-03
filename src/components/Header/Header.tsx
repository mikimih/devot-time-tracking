'use client';
import NextImage from '@/components/NextImage';
import logo from '../../../public/svg/logo.svg';
import HeaderNavLink from '@/components/Header/HeaderNavLink';
import clockIcon from '../../../public/svg/clock.svg';
import historyIcon from '../../../public/svg/history.svg';
import turnOffIcon from '../../../public/svg/turn-off.svg';
import HeaderButton from '@/components/Header/HeaderButton';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logOut } = useAuth();
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <header className='bg-secondary rounded-[0_0_22px_22px] px-[Clamp(1rem,4.5vw,45px)]'>
      <nav className='mx-auto flex flex-wrap justify-between md:flex-nowrap'>
        <Link href='/' className='flex items-center py-[34px] max-lg:py-[16px]'>
          <NextImage
            alt='devot logo'
            src={logo}
            width={162}
            height={44}
            priority={true}
          />
          <span className='text-l self-center whitespace-nowrap pl-2 pt-[10px] font-bold leading-[0.94em] text-white max-sm:hidden lg:text-2xl'>
            Tracking tool
          </span>
        </Link>
        {user && (
          <>
            <Button
              data-collapse-toggle='navbar-default'
              type='button'
              className='hover:bg-gray my-[34px] inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-2  focus:ring-gray-200 max-lg:my-[16px] md:hidden'
              aria-controls='navbar-default'
              aria-expanded='false'
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='h-5 w-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </Button>
            <div
              className={cn(
                !toggleMenu ? 'hidden' : 'flex',
                ' w-full md:block md:min-h-full md:w-auto'
              )}
              id='navbar-default'
            >
              <ul className='flex flex-col rounded-lg md:min-h-full  md:flex-row '>
                <li className='flex md:min-h-full'>
                  <HeaderNavLink
                    route='/'
                    name='Trackers'
                    icon={clockIcon}
                    customStyle='before:rounded-l-sm'
                  />
                </li>
                <li className='flex md:min-h-full'>
                  <HeaderNavLink
                    route='/history'
                    name='History'
                    icon={historyIcon}
                    customStyle='before:rounded-r-sm'
                  />
                </li>
                <li className='flex'>
                  <HeaderButton
                    name='Logout'
                    icon={turnOffIcon}
                    onClick={async () => await logOut()}
                  />
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
