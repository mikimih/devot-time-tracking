'use client';
import NextImage from '@/components/NextImage';
import logo from '../../../public/svg/logo.svg';
import HeaderNavLink from '@/components/Header/HeaderNavLink';
import clockIcon from '../../../public/svg/clock.svg';
import historyIcon from '../../../public/svg/history.svg';
import turnOffIcon from '../../../public/svg/turn-off.svg';
import HeaderButton from '@/components/Header/HeaderButton';

function Header() {
  return (
    <header className='bg- bg-secondary flex items-center justify-between rounded-[0_0_22px_22px] px-[45px] py-[34px]'>
      <div className='flex'>
        <NextImage
          alt='devot logo'
          src={logo}
          width={162}
          height={44}
          priority={true}
        />
        <h1 className='pl-2 pt-[18px] text-2xl font-bold leading-[17px] text-white'>
          Tracking tool
        </h1>
      </div>
      <div className='flex items-center'>
        <HeaderNavLink
          route='/'
          name='Trackers'
          icon={clockIcon}
          customStyle='before:rounded-l-sm'
        />
        <HeaderNavLink
          route='/history'
          name='History'
          icon={historyIcon}
          customStyle='before:rounded-r-sm'
        />
        <HeaderButton
          name='Logout'
          icon={turnOffIcon}
          onClick={() => console.log('logout')}
        />
      </div>
    </header>
  );
}

export default Header;
