import React, { ChangeEvent } from 'react';
import DatePickerField from '@/components/DatePicker/DatePickerField';
import dayjs from 'dayjs';
import { InputField } from '@/components/InputField/InputField';
import closeIcon from '../../../../public/svg/close.svg';
import { DataTableFilterMeta } from 'primereact/datatable';

interface TrackerFilterHistoryTaskProps {
  filters: DataTableFilterMeta;
  setFilters: (filters: DataTableFilterMeta) => void;
}
export default function TrackerFilterHistoryTask(
  props: TrackerFilterHistoryTaskProps
) {
  const { filters, setFilters } = props;
  return (
    <div className='bg-lilac mb-4 flex w-full rounded-lg p-[10px_16px_14px_16px] max-md:flex-col md:mb-[36px] md:p-[22px_50px_26px_50px]'>
      <DatePickerField
        // @ts-ignore
        value={filters.date?.constraints[0]?.value}
        name='Start date'
        maxDate={dayjs().toDate()}
        onChange={(value: Date) => {
          const _filters = { ...filters };
          // @ts-ignore
          filters.date.constraints[0].value = value;
          setFilters(_filters);
        }}
      />
      <DatePickerField
        // @ts-ignore
        value={filters.date?.constraints[1]?.value}
        name='End date'
        maxDate={dayjs().add(1, 'day').toDate()}
        onChange={(value: Date) => {
          const _filters = { ...filters };
          // @ts-ignore
          filters.date.constraints[1].value = value;
          setFilters(_filters);
        }}
      />
      <InputField
        name='Description contains'
        // @ts-ignore
        value={filters.description.value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const _filters = { ...filters };
          // @ts-ignore
          filters.description.value = e.target.value;
          setFilters(_filters);
        }}
        placeholder='Keyword Search'
        iconRight={closeIcon}
        onIconClick={() => {
          const _filters = { ...filters };
          // @ts-ignore
          filters.description.value = '';
          setFilters(_filters);
        }}
      />
    </div>
  );
}
