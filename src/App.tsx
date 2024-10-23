import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { FormProps, FormType } from './types/form.ts';
import { Typography } from './components/Typography.tsx';
import RadialBar from './radial-bar.tsx';
import { Input } from './components/Input.tsx';
import { LoadingButton } from './components/LoadingButton.tsx';
import { useState } from 'react';
import { ProductItem } from './components/ProductItem.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { AnimatedNumber } from './utils/animatedNumber.tsx';
import { EmptyResult } from './components/EmptyResult.tsx';

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
      alert('saved!');
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
        <div className="flex flex-col items-center gap-5">
          <FormInput name="basicPlastic" />
          <FormInput name="productCount" />
          <FormInput name="productWeight" />
          <FormInput name="company" />
          <FormInput name="name" />
          <FormInput name="email" />
        </div>
        <EmptyResult />
        <div className="mx-5 grid items-center justify-center gap-y-4 xs:grid-cols-1 sm:grid-cols-2 sm:gap-x-2.5 sm:gap-y-3 md:grid-cols-5 md:gap-5 lg:w-[1560px]">
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
        <div className="relative flex flex-col gap-6 sm:block">
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
      render={({ field, fieldState: { error } }) => (
        <div className="flex w-236 flex-col gap-3">
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
    <div className="flex flex-col items-center gap-3 font-pretendard text-primary-600 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 md:gap-4">
      <div className="text-18 font-semibold sm:text-22 md:text-2xl">
        리베이션 제품 탄소 발생량
      </div>
      <div className="flex flex-col items-center sm:gap-1">
        <div className="text-32 font-extrabold leading-[38px] sm:leading-[46px] md:text-5xl md:leading-[67px]">
          <AnimatedNumber value={calculResult} />% 절감
        </div>
        <div className="text-16 font-semibold md:text-xl">
          {calculData}kg CO2e
        </div>
      </div>
    </div>
  );
};

export default App;
