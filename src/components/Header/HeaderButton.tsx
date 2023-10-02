import { MouseEventHandler } from 'react';
import NextImage from '@/components/NextImage';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Button } from 'primereact/button';
interface HeaderNavLinkProps {
  onClick: MouseEventHandler;
  name: string;
  icon?: string | StaticImport;
}
function HeaderNavLink(props: HeaderNavLinkProps) {
  const { name, icon, onClick } = props;
  return (
    <Button
      className='text-lilac text-[15px] font-bold leading-[17px]'
      onClick={onClick}
      type='button'
    >
      {icon ? (
        <div className='flex items-center pl-[50px]'>
          <NextImage src={icon} alt={name} height={24} width={24} /> {name}
        </div>
      ) : (
        <>{name}</>
      )}
    </Button>
  );
}

export default HeaderNavLink;
