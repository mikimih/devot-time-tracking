'use client';
import React from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import PageTitle from '@/components/PageTitle';
import TrackerHistoryTableWrapper from '@/components/Table/TrackerHistoryTableWrapper';

export default function Page() {
  const { user } = useAuthContext();

  // React.useEffect(() => {
  //   if (user == null) router.push('/');
  // }, [user]);

  return (
    <>
      <PageTitle title={`Trackers History`} />
      <TrackerHistoryTableWrapper />
    </>
  );
}
