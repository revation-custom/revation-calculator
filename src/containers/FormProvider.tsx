import { FormProvider } from 'react-hook-form';
import { FormProps } from '../types/form';

export const Form = ({ methods, onSubmit, children }: FormProps) => {
  return (
    <FormProvider {...methods}>
      <form className="mx-auto flex max-w-[1560px]" onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  );
};
