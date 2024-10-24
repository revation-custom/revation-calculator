import { SubmitHandler, useForm } from 'react-hook-form';
import { BasicPlastic, FormType } from './types/form.ts';
import { Typography } from './components/Typography.tsx';
import RadialBar from './radial-bar.tsx';
import { LoadingButton } from './components/LoadingButton.tsx';
import { useState } from 'react';
import { ProductItem } from './containers/ProductItem.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { EmptyResult } from './components/EmptyResult.tsx';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PLASTIC_TYPE } from './constants/plastic.ts';
import { getCalculNumber } from './apis/getCalculNumber.ts';
import { FormInput } from './containers/FormInput.tsx';
import { RadialBarResult } from './components/RadialBarResult.tsx';
import { Form } from './components/FormProvider.tsx';

const formSchema = yup.object().shape({
  basicPlastic: yup.mixed<BasicPlastic>().required('require'),
  productCount: yup
    .number()
    .required('제품 수량을 입력해주세요.')
    .typeError('제품 수량은 숫자만 입력 가능합니다.')
    .min(1, '수량은 1개 이상이여야 합니다.'),
  productWeight: yup
    .number()
    .required('제품 수량을 입력해주세요.')
    .typeError('제품 무게는 숫자만 입력 가능합니다.')
    .min(1, '무게는 1g 이상이여야 합니다.'),
});
function App() {
  const methods = useForm<FormType>({
    defaultValues: {
      basicPlastic: 'NONE',
    },
    resolver: yupResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setTimeout(() => {
      alert('saved!');
      setLoading(false);
    }, 5000);
    setLoading(true);
    const { resData, error } = await getCalculNumber();
    if (resData === null || error) {
      return;
    }
    const selectedResData = resData.find(
      (res) => res.plastic_type === data.basicPlastic,
    );
    if (!selectedResData) return;
    const {
      raw_material_step,
      manufacture_step,
      transport_step,
      incineration_step,
      incineration_percent,
      recycle_step,
      recycle_percent,
    } = selectedResData;

    const rawStepFunc = raw_material_step;
    const manufactureStepFunc = rawStepFunc + manufacture_step;
    const transportStepFunc = manufactureStepFunc + transport_step;
    const resultStepFunc =
      transportStepFunc +
      incineration_step * incineration_percent +
      recycle_step * recycle_percent;

    const funcArray = [
      rawStepFunc,
      manufactureStepFunc,
      transportStepFunc,
      resultStepFunc,
    ];
    const resultArray = funcArray.map(
      (func) => func * data.productCount * data.productWeight,
    );

    console.log(resultArray);

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
  const onToggle = (label: BasicPlastic) => {
    const clickedPlastic = methods.getValues('basicPlastic');
    if (clickedPlastic === label) {
      methods.setValue('basicPlastic', 'NONE');
      return;
    }

    methods.setValue('basicPlastic', label);
  };

  return (
    <>
      <Header />
      <div id="container" className="w-full bg-bg-100">
        <div id="topBox" className="h-[654px] w-full bg-primary-600 pt-72" />
        <div
          id="titleWrapper"
          className="flex flex-col gap-2 px-20 pb-70 pt-60 sm:gap-3 sm:pb-80 sm:pt-100"
        >
          <Typography variant="subTitle" color="text-primary-600">
            CARBON EMISSION CALCULATE
          </Typography>
          <Typography variant="title" color="text-font">
            탄소배출계산기
          </Typography>
        </div>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div id="formContainer" className="flex w-full flex-col gap-5 px-20">
            <div className="flex justify-start bg-primary-600 p-16 md:p-20">
              <Typography variant="unitTitle" color="text-bg-100">
                소재 선택하기
              </Typography>
            </div>
            <div className="mb-[26px] flex flex-col gap-5 md:flex-row">
              <FormInput
                name="productCount"
                label="제품 수량(개수)"
                placeholder="제품 수량을 입력해주세요."
                type="number"
              />
              <FormInput
                name="productWeight"
                label="제품 무게(g)"
                placeholder="제품 무게를 입력해주세요."
                type="number"
              />
            </div>
            <div>
              <Typography variant="titleSmall">소재 선택</Typography>
              <div className="mt-3 grid items-center justify-center gap-y-4 xs:grid-cols-1 sm:grid-cols-2 sm:gap-x-2.5 sm:gap-y-3 md:grid-cols-5 md:gap-5 lg:w-[1560px]">
                {PLASTIC_TYPE.map((plastic) => (
                  <ProductItem
                    state={methods.watch('basicPlastic') === plastic}
                    onToggle={onToggle}
                    label={plastic}
                    key={plastic}
                  />
                ))}
              </div>
              <div className="mt-[50px] flex justify-center sm:mt-[60px]">
                <LoadingButton type="submit" loading={loading}>
                  <Typography variant="buttonText" color="text-white">
                    계산하기
                  </Typography>
                </LoadingButton>
              </div>
            </div>
            <EmptyResult />
            <div className="relative flex flex-col gap-6 sm:block">
              <RadialBarResult calculResult={64} calculData={53412} />
              <RadialBar
                duration={1000}
                progressFirstValue={80}
                progressSecondValue={30}
              />
            </div>
          </div>
        </Form>
        <Footer />
      </div>
    </>
  );
}

export default App;
