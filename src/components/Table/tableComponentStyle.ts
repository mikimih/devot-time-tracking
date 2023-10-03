import { DataTablePassThroughOptions } from 'primereact/datatable';
import { classNames } from 'primereact/utils';

export const tableComponentStyle: DataTablePassThroughOptions = {
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
        'pt-[8px] pb-[12px] pl-[12px] md:pt-[22px] md:pl-[30px] md:pb-[24px] text-sm md:text-lg text-gray leading-[1.33em] m-[1px_0]',
        'border-b-[0.1em] border-b-solid border-b-whisper relative',
        'before:absolute before:left-0 before:top-px before:bottom-px before:w-[0.01em] before:bg-whisper'
      ),
    }),
  },
};
