import { SubmitHandler, useForm } from 'react-hook-form';
import { BasicPlastic, FormType } from './types/form.ts';
import { Typography } from './components/Typography.tsx';
import RadialBar from './radial-bar.tsx';
import { LoadingButton } from './components/LoadingButton.tsx';
import { useRef, useState } from 'react';
import { ProductItem } from './containers/ProductItem.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { EmptyResult } from './components/EmptyResult.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { PLASTIC_TYPE } from './constants/plastic.ts';
import { getCalculNumber } from './apis/getCalculNumber.ts';
import { FormInput } from './containers/FormInput.tsx';
import { RadialBarResult } from './components/RadialBarResult.tsx';
import { Form } from './containers/FormProvider.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import { getCarbonData } from './useCase/getCarbonData.ts';
import { fadeIn } from './utils/fadeIn.ts';
import { fadeOut } from './utils/fadeOut.ts';
import { RevationResultBox } from './components/RevationResultBox.tsx';
import { useWatchFieldValues } from './hooks/useWatchFieldValues.ts';
import { Table } from './components/Table.tsx';
import { Popup } from './components/Popup.tsx';
import { UserForm } from './containers/UserForm.tsx';
import { formSchema } from './constants/schema.ts';

function App() {
  const methods = useForm<FormType>({
    defaultValues: {
      basicPlastic: 'NONE',
      productCount: undefined,
      productWeight: undefined,
    },
    resolver: yupResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const [calculatedCarbonData, setCalculatedCarbonData] = useState<any>({});
  const [openPopup, setOpenPopup] = useState(false);
  const [formData, setFormData] = useState<FormType>({
    basicPlastic: 'NONE',
    productCount: 0,
    productWeight: 0,
  });
  const emptyScrollRef = useRef<HTMLDivElement>(null);
  const resultScrollRef = useRef<HTMLDivElement>(null);

  const { handleSubmit, watch } = methods;
  const { isButtonDisabled, handleFormSubmit } = useWatchFieldValues(watch());

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    if (calculatedCarbonData?.percent)
      resultScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    else {
      emptyScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(async () => {
      setLoading(true);
      const { resData, error } = await getCalculNumber();
      if (resData === null || error) {
        return;
      }
      setCalculatedCarbonData({ ...getCarbonData(resData, data) });
    }, 1000);
    setTimeout(() => {
      setLoading(false);
      handleFormSubmit(data);
    }, 3000);
    setFormData({ ...formData, ...data });
  };

  const onToggle = (label: BasicPlastic) => {
    const clickedPlastic = methods.getValues('basicPlastic');
    if (clickedPlastic === label) {
      methods.setValue('basicPlastic', 'NONE');
      return;
    }

    methods.setValue('basicPlastic', label);
  };

  const onClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <Header />
      <div id="container" className="w-full bg-bg-100">
        <div id="topBox" className="h-[654px] w-full bg-primary-600 pt-72" />
        <div
          id="titleWrapper"
          className="mx-auto flex max-w-[1560px] flex-col gap-2 px-20 pb-70 pt-60 sm:gap-3 sm:pb-80 sm:pt-100"
        >
          <Typography
            className="sm:caption-md en-body-sm"
            color="text-primary-600"
          >
            CARBON EMISSION CALCULATE
          </Typography>
          <Typography className="sm:heading-lg heading-xs" color="text-font">
            탄소배출계산기
          </Typography>
        </div>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div
            id="formContainer"
            className="mb-20 flex w-full min-w-[320px] flex-col gap-5 px-20 sm:mb-[140px]"
          >
            <div className="flex justify-start bg-primary-600 p-16 md:p-20">
              <Typography className="md:title-md title-sm" color="text-bg-100">
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
              <Typography className="sm:title-sm body-sm">소재 선택</Typography>
              <div className="lg:flex lg:justify-center">
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
              </div>

              <div className="mt-[50px] flex justify-center sm:mt-[60px]">
                <LoadingButton
                  type="submit"
                  loading={loading}
                  disabled={isButtonDisabled}
                >
                  <Typography
                    className="sm:button-but1 button-but2"
                    color="text-white"
                  >
                    계산하기
                  </Typography>
                </LoadingButton>
              </div>
            </div>
            <AnimatePresence>
              {calculatedCarbonData && calculatedCarbonData?.percent ? (
                <motion.div
                  key="radialBar"
                  initial={{ opacity: 0 }}
                  animate={fadeIn}
                  ref={resultScrollRef}
                >
                  <div className="relative mb-7 mt-8 flex flex-col gap-6 sm:mb-[53px] sm:mt-[130px] sm:block md:mb-[68px]">
                    <RadialBarResult
                      calculResult={calculatedCarbonData.reductionPercent}
                      calculData={
                        calculatedCarbonData.revationLastCalculatedData
                      }
                      delay={1500}
                    />
                    <RadialBar
                      duration={1000}
                      progressFirstValue={80}
                      progressSecondValue={calculatedCarbonData.percent}
                      delay={1500}
                    />
                  </div>
                  <Typography
                    color="text-bg-400"
                    className="md:title-lg sm:title-md title-xs-sb text-center"
                  >
                    LESS PLASTIC SOLUTION으로
                    <br />
                    나무 20,424그루 심는 효과가 발생합니다.
                  </Typography>
                  <div className="mt-[60px] flex flex-col gap-5 sm:mt-[120px] md:flex-row md:gap-[15px]">
                    {calculatedCarbonData.revationCalculatedData.map(
                      (carbonData: any, idx: number) => (
                        <div
                          key={`${carbonData}-${idx}`}
                          className="flex w-full flex-col gap-3 sm:gap-5 md:gap-4"
                        >
                          <RevationResultBox
                            resultData={carbonData[carbonData.length - 1]}
                          />
                          <Table tableData={carbonData} />
                        </div>
                      ),
                    )}
                  </div>
                  <div className="mt-[70px] flex w-full flex-col items-center gap-[54px] sm:mt-20">
                    <LoadingButton
                      type="button"
                      loading={false}
                      onClick={() => {
                        setOpenPopup(true);
                      }}
                    >
                      <Typography
                        className="sm:button-but1 button-but2"
                        color="text-white"
                      >
                        PDF 다운받기
                      </Typography>
                    </LoadingButton>
                    <Typography
                      color="text-gray-400"
                      className="sm:tooltip body-3xs text-center"
                    >
                      본 계산 결과는 참고용이며, 실제 환경적 효과는
                      <br className="sm:hidden" /> 사용 조건 및 여러 변수에 따라
                      달라질 수 있습니다.
                      <br />
                      이메일을 받지 못한 경우, 고객 지원팀에 문의해 주세요
                    </Typography>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  ref={emptyScrollRef}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={fadeOut}
                >
                  <div className="flex h-[573px] items-center justify-center sm:h-[916px] md:h-[1050px]">
                    <EmptyResult />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Form>
        <Popup open={openPopup} onClose={onClosePopup}>
          <UserForm onClose={onClosePopup} formData={formData} />
        </Popup>
        <Footer />
      </div>
    </>
  );
}

export default App;
