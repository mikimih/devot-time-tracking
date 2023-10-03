import { Calendar } from 'primereact/calendar';
import { cn } from '@/lib/utils';
import { datePickerStyle } from '@/components/DatePicker/datePickerStyle';

interface DatePickerFieldProps {
  value: Date | null;
  onChange: any;
  maxDate?: Date;
  name: string;
  customStyle?: string;
}

function DatePickerField(props: DatePickerFieldProps) {
  const { value, onChange, maxDate, name, customStyle } = props;

  return (
    <div
      className={cn(
        'card justify-content-center mr-4 flex flex-col max-md:mb-2',
        customStyle
      )}
    >
      <label htmlFor={name} className='text-grey m-1 text-sm/[1.21em]'>
        {name}
      </label>
      <Calendar
        id={name}
        value={value}
        onChange={(e) => onChange(e.value)}
        showIcon
        maxDate={maxDate}
        dateFormat='dd.mm.yy.'
        placeholder='dd.mm.yyyy.'
        mask='99.99.9999.'
        readOnlyInput
        showButtonBar
        className={cn(
          'text-grey placeholder-grey [&>input:focus]:outline-primary-50 text-lg leading-[17px] max-md:max-w-[95vw] [&>input]:p-[9px_20px]',
          '[&>button]:text-grey [&>button]:bg-white [&>button]:p-[8px_6px_10px_6px]'
        )}
        pt={datePickerStyle}
      />
    </div>
  );
}

export default DatePickerField;
