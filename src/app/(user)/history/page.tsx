import PageTitle from '@/components/PageTitle';
import TrackerHistoryTableWrapper from '@/components/Table/TrackerHistoryTable/TrackerHistoryTableWrapper';

export default function Page() {
  return (
    <>
      <PageTitle title='Trackers History' />
      <TrackerHistoryTableWrapper />
    </>
  );
}
