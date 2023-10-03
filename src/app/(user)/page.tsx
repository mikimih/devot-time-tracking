import PageTitle from '@/components/PageTitle';
import dayjs from 'dayjs';
import NextImage from '@/components/NextImage';
import dateIcon from '../../../public/svg/calendar.svg';
import TrackerTableWrapper from '@/components/Table/TrackerTableWrapper';

export default function Page() {
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
