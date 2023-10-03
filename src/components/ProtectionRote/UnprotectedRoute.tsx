'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const UnprotectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [router, user]);
  return <div>{!user ? children : null}</div>;
};

export default UnprotectedRoute;
