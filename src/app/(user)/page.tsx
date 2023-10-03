'use client';
import React from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import PageTitle from '@/components/PageTitle';
import dayjs from 'dayjs';
import NextImage from '@/components/NextImage';
import dateIcon from '../../../public/svg/calendar.svg';
import TrackerTableWrapper from '@/components/Table/TrackerTableWrapper';

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  // React.useEffect(() => {
  //   if (user == null) router.push('/');
  // }, [user]);

  return (
    <>
      <PageTitle
        title={`Today (${dayjs().format('DD.MM.YYYY.')})`}
        icon={
          <NextImage alt='date icon' src={dateIcon} width={25} height={25} />
        }
      />
      <TrackerTableWrapper />
    </>
  );
}
