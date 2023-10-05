import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useTimer } from '@/lib/timerHook';
import { Task } from '@/firebase/firestore/types';
import { cn } from '@/lib/utils';
import { TimerMode } from '@/components/Table/TaskTable/TrackerTableWrapper';

dayjs.extend(duration);
interface TimerCellProps {
  rowData: Task;
  isActiveStopWatch: TimerMode | boolean;
  onPauseAction: (seconds: number) => void;
  onStopAction: (seconds: number) => void;
}
export default function TimerCell(props: TimerCellProps) {
  const { rowData, isActiveStopWatch, onPauseAction, onStopAction } = props;
  const { seconds, start, pause } = useTimer({ seconds: rowData.duration });
  useEffect(() => {
    switch (isActiveStopWatch) {
      case TimerMode.Play:
        start();
        break;
      case TimerMode.Pause:
        pause();
        if (rowData.duration !== seconds) {
          onPauseAction(seconds);
        }
        break;
      case TimerMode.Stop:
        pause();
        onStopAction(seconds);
        break;
      default:
        pause();
    }
  }, [isActiveStopWatch]);
  return (
    <span className={cn(isActiveStopWatch === TimerMode.Play && 'font-bold')}>
      {dayjs.duration(seconds, 's').format('HH:mm:ss')}
    </span>
  );
}
