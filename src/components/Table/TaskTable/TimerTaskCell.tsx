import TimerCell from '@/components/Table/TaskTable/TimerCell';
import { Task, UpdateTaskType } from '@/firebase/firestore/types';
import { TimerMode } from '@/components/Table/TaskTable/TrackerTableWrapper';
import { ColumnBodyOptions } from 'primereact/column';

interface TimerTaskCellProps {
  rowData: Task;
  activeStopwatchIndex: Record<number, TimerMode> | undefined;
  setActiveStopwatchIndex: (
    activeStopwatchIndex: Record<number, TimerMode> | undefined
  ) => void;
  activeUserTasks: Task[];
  column: ColumnBodyOptions;
  setActiveUserTasks: (userTask: Task[]) => void;
  updateTask: any;
}
function TimerTaskCell(props: TimerTaskCellProps) {
  const {
    rowData,
    activeStopwatchIndex,
    setActiveStopwatchIndex,
    activeUserTasks,
    column,
    setActiveUserTasks,
    updateTask,
  } = props;
  return (
    <TimerCell
      rowData={rowData}
      isActiveStopWatch={
        activeStopwatchIndex && activeStopwatchIndex[column.rowIndex]
          ? activeStopwatchIndex[column.rowIndex]
          : false
      }
      onStopAction={(seconds) => {
        setActiveStopwatchIndex(undefined);
        const activeUserTasksCopy = [...activeUserTasks];
        const index = column.rowIndex;
        const durationStart = activeUserTasksCopy[index].duration;
        const durationPeriod = seconds - durationStart;
        const durationInfo = {
          duration: seconds,
          tracked: {
            date: new Date(),
            timeTrack: durationPeriod,
          },
        };
        const updatedValues: UpdateTaskType = {
          id: rowData.id,
          isStopped: true,
          ...(durationPeriod > 0 ? durationInfo : {}),
        };

        activeUserTasksCopy.splice(index, 1);
        setActiveUserTasks(activeUserTasksCopy);
        updateTask(updatedValues);
      }}
      periodicallyUpdateFunction={(seconds) => {
        const updatedValues: UpdateTaskType = {
          id: rowData.id,
          duration: seconds,
        };
        updateTask(updatedValues);
      }}
      onPauseAction={(seconds) => {
        const _data = [...activeUserTasks];
        const index = column.rowIndex;
        const durationStart = _data[index].duration;
        _data[index].duration = seconds;
        const durationPeriod = seconds - durationStart;
        const updatedValues: UpdateTaskType = {
          id: rowData.id,
          duration: rowData.duration,
          tracked: {
            date: new Date(),
            timeTrack: durationPeriod,
          },
        };
        setActiveUserTasks(_data);
        updateTask(updatedValues);
      }}
    />
  );
}

export default TimerTaskCell;
