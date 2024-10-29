import { FormProvider } from 'react-hook-form';
import { FormProps } from '../types/form';

export const Form = ({ methods, onSubmit, children, className }: FormProps) => {
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  );
};
