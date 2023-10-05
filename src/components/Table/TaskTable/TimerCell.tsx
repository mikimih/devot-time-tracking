import React, { useEffect, useRef } from 'react';
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
  periodicallyUpdateFunction: (updatedSeconds: number) => void;
}

const PERIODIC_CALL_TIMER = 10000;

export default function TimerCell(props: TimerCellProps) {
  const {
    rowData,
    isActiveStopWatch,
    onPauseAction,
    onStopAction,
    periodicallyUpdateFunction,
  } = props;

  const { seconds, start, pause, running } = useTimer({
    seconds: rowData.duration,
  });

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

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

  const sendSecondsPeriodically = () => {
    if (running) {
      periodicallyUpdateFunction(seconds);

      intervalIdRef.current = setTimeout(
        sendSecondsPeriodically,
        PERIODIC_CALL_TIMER
      );
    }
  };

  useEffect(() => {
    if (running && !intervalIdRef.current) {
      sendSecondsPeriodically();
    } else {
      if (intervalIdRef.current) {
        clearTimeout(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }

    return () => {
      if (intervalIdRef.current) {
        clearTimeout(intervalIdRef.current);
      }
    };
  }, [running, seconds]);

  return (
    <span className={cn(isActiveStopWatch === TimerMode.Play && 'font-bold')}>
      {dayjs.duration(seconds, 's').format('HH:mm:ss')}
    </span>
  );
}
