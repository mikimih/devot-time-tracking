import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { toastStyle } from '@/components/Toast/toastStyle';

type Props = {};
export type ToastComponentProps = {
  showError: (errorMessage: string) => void;
};

const ToastComponent = forwardRef<ToastComponentProps, Props>((_, ref: any) => {
  const toast = useRef<Toast>(null);
  useImperativeHandle(ref, () => ({
    showError(errorMessage: string) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 100000,
      });
    },
  }));

  return <Toast ref={toast} pt={toastStyle} />;
});

export default ToastComponent;
