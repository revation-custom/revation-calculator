import { Controller, useFormContext } from 'react-hook-form';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';
import { IcSnow } from '../assets/icons/IcSnow';

interface FormInputProps<T> {
  name: keyof T;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

export const FormInput = <T,>({
  name,
  label,
  placeholder,
  type,
  required,
}: FormInputProps<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex w-full flex-col gap-[6px] sm:gap-3">
          <div className="flex items-center gap-[2px]">
            <Typography className="sm:title-sm body-xs" color="text-font">
              {label}
            </Typography>
            {required && <IcSnow />}
          </div>

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
