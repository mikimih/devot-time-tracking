import { Control, Controller, FieldErrors } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { cn } from '@/lib/utils';

interface TextInputFieldProp {
  name: string;
  placeholder: string;
  errors: FieldErrors;
  control?: Control<any>;
  customStyle?: string;
}
export default function InputField(props: TextInputFieldProp) {
  const { placeholder, errors, name, control, customStyle } = props;

  const getFormErrorMessage = () => {
    return errors[name] ? (
      <small className='text-alert'>{`${errors[name]?.message}`}</small>
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
          <InputText
            id={field.name}
            value={field.value}
            placeholder={placeholder}
            className={cn(
              'placeholder-grey focus:placeholder-secondaryDark focus:outline-primary-50 p-[12px_20px] text-lg leading-[17px]',
              errors[name] && 'border-alert rounded border-[2px] border-solid'
            )}
            onChange={(e) => field.onChange(e.target.value)}
          />
          {getFormErrorMessage()}
        </div>
      )}
    />
  );
}
