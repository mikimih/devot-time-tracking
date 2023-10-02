import Header from '@/components/Header/Header';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cn('flex min-h-screen flex-col bg-white')}>
      <Header />
      <main className='min m-auto flex min-h-[calc(100vh-7rem)] w-[25rem] flex-col justify-center  p-2'>
        {children}
      </main>
    </div>
  );
}
