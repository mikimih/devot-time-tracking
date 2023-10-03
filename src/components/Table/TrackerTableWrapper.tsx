import React from 'react';
import ButtonComponent from '@/components/Button/ButtonComponent';
import stopwatchIcon from '../../../public/svg/stopwatch.svg';
import stopIcon from '../../../public/svg/stop.svg';
import NextImage from '@/components/NextImage';
import TableComponent from '@/components/Table/TableComponent';

interface TrackerTableWrapperProps {}
function TrackerTableWrapper(props: TrackerTableWrapperProps) {
  const {} = props;
  return (
    <div className='flex flex-col'>
      <div className='mb-[36px] flex justify-end'>
        <ButtonComponent
          type={'button'}
          label={'Start new timer'}
          customStyle='mr-[15px] py-[6px]'
          icon={
            <NextImage
              alt='stopwatch icon'
              src={stopwatchIcon}
              width={24}
              height={24}
              className='mr-[10px]'
            />
          }
        />
        <ButtonComponent
          type={'button'}
          label={'Stop all'}
          secondary={true}
          customStyle='py-[6px]'
          icon={
            <NextImage
              alt='stop all icon'
              src={stopIcon}
              width={24}
              height={24}
              className='mr-[10px]'
            />
          }
        />
      </div>
      <TableComponent />
    </div>
  );
}

export default TrackerTableWrapper;
