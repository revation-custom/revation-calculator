import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { FormProps, FormType } from "./types/form.ts";
import { Typography } from "./components/Typography.tsx";
import RadialBar from "./radial-bar.tsx";
import { Input } from "./components/Input.tsx";
import { LoadingButton } from "./components/LoadingButton.tsx";
import { useState } from "react";
import { ProductItem } from "./components/ProductItem.tsx";
import { Header } from "./components/Header.tsx";
import { Footer } from "./components/Footer.tsx";
import { AnimatedNumber } from "./utils/animatedNumber.tsx";
import { EmptyResult } from "./components/EmptyResult.tsx";

const Form = ({ methods, onSubmit, children }: FormProps) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
};

function App() {
  const methods = useForm<FormType>({});
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setTimeout(() => {
      alert("saved!");
      setLoading(false);
    }, 5000);
    setLoading(true);
    // const { basicPlastic, productCount, productWeight, company, name, email } =
    //   data;
    // const { error } = await supabase.from("calcul_histories").insert({
    //   plastic_type: basicPlastic,
    //   product_count: productCount,
    //   product_weight: productWeight,
    //   company,
    //   name,
    //   email,
    // });
    // if (error) {
    //   console.log(error);
    //   return;
    // }
  };
  const onToggle = (state: boolean) => {
    setState(!state);
  };
  return (
    <>
      <Header />

      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 items-center">
          <FormInput name="basicPlastic" />
          <FormInput name="productCount" />
          <FormInput name="productWeight" />
          <FormInput name="company" />
          <FormInput name="name" />
          <FormInput name="email" />
        </div>
        <EmptyResult />
        <div className="mx-5 justify-center items-center grid lg:w-[1560px] md:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 md:gap-5 sm:gap-x-2.5 sm:gap-y-3 gap-y-4">
          <ProductItem
            state={state}
            onToggle={onToggle}
            label="WOOD COMPOSITE"
          />
          <ProductItem
            state={state}
            onToggle={onToggle}
            label="WOOD COMPOSITE"
          />
          <ProductItem
            state={state}
            onToggle={onToggle}
            label="WOOD COMPOSITE"
          />
          <ProductItem
            state={state}
            onToggle={onToggle}
            label="WOOD COMPOSITE"
          />
          <ProductItem
            state={state}
            onToggle={onToggle}
            label="WOOD COMPOSITE"
          />
        </div>
        <LoadingButton type="submit" loading={loading}>
          <Typography variant="buttonText" color="text-white">
            계산하기
          </Typography>
        </LoadingButton>
        <div className="relative sm:block flex flex-col gap-6">
          <RadialBarResult calculResult={64} calculData={53412} />
          <RadialBar
            duration={1000}
            progressFirstValue={80}
            progressSecondValue={30}
          />
        </div>
      </Form>
      <Footer />
    </>
  );
}

const FormInput = ({ name }: { name: keyof FormType }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error }, formState }) => (
        <div className="flex flex-col gap-3 w-[236px]">
          <Typography variant="titleSmall">타이틀</Typography>
          <Input field={field} error={error} placeholder="test" />
        </div>
      )}
    />
  );
};

const RadialBarResult = ({
  calculResult,
  calculData,
}: {
  calculResult: number;
  calculData: number;
}) => {
  return (
    <div className="font-pretendard text-primary-600 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 flex flex-col md:gap-4 items-center gap-3">
      <div className="md:text-2xl font-semibold sm:text-[22px] text-[18px]">
        리베이션 제품 탄소 발생량
      </div>
      <div className="flex flex-col items-center sm:gap-1">
        <div className="md:text-5xl font-extrabold sm:text-[38px] sm:leading-[46px] md:leading-[67px] leading-[38px] text-[32px]">
          <AnimatedNumber value={calculResult} />% 절감
        </div>
        <div className="md:text-xl font-semibold text-[16px]">
          {calculData}kg CO2e
        </div>
      </div>
    </div>
  );
};

export default App;
