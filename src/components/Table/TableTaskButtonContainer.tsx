import React from 'react';
import ButtonComponent from '@/components/Button/ButtonComponent';
import NextImage from '@/components/NextImage';
import stopwatchIcon from '../../../public/svg/stopwatch.svg';
import stopIcon from '../../../public/svg/stop.svg';

interface TableTaskButtonContainerProps {
  createTask: () => void;
  markAllStopped: () => void;
}
export default function TableTaskButtonContainer(
  props: TableTaskButtonContainerProps
) {
  const { createTask, markAllStopped } = props;
  return (
    <div className='mb-[36px] flex justify-end'>
      <ButtonComponent
        type='button'
        label='Start new timer'
        customStyle='mr-[15px] py-[6px]'
        onClick={createTask}
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
        type='button'
        label='Stop all'
        secondary={true}
        customStyle='py-[6px]'
        onClick={markAllStopped}
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
  );
}
