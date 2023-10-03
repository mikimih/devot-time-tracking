'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import NextImage from '@/components/NextImage';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { cn } from '@/lib/utils';
interface HeaderNavLinkProps {
  route: string;
  name: string;
  icon?: string | StaticImport;
  customStyle?: string;
}
function HeaderNavLink(props: HeaderNavLinkProps) {
  const { route, name, icon, customStyle } = props;
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        pathname === route ? 'before:bg-primary-100' : 'before:bg-ghost',
        customStyle,
        'text-lilac relative flex px-[clamp(0.75rem,4.6vw,46px)] text-[15px] font-bold leading-[17px]',
        'hover:before:bg-primary-50 before:bottom-[-3px] before:left-0 before:right-0 before:h-[5px]  before:content-[""] hover:opacity-90 md:before:absolute',
        'max-md:hover:bg-grey w-full  max-md:p-4'
      )}
      href={route}
    >
      {icon ? (
        <div className='flex items-center'>
          <NextImage
            src={icon}
            alt={name}
            height={24}
            width={24}
            className={'mr-2'}
          />{' '}
          {name}
        </div>
      ) : (
        <>{name}</>
      )}
    </Link>
  );
}

export default HeaderNavLink;
