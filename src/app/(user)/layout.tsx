import Header from '@/components/Header/Header';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cn('flex min-h-screen flex-col bg-white')}>
      <Header />
      <main className='min mt-[80px] flex min-h-[calc(100vh-7rem)] flex-col p-[0_Clamp(1.5rem,12vw,135px)]'>
        {children}
      </main>
    </div>
  );
}
