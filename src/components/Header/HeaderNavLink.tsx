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
        'text-lilac relative px-[46px] text-[15px] font-bold leading-[17px]',
        'before:absolute before:bottom-[-44px] before:left-0 before:right-0 before:h-[5px] before:content-[""]'
      )}
      href={route}
    >
      {icon ? (
        <div className='flex items-center'>
          <NextImage src={icon} alt={name} height={24} width={24} /> {name}
        </div>
      ) : (
        <>{name}</>
      )}
    </Link>
  );
}

export default HeaderNavLink;
