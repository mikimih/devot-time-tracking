'use client';
import TableComponent from '@/components/Table/TableComponent';
import {
  useActiveUserTasks,
  useCreateUserTask,
  useDeleteUserTask,
  useMarkAllStopped,
  useUpdateUserTask,
} from '@/lib/hook/queryHook';
import { useEffect, useState } from 'react';
import { Task, UpdateTaskType } from '@/firebase/firestore/types';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { Input } from '@/components/InputField/InputField';
import { DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { ReactComponent as DeleteIcon } from '../../../../public/svg/trash.svg';
import { cn } from '@/lib/utils';
import TableTaskButtonContainer from '@/components/Table/TaskTable/TableTaskButtonContainer';
import PlayStopCell from '@/components/Table/TaskTable/PlayPauseCell';
import TimerTaskCell from '@/components/Table/TaskTable/TimerTaskCell';
import Spinner from '@/components/Loader/Spinner';

const textEditor = (options: any) => {
  return (
    <Input
      id='description'
      placeholder='Type...'
      customInputStyle='border-solid border-[1px] border-ghost'
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
    />
  );
};

const ACTION_CELL_WIDTH_ONE_BUTTON = 15;
const ACTION_CELL_WIDTH_TWO_BUTTON = 80;
export enum TimerMode {
  Play = 'PLAY',
  Pause = 'PAUSE',
  Stop = 'STOP',
}

export default function TrackerTableWrapper() {
  const { data, status, isLoading } = useActiveUserTasks();
  const { mutateAsync: createTask } = useCreateUserTask();
  const { mutateAsync: markAllStopped } = useMarkAllStopped();
  const { mutate: updateTask } = useUpdateUserTask();
  const { mutate: deleteTask } = useDeleteUserTask();
  const [activeStopwatchIndex, setActiveStopwatchIndex] = useState<
    Record<number, TimerMode> | undefined
  >();
  const [activeUserTasks, setActiveUserTasks] = useState<Task[]>([]);
  const [actionCellWidth, setActionCellWidth] = useState(
    ACTION_CELL_WIDTH_ONE_BUTTON
  );

  useEffect(() => {
    if (status === 'success' && data) {
      setActiveUserTasks(data.data || []);
    }
  }, [status, data]);

  const dateBodyTemplate = (rowData: Task, column: ColumnBodyOptions) => {
    return (
      <TimerTaskCell
        updateTask={updateTask}
        setActiveUserTasks={setActiveUserTasks}
        activeStopwatchIndex={activeStopwatchIndex}
        activeUserTasks={activeUserTasks}
        column={column}
        rowData={rowData}
        setActiveStopwatchIndex={setActiveStopwatchIndex}
      />
    );
  };
  const playPauseButtonsTemplate = (
    _rowData: Task,
    column: ColumnBodyOptions
  ) => {
    return (
      <PlayStopCell
        isActiveCell={
          !!(
            activeStopwatchIndex &&
            activeStopwatchIndex[column.rowIndex] === TimerMode.Play
          )
        }
        rowIndex={column.rowIndex}
        setActiveStopwatch={setActiveStopwatchIndex}
      />
    );
  };
  const deleteButtonsTemplate = (rowData: Task) => {
    return (
      <Button
        className='flex'
        onClick={() => {
          deleteTask(rowData.id);
          const activeUserTasksCopy = [...activeUserTasks];
          const index = activeUserTasksCopy.findIndex(
            (val) => val.id === rowData.id
          );
          activeUserTasksCopy.splice(index, 1);
          setActiveUserTasks(activeUserTasksCopy);
        }}
      >
        <DeleteIcon />
      </Button>
    );
  };
  if (isLoading) {
    return <Spinner />;
  }

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    setActionCellWidth(ACTION_CELL_WIDTH_ONE_BUTTON);
    const _data = [...activeUserTasks];
    const { newData, index } = e;
    _data[index] = newData as Task;
    const updatedValues: UpdateTaskType = {
      id: newData.id,
      description: newData.description,
      duration: newData.duration,
    };
    setActiveUserTasks(_data);
    updateTask(updatedValues);
  };

  return (
    <div className='flex flex-col'>
      <TableTaskButtonContainer
        createTask={async () => {
          const newTask = await createTask();
          setActiveUserTasks([...activeUserTasks, newTask]);
        }}
        markAllStopped={async () => {
          await markAllStopped(activeUserTasks);
          setActiveUserTasks([]);
        }}
      />

      <TableComponent
        data={activeUserTasks}
        emptyMessage='No tasks found.'
        onRowEditComplete={onRowEditComplete}
        onRowEditInit={() => setActionCellWidth(ACTION_CELL_WIDTH_TWO_BUTTON)}
        onRowEditCancel={() => setActionCellWidth(ACTION_CELL_WIDTH_ONE_BUTTON)}
      >
        <Column
          field='duration'
          className='border-l-solid border-l-whisper border-l-[0.1em] font-semibold before:!w-0'
          header='Time logged'
          headerStyle={{
            borderTopLeftRadius: '8px',
            borderTop: '0.1em solid var(--color-white-whisper)',
            borderLeft: '0.1em solid var(--color-white-whisper)',
          }}
          body={dateBodyTemplate}
        />
        <Column
          field='description'
          header='Description'
          bodyClassName={(_data, options) => {
            return cn(
              'pr-[12px]',
              !!(
                activeStopwatchIndex &&
                activeStopwatchIndex[options.rowIndex] === TimerMode.Play
              ) && 'font-semibold'
            );
          }}
          editor={(options) => textEditor(options)}
        />
        <Column
          header='Actions'
          style={{ width: '40px', paddingRight: 0 }}
          body={playPauseButtonsTemplate}
        />
        <Column
          rowEditor
          style={{
            paddingLeft: '15px',
            paddingRight: '15px',
            width: `${actionCellWidth}px`,
          }}
          className={cn(
            'before:hidden',
            '[&>button>svg>fill]:fill-gray  [&>button>svg]:h-[16px] [&>button>svg]:w-[16px]',
            '[&>button:nth-child(2)]:ml-[15px] [&>button]:m-0'
          )}
        />
        <Column
          style={{ paddingLeft: 0 }}
          headerStyle={{
            borderTopRightRadius: '8px',
            borderTop: '0.1em solid var(--color-white-whisper)',
            borderRight: '0.1em solid var(--color-white-whisper)',
          }}
          className='border-r-solid border-r-whisper border-r-[0.1em] pr-4 before:hidden'
          body={deleteButtonsTemplate}
        />
      </TableComponent>
    </div>
  );
}
