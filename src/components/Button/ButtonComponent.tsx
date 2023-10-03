import { Button } from 'primereact/button';
import { cn } from '@/lib/utils';
import { IconType } from 'primereact/utils';

interface ButtonComponentProps {
  type: 'submit' | 'button' | 'reset';
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  customStyle?: string;
  icon?: IconType<any>;
  secondary?: boolean;
}
export default function ButtonComponent(props: ButtonComponentProps) {
  const { type, label, isLoading, icon, disabled, customStyle, secondary } =
    props;
  return (
    <Button
      label={label}
      icon={icon}
      type={type}
      loading={isLoading}
      disabled={disabled}
      className={cn(
        ' bg-primary-100 rounded-[3px] border p-[10px_20px_10px_10px] text-sm font-bold leading-[17px] text-white',
        secondary ? 'bg-secondary border-secondary' : '',
        customStyle
      )}
    />
  );
}
