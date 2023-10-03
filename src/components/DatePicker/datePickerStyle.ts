import { classNames } from 'primereact/utils';
import { CalendarPassThroughOptions } from 'primereact/calendar';

export const datePickerStyle: CalendarPassThroughOptions = {
  header: {
    className: classNames(
      'flex items-center justify-between overflow-x-auto',
      'p-2 text-secondaryDark bg-whisper font-semibold m-0 border-b border-grey rounded-t-lg'
    ),
  },
  panel: () => ({
    className: classNames(
      'bg-whisper shadow-md',
      'inline-block overflow-x-auto p-2 rounded-lg'
    ),
  }),
  table: {
    className: classNames('border-collapse', 'my-2'),
  },
  yearTitle: {
    className: classNames('transition duration-200 pl-2', 'hover:text-grey'),
  },
  monthTitle: {
    className: classNames('transition duration-200 pl-2', 'hover:text-grey'),
  },
  tableheadercell: 'p-2',
  weekday: 'text-primaryDark ',
  // @ts-ignore
  day: 'p-2',
  group: {
    className: classNames(
      'flex-1',
      'border-l border-gray-300 pr-0.5 pl-0.5 pt-0 pb-0',
      'first:pl-0 first:border-l-0'
    ),
  },
  // @ts-ignore
  daylabel: ({ context }) => ({
    className: classNames(
      'sm:w-10 sm:h-10 h-8 w-8 rounded-full transition-shadow duration-200 border-transparent border',
      'flex items-center justify-center mx-auto overflow-hidden relative',
      'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
      {
        'opacity-40 text-secondaryDark': context.disabled,
        'text-secondaryDark': !context.disabled,
      },
      {
        'text-secondaryDark hover:bg-primary-100 hover:text-white hover:opacity-95':
          !context.selected && !context.disabled,
        'text-white bg-primary-100 hover:opacity-80':
          context.selected && !context.disabled,
      }
    ),
  }),
  monthpicker: 'p-2',
  // @ts-ignore
  month: ({ context }) => ({
    className: classNames(
      'w-1/3 inline-flex items-center justify-center cursor-pointer overflow-hidden relative',
      'p-2 transition-shadow duration-200 rounded-lg',
      'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
      {
        'text-secondaryDark hover:bg-primary-100 hover:text-white hover:opacity-95':
          !context.selected && !context.disabled,
        'text-white bg-primary-100 hover:opacity-80':
          context.selected && !context.disabled,
      }
    ),
  }),
  yearpicker: {
    className: classNames('my-2'),
  },
  // @ts-ignore
  year: ({ context }) => ({
    className: classNames(
      'w-1/2 inline-flex items-center justify-center cursor-pointer overflow-hidden relative',
      'p-2 transition-shadow duration-200 rounded-lg',
      'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
      {
        'text-secondaryDark hover:bg-primary-100 hover:text-white hover:opacity-95':
          !context.selected && !context.disabled,
        'text-white bg-primary-100 hover:opacity-80':
          context.selected && !context.disabled,
      }
    ),
  }),
  timepicker: {
    className: classNames(
      'flex justify-center items-center',
      'border-t-1 border-solid border-gray-300 p-2'
    ),
  },
  buttonBar: {
    className: classNames('font-bold p-[6px_24px] text-secondaryDark'),
  },
};
