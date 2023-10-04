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
  onClick?: () => void;
}
export default function ButtonComponent(props: ButtonComponentProps) {
  const {
    type,
    onClick,
    label,
    isLoading,
    icon,
    disabled,
    customStyle,
    secondary,
  } = props;
  return (
    <Button
      label={isLoading ? String.fromCodePoint(0xa0) : label}
      icon={icon}
      type={type}
      loading={isLoading}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        ' bg-primary-100 rounded-[3px] border p-[10px_20px_10px_10px] text-sm font-bold leading-[1.21em] text-white hover:opacity-80',
        secondary ? 'bg-secondary border-secondary' : '',
        isLoading && 'relative [&>svg]:absolute [&>svg]:p-1.5',
        customStyle
      )}
    />
  );
}
