import { ToastPassThroughOptions } from 'primereact/toast';
import { classNames } from 'primereact/utils';

export const toastStyle: ToastPassThroughOptions = {
  root: {
    className: classNames('w-96', 'opacity-90'),
  },
  message: ({ state, index }: any) => ({
    className: classNames('my-4 rounded-md w-full', {
      'bg-whisper border-solid border-0 border-l-4 border-secondary text-secondary':
        state.messages[index] &&
        state.messages[index].message.severity == 'info',
      'bg-whisper border-solid border-0 border-l-4 border-primary-100 text-primary-100':
        state.messages[index] &&
        state.messages[index].message.severity == 'success',
      'bg-whisper border-solid border-0 border-l-4 border-primary-50 text-primary-50':
        state.messages[index] &&
        state.messages[index].message.severity == 'warn',
      'bg-whisper border-solid border-0 border-l-4 border-alert text-alert':
        state.messages[index] &&
        state.messages[index].message.severity == 'error',
    }),
  }),
  content: { className: 'flex items-center py-5 px-7' },
  icon: {
    className: classNames('w-6 h-6', 'text-lg mr-2'),
  },
  text: {
    className: 'text-base font-normal flex flex-col flex-1 grow shrink ml-4',
  },
  summary: { className: 'font-bold block' },
  detail: { className: 'mt-1 block' },
  closebutton: {
    className: classNames(
      'w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out',
      'ml-auto overflow-hidden relative',
      'flex items-center justify-center',
      'hover:bg-white/30'
    ),
  },
  // @ts-ignore
  transition: {
    enterFromClass: 'opacity-0 translate-x-0 translate-y-2/4 translate-z-0',
    enterActiveClass: 'transition-transform transition-opacity duration-300',
    leaveFromClass: 'max-h-40',
    leaveActiveClass: 'transition-all duration-500 ease-in',
    leaveToClass: 'max-h-0 opacity-0 mb-0 overflow-hidden',
  },
};
