import { Control, Controller, FieldErrors } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { cn } from '@/lib/utils';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import { Button } from 'primereact/button';
import NextImage from '@/components/NextImage';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface TextInputFieldProps {
  name: string;
  placeholder: string;
  errors?: FieldErrors;
  control?: Control<any>;
  customStyle?: string;
  value?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  iconRight?: StaticImport;
  onIconClick?: MouseEventHandler;
}

interface InputProps {
  id: string;
  value?: string;
  placeholder: string;
  hasErrors?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  iconRight?: StaticImport;
  onIconClick?: MouseEventHandler;
}

const Input = (props: InputProps) => {
  const {
    id,
    value,
    placeholder,
    hasErrors,
    iconRight,
    onIconClick,
    onChange,
  } = props;
  return (
    <div className='relative'>
      <InputText
        id={id}
        value={value}
        placeholder={placeholder}
        className={cn(
          'placeholder-gray focus:placeholder-secondaryDark focus:outline-primary-50 p-[9px_20px] text-lg leading-[0.94em]',
          hasErrors && 'border-alert rounded border-[2px] border-solid',
          !iconRight && 'w-full'
        )}
        onChange={onChange}
      />
      {onIconClick && iconRight && (
        <Button
          className={cn(
            'absolute',
            'absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'
          )}
          onClick={onIconClick}
        >
          <NextImage
            src={iconRight}
            alt='clear search'
            width={24}
            height={24}
          />
        </Button>
      )}
    </div>
  );
};
export default function InputField(props: TextInputFieldProps) {
  const {
    placeholder,
    errors,
    name,
    control,
    label,
    customStyle,
    value,
    onChange,
    ...rest
  } = props;

  const getFormErrorMessage = () => {
    return errors && errors[name] ? (
      <small className='text-alert'>{`${errors[name]?.message}`}</small>
    ) : (
      <small>&nbsp;</small>
    );
  };

  return (
    <>
      {control && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div
              className={cn(
                'card justify-content-center flex flex-col',
                customStyle
              )}
            >
              <Input
                id={field.name}
                value={field.value}
                placeholder={placeholder}
                hasErrors={!!(errors && errors[name])}
                onChange={(e) => field.onChange(e.target.value)}
                {...rest}
              />
              {getFormErrorMessage()}
            </div>
          )}
        />
      )}
      {!control && (
        <div
          className={cn(
            'card justify-content-center flex flex-col',
            customStyle
          )}
        >
          <label htmlFor={name} className='text-gray m-1 text-sm/[1.21em]'>
            {name}
          </label>
          <Input
            id={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
          />
        </div>
      )}
    </>
  );
}
