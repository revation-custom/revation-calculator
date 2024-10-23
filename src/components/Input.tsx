import { clsx } from 'clsx';
import { ControllerRenderProps, FieldError } from 'react-hook-form';
import { Typography } from './Typography.tsx';

interface InputProps {
  field: ControllerRenderProps;
  error: FieldError | undefined;
  placeholder?: string;
  disabled?: boolean;
}

export const Input = ({
  field,
  error,
  placeholder,
  disabled = false,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1 font-pretendard">
      <input
        {...field}
        placeholder={placeholder ?? ''}
        disabled={disabled}
        className={clsx(
          'text-md hover:ring-1/2 border border-solid p-10 text-xl font-normal placeholder-gray-500 outline-none duration-200 hover:text-font hover:ring-solid',
          error?.message ? 'border-bg-500' : 'border-black',
          disabled ? 'bg-bg-200 placeholder-gray-500 opacity-60' : '',
        )}
      />
      {error?.message && (
        <Typography variant="errorText" color="text-bg-500">
          {error?.message}
        </Typography>
      )}
    </div>
  );
};
