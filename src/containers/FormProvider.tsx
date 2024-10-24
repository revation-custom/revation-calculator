import { FormProvider } from 'react-hook-form';
import { FormProps } from '../types/form';

export const Form = ({ methods, onSubmit, children }: FormProps) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
};
