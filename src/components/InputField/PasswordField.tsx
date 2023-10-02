import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Password } from 'primereact/password';
import { cn } from '@/lib/utils';

interface PasswordFieldProp {
  name: string;
  placeholder: string;
  errors: FieldErrors;
  control?: Control<any>;
  customStyle?: string;
}
export default function PasswordField(props: PasswordFieldProp) {
  const { control, errors, name, placeholder, customStyle } = props;

  const getFormErrorMessage = (fieldName: any) => {
    return errors[fieldName] ? (
      <small className='text-alert'>{`${errors[fieldName]?.message}`}</small>
    ) : (
      <small>&nbsp;</small>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div
          className={cn(
            'card justify-content-center flex flex-col',
            customStyle
          )}
        >
          <Password
            id={field.name}
            {...field}
            inputRef={field.ref}
            feedback={false}
            placeholder={placeholder}
            className={cn(
              'placeholder-grey  relative text-lg leading-[17px]',
              '[&>input:focus]:placeholder-secondaryDark [&>input:focus]:outline-primary-50 [&>input]:w-full [&>input]:p-[12px_20px]',
              'cursor-pointer [&>i]:absolute [&>i]:right-0 [&>i]:top-1/2 [&>i]:-translate-x-1/2 [&>i]:-translate-y-1/2 [&>i]:transform',
              '[&>i>svg]:h-[20px] [&>i>svg]:w-[20px]',
              errors[name] && 'border-alert rounded border-[2px] border-solid'
            )}
            toggleMask
          />
          {getFormErrorMessage(field.name)}
        </div>
      )}
    />
  );
}
