import {
  DataTable,
  DataTableFilterMeta,
  DataTableRowEditCompleteEvent,
} from 'primereact/datatable';
import { Button } from 'primereact/button';
import {
  PaginatorCurrentPageReportOptions,
  PaginatorFirstPageLinkOptions,
  PaginatorLastPageLinkOptions,
  PaginatorNextPageLinkOptions,
  PaginatorPrevPageLinkOptions,
} from 'primereact/paginator';
import dayjs from 'dayjs';
import { tableComponentStyle } from '@/components/Table/tableComponentStyle';
import { ReactNode } from 'react';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const templatePagination = {
  layout:
    'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
  FirstPageLink: (options: PaginatorFirstPageLinkOptions) => {
    return (
      <Button
        type='button'
        className='mr-[2px] p-[10px]'
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <i
          className='pi pi-step-backward'
          style={{ fontSize: '0.875rem', color: 'var(--color-ghost)' }}
        />
      </Button>
    );
  },
  PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
    return (
      <Button
        type='button'
        className='mr-[2px]  p-[10px]'
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <i
          className='pi pi-caret-left'
          style={{ fontSize: '0.875rem', color: 'var(--color-ghost)' }}
        />
      </Button>
    );
  },
  NextPageLink: (options: PaginatorNextPageLinkOptions) => {
    return (
      <Button
        type='button'
        className='mr-[2px]  p-[10px]'
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <i
          className='pi pi-caret-right'
          style={{ fontSize: '0.875rem', color: 'var(--color-ghost)' }}
        />
      </Button>
    );
  },
  LastPageLink: (options: PaginatorLastPageLinkOptions) => {
    return (
      <Button
        type='button'
        className='mr-[2px]  p-[10px]'
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <i
          className='pi pi-step-forward'
          style={{ fontSize: '0.875rem', color: 'var(--color-ghost)' }}
        />
      </Button>
    );
  },
  CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
    return (
      <span className='bg-ghost mr-[2px] select-none rounded-sm p-[10px_12px]  text-sm text-white'>
        {options.currentPage}
      </span>
    );
  },
};

interface TableComponentProps {
  filters?: DataTableFilterMeta;
  data: any;
  setData: (data: any) => void;
  children?: ReactNode;
  ch?: ReactNode;
  emptyMessage?: string;
  onRowEditComplete?: (e: DataTableRowEditCompleteEvent) => void;
}
export default function TableComponent(props: TableComponentProps) {
  const { filters, data, setData, children, onRowEditComplete, emptyMessage } =
    props;

  return (
    <div className='card'>
      <DataTable
        value={data}
        tableStyle={{ minWidth: '75vw' }}
        filters={filters}
        globalFilterFields={['name', 'code']}
        paginator
        paginatorTemplate={templatePagination}
        currentPageReportTemplate='{currentPage}'
        emptyMessage={emptyMessage}
        rows={10}
        editMode='row'
        dataKey='id'
        onRowEditComplete={onRowEditComplete}
        pt={tableComponentStyle}
      >
        {children}
      </DataTable>
    </div>
  );
}
