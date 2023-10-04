'use client';
import ButtonComponent from '@/components/Button/ButtonComponent';
import stopwatchIcon from '../../../public/svg/stopwatch.svg';
import stopIcon from '../../../public/svg/stop.svg';
import NextImage from '@/components/NextImage';
import TableComponent from '@/components/Table/TableComponent';
import { useActiveUserTasks, useCreateUserTask } from '@/lib/query-hook';
import { useEffect, useState } from 'react';
import { Task } from '@/firebase/firestore/types';
import { Column } from 'primereact/column';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Input } from '@/components/InputField/InputField';
import { DataTableRowEditCompleteEvent } from 'primereact/datatable';

interface TrackerTableWrapperProps {}
dayjs.extend(duration);

const dateBodyTemplate = (rowData: Task) => {
  return dayjs.duration(rowData.duration, 's').format('HH:mm:ss');
};
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

export default function TrackerTableWrapper(props: TrackerTableWrapperProps) {
  const {} = props;
  const { mutate: createTask } = useCreateUserTask();
  const [activeUserTasks, setActiveUserTasks] = useState<Task[]>([]);
  const { data, status, isLoading } = useActiveUserTasks();

  useEffect(() => {
    if (status === 'success' && data) {
      setActiveUserTasks(data.data || []);
    }
  }, [status, data]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    let _data = [...activeUserTasks];
    let { newData, index } = e;

    _data[index] = newData as Task;

    setActiveUserTasks(_data);
  };

  return (
    <div className='flex flex-col'>
      <div className='mb-[36px] flex justify-end'>
        <ButtonComponent
          type={'button'}
          label={'Start new timer'}
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
      <TableComponent
        data={activeUserTasks}
        setData={setActiveUserTasks}
        emptyMessage='No tasks found.'
        onRowEditComplete={onRowEditComplete}
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
        ></Column>
        <Column
          field='description'
          header='Description'
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          rowEditor
          header='Action'
          style={{ width: '140px' }}
          headerStyle={{
            borderTopRightRadius: '8px',
            borderTop: '0.1em solid var(--color-white-whisper)',
            borderRight: '0.1em solid var(--color-white-whisper)',
          }}
          className='border-r-solid border-r-whisper border-r-[0.1em]'
        ></Column>
      </TableComponent>
    </div>
  );
}
