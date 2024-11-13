import { UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';

export type BasicPlastic = 'ABS' | 'PVC' | 'PP' | 'PET' | 'HDPE' | 'NONE';
export type RevationPlastic =
  | 'WOOD COMPOSITE'
  | 'LIMESTONE COMPOSITE'
  | 'PLA(Polylactic acid)';
export type Plastic = Exclude<BasicPlastic, 'NONE'> | RevationPlastic;

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

export type RevationCalculatedDataType = Record<RevationPlastic, number[]>;
export type RevationReductionPercentType = Record<RevationPlastic, number>;
export interface CalculatedDataType extends FormType {
  percent: number;
  reductionPercent: number;
  calculatedData: number[];
  lastCalculatedData: number;
  revationLastCalculatedData: number;
  revationCalculatedData: RevationCalculatedDataType;
  reductionData: number;
  revationReductionPercent: RevationReductionPercentType;
  [key: string | keyof CalculatedDataType]:
    | number
    | number[]
    | string
    | RevationCalculatedDataType
    | RevationReductionPercentType;
}
