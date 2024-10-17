import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { supabase } from "./supabase/instance.ts";
import { clsx } from "clsx";
import { ReactNode } from "react";

type BasicPlastic = "ABS" | "PVC" | "PP" | "PET" | "HDPE";
interface FormType {
  basicPlastic: BasicPlastic;
  productCount: number | null;
  productWeight: number | null;
  company: string;
  name: string;
  email: string;
}
type FormProps = {
  methods: UseFormReturn<any>;
  onSubmit: VoidFunction;
  children: ReactNode;
};
const Form = ({ methods, onSubmit, children }: FormProps) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
};

function App() {
  const methods = useForm<FormType>({});

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const { basicPlastic, productCount, productWeight, company, name, email } =
      data;
    const { error } = await supabase.from("calcul_histories").insert({
      plastic_type: basicPlastic,
      product_count: productCount,
      product_weight: productWeight,
      company,
      name,
      email,
    });
    if (error) {
      console.log(error);
      return;
    }
    alert("saved!");
  };
  return (
    <Form
      methods={methods as UseFormReturn<any>}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5 items-center">
        <FormInput name="basicPlastic" />
        <FormInput name="productCount" />
        <FormInput name="productWeight" />
        <FormInput name="company" />
        <FormInput name="name" />
        <FormInput name="email" />
      </div>
      <button type="submit">a</button>
    </Form>
  );
}

const FormInput = ({ name }: { name: keyof FormType }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error }, formState }) => (
        <div className="flex flex-col">
          <label className="text-xs">{name.toString()}</label>
          <input
            {...field}
            className={clsx(
              "text-xl border rounded-md",
              error?.message ? "border-red-500" : "border-black",
            )}
          />
        </div>
      )}
    />
  );
};

export default App;
