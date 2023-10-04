'use client';
import { ChangeEvent, useState } from 'react';
import TableComponent from '@/components/Table/TableComponent';
import { DataTableFilterMeta } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputField } from '@/components/InputField/InputField';
import closeIcon from '../../../public/svg/close.svg';
import DatePickerField from '@/components/DatePicker/DatePickerField';
import dayjs from 'dayjs';

interface TrackerHistoryTableWrapperProps {}
export default function TrackerHistoryTableWrapper(
  props: TrackerHistoryTableWrapperProps
) {
  const {} = props;
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date: {
      operator: FilterOperator.AND,
      constraints: [
        { value: null, matchMode: FilterMatchMode.DATE_AFTER },
        { value: null, matchMode: FilterMatchMode.DATE_BEFORE },
      ],
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return (
    <div className='flex flex-col'>
      <div className='bg-lilac mb-4 flex w-full rounded-lg p-[10px_16px_14px_16px] max-md:flex-col md:mb-[36px] md:p-[22px_50px_26px_50px]'>
        <DatePickerField
          // @ts-ignore
          value={filters.date?.constraints[0]?.value}
          name='Start date'
          maxDate={dayjs().toDate()}
          onChange={(value: Date) => {
            let _filters = { ...filters };
            console.log(value);
            // @ts-ignore
            filters.date.constraints[0].value = value;
            setFilters(_filters);
          }}
        />
        <DatePickerField
          // @ts-ignore
          value={filters.date?.constraints[1]?.value}
          name='End date'
          maxDate={dayjs().toDate()}
          onChange={(value: Date) => {
            let _filters = { ...filters };
            console.log(value);
            // @ts-ignore
            filters.date.constraints[1].value = value;
            setFilters(_filters);
          }}
        />
        <InputField
          name='Description contains'
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder='Keyword Search'
          iconRight={closeIcon}
          onIconClick={() => setGlobalFilterValue('')}
        />
      </div>
      {/*<TableComponent filters={filters} />*/}
    </div>
  );
}
