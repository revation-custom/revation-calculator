import { UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';

export type BasicPlastic = 'ABS' | 'PVC' | 'PP' | 'PET' | 'HDPE' | 'NONE';
export type RevationPlastic = 'PP+Wood' | 'HDPE+탄산칼슘' | 'PLA';
export type Plastic = Omit<BasicPlastic, 'NONE'> | RevationPlastic;

export type FormProps = {
  methods: UseFormReturn<any>;
  onSubmit: VoidFunction;
  children: ReactNode;
  className?: string;
};

export interface FormType {
  basicPlastic: BasicPlastic;
  productCount: number;
  productWeight: number;
}

export interface UserFormType {
  company: string;
  name: string;
  email: string;
  phone: string;
  privacyAgree: boolean;
}

export interface CalculatedDataType extends FormType {
  percent: number;
  reductionPercent: number;
  calculatedData: number[];
  lastCalculatedData: number;
  revationLastCalculatedData: number;
  revationCalculatedData: number[][];
  reductionData: number;
  revationReductionPercent: number[];
  [key: string]: number | number[] | string | number[][];
}
