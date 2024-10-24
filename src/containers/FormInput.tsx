import { Controller, useFormContext } from 'react-hook-form';
import { FormType } from '../types/form';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';

export const FormInput = ({
  name,
  label,
  placeholder,
  type,
}: {
  name: keyof FormType;
  label: string;
  placeholder: string;
  type?: string;
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex w-full flex-col gap-3">
          <Typography variant="titleSmall">{label}</Typography>
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
