import { UseFormReturn } from "react-hook-form";
import { ReactNode } from "react";

export type BasicPlastic = "ABS" | "PVC" | "PP" | "PET" | "HDPE";

export type FormProps = {
  methods: UseFormReturn<any>;
  onSubmit: VoidFunction;
  children: ReactNode;
};

export interface FormType {
  basicPlastic: BasicPlastic;
  productCount: number | null;
  productWeight: number | null;
  company: string;
  name: string;
  email: string;
}
