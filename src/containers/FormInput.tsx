import { Controller, useFormContext } from 'react-hook-form';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';

interface FormInputProps<T> {
  name: keyof T;
  label: string;
  placeholder: string;
  type?: string;
}

export const FormInput = <T,>({
  name,
  label,
  placeholder,
  type,
}: FormInputProps<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex w-full flex-col gap-3">
          <Typography className="sm:title-sm body-xs" color="text-font">
            {label}
          </Typography>
          <Input
            field={field}
            error={error}
            placeholder={placeholder}
            type={type}
          />
        </div>
      )}
    />
  );
};
