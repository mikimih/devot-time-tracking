import PageTitle from '@/components/PageTitle';
import dayjs from 'dayjs';
import NextImage from '@/components/NextImage';
import dateIcon from '../../../public/svg/calendar.svg';
import TrackerTableWrapper from '@/components/Table/TaskTable/TrackerTableWrapper';

export default function Page() {
  return (
    <>
      <PageTitle
        title={
          <>
            Today{' '}
            <time dateTime={dayjs().format('YYYY-MM-DD')}>
              ({dayjs().format('DD.MM.YYYY.')})
            </time>
          </>
        }
        icon={
          <NextImage alt='date icon' src={dateIcon} width={25} height={25} />
        }
      />
      <TrackerTableWrapper />
    </>
  );
}
