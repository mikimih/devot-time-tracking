'use client';
import { useEffect, useState } from 'react';
import {
  DataTableFilterMeta,
  DataTableRowEditCompleteEvent,
} from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Input } from '@/components/InputField/InputField';
import dayjs from 'dayjs';
import { Column } from 'primereact/column';
import { ReactComponent as DeleteIcon } from '../../../../public/svg/trash.svg';
import { cn } from '@/lib/utils';
import TableComponent from '@/components/Table/TableComponent';
import { TrackedTaskTime, UpdateTaskType } from '@/firebase/firestore/types';
import {
  useDeleteUserTask,
  useTrackedUserTasks,
  useUpdateUserTask,
} from '@/lib/hook/queryHook';
import { Button } from 'primereact/button';
import TrackerFilterHistoryTask from '@/components/Table/TrackerHistoryTable/TrackerFilterHistoryTask';
import Spinner from '@/components/Loader/Spinner';

const ACTION_CELL_WIDTH_ONE_BUTTON = 15;
const ACTION_CELL_WIDTH_TWO_BUTTON = 80;

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
export default function TrackerHistoryTableWrapper() {
  const { data, status, isLoading } = useTrackedUserTasks();

  const [userTasks, setUserTasks] = useState<TrackedTaskTime[]>([]);
  const [actionCellWidth, setActionCellWidth] = useState(
    ACTION_CELL_WIDTH_ONE_BUTTON
  );
  const { mutate: updateTask } = useUpdateUserTask();
  const { mutate: deleteTask } = useDeleteUserTask();

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date: {
      operator: FilterOperator.AND,
      constraints: [
        { value: null, matchMode: FilterMatchMode.DATE_AFTER },
        { value: null, matchMode: FilterMatchMode.DATE_BEFORE },
      ],
    },
  });
  useEffect(() => {
    if (status === 'success') {
      const dataParsed: TrackedTaskTime[] = data.data.map(
        (val: TrackedTaskTime) => {
          return { ...val, date: dayjs(val.date).toDate() };
        }
      );
      setUserTasks(dataParsed || []);
    }
  }, [status, data]);

  const dateBodyTemplate = (rowData: TrackedTaskTime) => {
    return (
      <time dateTime={dayjs().format('YYYY-MM-DD')}>
        {dayjs(rowData.date).format('DD.MM.YYYY.')}
      </time>
    );
  };
  const deleteButtonsTemplate = (rowData: TrackedTaskTime) => {
    return (
      <Button
        className='flex'
        onClick={() => {
          deleteTask(rowData.taskId);
          const userTasksCopy = [...userTasks];
          const index = userTasksCopy.findIndex((val) => val.id === rowData.id);
          userTasksCopy.splice(index, 1);
          setUserTasks(userTasksCopy);
        }}
      >
        <DeleteIcon />
      </Button>
    );
  };
  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    setActionCellWidth(ACTION_CELL_WIDTH_ONE_BUTTON);
    const _data = [...userTasks];
    const { newData, index } = e;
    _data[index] = newData as TrackedTaskTime;
    const updatedValues: UpdateTaskType = {
      id: newData.taskId,
      description: newData.description,
    };
    setUserTasks(_data);
    updateTask(updatedValues);
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='flex flex-col'>
      <TrackerFilterHistoryTask filters={filters} setFilters={setFilters} />
      <TableComponent
        data={userTasks}
        emptyMessage='No tasks found.'
        filters={filters}
        onRowEditComplete={onRowEditComplete}
        onRowEditInit={() => setActionCellWidth(ACTION_CELL_WIDTH_TWO_BUTTON)}
        onRowEditCancel={() => setActionCellWidth(ACTION_CELL_WIDTH_ONE_BUTTON)}
      >
        <Column
          field='date'
          className='border-l-solid border-l-whisper border-l-[0.1em] font-semibold before:!w-0'
          header='Date'
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
          editor={(options) => textEditor(options)}
        />
        <Column field='timeTrack' header='Time tracked' />
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
