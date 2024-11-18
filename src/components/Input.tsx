import { clsx } from 'clsx';
import { ControllerRenderProps, FieldError } from 'react-hook-form';
import { Typography } from './Typography.tsx';
import { formatPhoneNumber } from '../utils/formatNumber.ts';

interface InputProps {
  field: ControllerRenderProps;
  error: FieldError | undefined;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}

export const Input = ({
  field,
  error,
  placeholder,
  disabled = false,
  type = 'string',
}: InputProps) => {
  return (
    <div className="flex w-full flex-col gap-1 font-pretendard">
      <input
        {...field}
        placeholder={placeholder ?? ''}
        disabled={disabled}
        className={clsx(
          'border border-solid bg-transparent p-10 font-normal placeholder-gray-500 outline-none duration-200 body-2xs hover:text-font hover:ring-1/2 hover:ring-solid sm:input',
          error?.message ? 'border-bg-500' : 'border-black',
          disabled ? 'bg-bg-200 placeholder-gray-500 opacity-60' : '',
        )}
        type="text"
        value={
          type === 'number'
            ? field.value !== undefined && field.value !== null
              ? field.value.toLocaleString('en-US')
              : ''
            : field.value
        }
        onChange={(event) => {
          const inputValue = event.target.value.replace(/,/g, '');

          if (type === 'number') {
            const numericValue = Number(inputValue);
            if (!isNaN(numericValue)) {
              field.onChange(numericValue);
            } else if (inputValue === '') {
              field.onChange(undefined);
            }
            return;
          }
          if (type === 'phone') {
            const phoneValue = formatPhoneNumber(inputValue.replace(/\D/g, ''));
            field.onChange(phoneValue);
            return;
          }
          field.onChange(event.target.value);
        }}
        onWheel={(e) => {
          if (type === 'number') {
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      {error?.message && (
        <Typography className="error" color="text-bg-500">
          {error?.message}
        </Typography>
      )}
    </div>
  );
};
