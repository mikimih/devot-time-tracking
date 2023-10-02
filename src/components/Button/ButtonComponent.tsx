import { Button } from 'primereact/button';
import { cn } from '@/lib/utils';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  customStyle?: string;
}
export default function ButtonComponent(props: ButtonProps) {
  const { type, label, isLoading, disabled, customStyle } = props;
  return (
    <Button
      label={label}
      type={type}
      loading={isLoading}
      disabled={disabled}
      className={cn(
        'border-primary-100 bg-primary-100 rounded-[3px] border p-[10px_20px_10px_10px] text-sm font-bold leading-[17px] text-white',
        customStyle
      )}
    />
  );
}
