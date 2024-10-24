import { clsx } from 'clsx';
import { ControllerRenderProps, FieldError } from 'react-hook-form';
import { Typography } from './Typography.tsx';

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
          'text-md border border-solid bg-transparent p-10 text-xl font-normal placeholder-gray-500 outline-none duration-200 hover:text-font hover:ring-1/2 hover:ring-solid',
          error?.message ? 'border-bg-500' : 'border-black',
          disabled ? 'bg-bg-200 placeholder-gray-500 opacity-60' : '',
        )}
        type={type}
        value={
          field.value !== undefined && field.value !== null ? field.value : ''
        }
        onChange={(event) => {
          console.log(
            event.target.value,
            Number(event.target.value) ? '1' : '2',
          );
          if (type === 'number') {
            field.onChange(
              event.target.value === ''
                ? undefined
                : Number(event.target.value),
            );
            return;
          }
          field.onChange(event.target.value);
        }}
        onWheel={(e) => {
          if (type === 'number') {
            e.preventDefault();
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      {error?.message && (
        <Typography variant="errorText" color="text-bg-500">
          {error?.message}
        </Typography>
      )}
    </div>
  );
};
