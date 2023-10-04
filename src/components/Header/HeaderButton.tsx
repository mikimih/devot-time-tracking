import { MouseEventHandler } from 'react';
import NextImage from '@/components/NextImage';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Button } from 'primereact/button';

interface HeaderNavLinkProps {
  onClick: MouseEventHandler;
  name: string;
  icon?: string | StaticImport;
}

export default function HeaderNavLink(props: HeaderNavLinkProps) {
  const { name, icon, onClick } = props;
  return (
    <Button
      className='text-lilac ml-[50px] w-full text-[15px] font-bold leading-[1.13em] hover:opacity-90  max-md:ml-0 max-md:p-4'
      onClick={onClick}
      type='button'
    >
      {icon ? (
        <div className='flex items-center'>
          <NextImage
            src={icon}
            alt={name}
            height={24}
            width={24}
            className='mr-2'
          />{' '}
          {name}
        </div>
      ) : (
        <>{name}</>
      )}
    </Button>
  );
}
