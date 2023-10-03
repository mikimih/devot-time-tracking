import React, { ReactElement } from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  customStyle?: string;
  icon?: ReactElement;
}
function PageTitle(props: PageTitleProps) {
  const { title, customStyle, icon } = props;
  return (
    <div
      className={cn(
        customStyle,
        'mb-[32px] flex items-center md:mb-[82px] [&>figure]:mr-4'
      )}
    >
      {icon}
      <h1
        className={cn('text-secondaryDark text-2xl font-bold leading-[17px]')}
      >
        {title}
      </h1>
    </div>
  );
}

export default PageTitle;
