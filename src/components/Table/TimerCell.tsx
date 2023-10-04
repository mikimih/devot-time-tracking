import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useTimer } from '@/lib/timerHook';
import { Task } from '@/firebase/firestore/types';
import { cn } from '@/lib/utils';

dayjs.extend(duration);
interface TimerCellProps {
  rowData: Task;
  isActiveStopWatch: boolean;
}
export default function TimerCell(props: TimerCellProps) {
  const { rowData, isActiveStopWatch } = props;
  const { seconds, start, pause } = useTimer({ seconds: rowData.duration });
  useEffect(() => {
    if (isActiveStopWatch) {
      start();
    } else {
      pause();
    }
  }, [isActiveStopWatch]);
  return (
    <span className={cn(isActiveStopWatch && 'font-bold')}>
      {dayjs.duration(seconds, 's').format('HH:mm:ss')}
    </span>
  );
}
