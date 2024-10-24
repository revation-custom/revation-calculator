import { UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';

export type BasicPlastic = 'ABS' | 'PVC' | 'PP' | 'PET' | 'HDPE' | 'NONE';

export type FormProps = {
  methods: UseFormReturn<any>;
  onSubmit: VoidFunction;
  children: ReactNode;
};

export interface FormType {
  basicPlastic: BasicPlastic;
  productCount: number;
  productWeight: number;
}
