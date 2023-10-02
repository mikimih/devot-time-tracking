'use client';
import React from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import PageTitle from '@/components/PageTitle';
import dayjs from 'dayjs';
import NextImage from '@/components/NextImage';
import dateIcon from '../../../public/svg/calendar.svg';
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  // React.useEffect(() => {
  //   if (user == null) router.push('/');
  // }, [user]);

  return <PageTitle title={`Trackers History`} />;
}

export default Page;
