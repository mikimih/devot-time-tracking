'use client';
import {
  DataTable,
  DataTableFilterMeta,
  DataTableRowEditCompleteEvent,
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ChangeEvent, useState } from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

import {
  PaginatorCurrentPageReportOptions,
  PaginatorFirstPageLinkOptions,
  PaginatorLastPageLinkOptions,
  PaginatorNextPageLinkOptions,
  PaginatorPrevPageLinkOptions,
} from 'primereact/paginator';
import dayjs from 'dayjs';

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
  date: Date;
}

const productsMock: Product[] = [
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5,
    date: dayjs('2019-01-25').toDate(),
  },
  {
    id: '10001',
    code: 'f230fh0g4',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    date: dayjs().toDate(),
    rating: 5,
  },
];
const templatePagination = {
  layout:
    'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
  FirstPageLink: (options: PaginatorFirstPageLinkOptions) => {
    return (
      <Button
        type='button'
        className={'mr-[2px] p-[10px]'}
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
        className={'mr-[2px]  p-[10px]'}
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
        className={'mr-[2px]  p-[10px]'}
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
        className={'mr-[2px]  p-[10px]'}
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
}
export default function TableComponent(props: TableComponentProps) {
  const { filters } = props;
  const [products, setProducts] = useState<Product[]>(productsMock);

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    let _products = [...products];
    let { newData, index } = e;

    _products[index] = newData as Product;

    setProducts(_products);
  };

  const textEditor = (options: any) => {
    return (
      <InputText
        type='text'
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };
  const dateBodyTemplate = (rowData: Product) => {
    return dayjs(new Date(rowData.date)).format('DD.MM.YYYY.');
  };

  return (
    <div className='card'>
      <DataTable
        value={products}
        tableStyle={{ minWidth: '75vw' }}
        filters={filters}
        globalFilterFields={['name', 'code']}
        paginator
        paginatorTemplate={templatePagination}
        currentPageReportTemplate='{currentPage}'
        emptyMessage='No tasks found.'
        rows={10}
        editMode='row'
        dataKey='id'
        onRowEditComplete={onRowEditComplete}
        pt={{
          table: () => ({
            className: 'border-separate',
          }),
          thead: () => ({
            className: classNames(
              'bg-lilac font-bold text-base md:text-lg leading-[0.94em] text-secondaryDark'
            ),
          }),
          column: {
            // @ts-ignore
            headercell: () => ({
              className: classNames(
                'pt-[12px] pb-[6px] pl-[10px] md:pt-[32px] md:pb-[20px] md:pl-[30px] border-y-[0.1em] border-y-solid border-y-whisper'
              ),
            }),
            bodycell: () => ({
              className: classNames(
                'pt-[8px] pb-[12px] pl-[12px] md:pt-[22px] md:pl-[30px] md:pb-[24px] text-sm md:text-lg text-grey leading-[1.33em] m-[1px_0]',
                'border-b-[0.1em] border-b-solid border-b-whisper relative',
                'before:absolute before:left-0 before:top-px before:bottom-px before:w-[0.01em] before:bg-whisper'
              ),
            }),
          },
        }}
      >
        <Column
          field='code'
          className='border-l-solid border-l-whisper border-l-[0.1em] font-semibold before:!w-0'
          header='Code'
          headerStyle={{
            borderTopLeftRadius: '8px',
            borderTop: '0.1em solid var(--color-white-whisper)',
            borderLeft: '0.1em solid var(--color-white-whisper)',
          }}
          editor={(options) => textEditor(options)}
        ></Column>
        <Column field='name' header='Name'></Column>
        <Column
          field='date'
          header='Date'
          dataType='date'
          body={dateBodyTemplate}
        ></Column>
        <Column
          rowEditor
          headerStyle={{
            borderTopRightRadius: '8px',
            borderTop: '0.1em solid var(--color-white-whisper)',
            borderRight: '0.1em solid var(--color-white-whisper)',
          }}
          className='border-r-solid border-r-whisper border-r-[0.1em]'
        ></Column>
      </DataTable>
    </div>
  );
}
