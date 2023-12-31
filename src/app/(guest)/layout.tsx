import Header from '@/components/Header/Header';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import UnprotectedRoute from '@/components/ProtectionRoute/UnprotectedRoute';

export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cn('flex min-h-screen flex-col bg-white')}>
      <UnprotectedRoute>
        <Header />
        <main className='min m-auto flex min-h-[calc(100vh-7rem)] w-[25rem] flex-col justify-center  p-2'>
          {children}
        </main>
      </UnprotectedRoute>
    </div>
  );
}
