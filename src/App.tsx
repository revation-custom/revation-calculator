import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { BasicPlastic, FormType } from './types/form.ts';
import { Typography } from './components/Typography.tsx';
import RadialBar from './components/RadialBar.tsx';
import { LoadingButton } from './components/LoadingButton.tsx';
import { useCallback, useRef, useState } from 'react';
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
import { Table } from './components/Table.tsx';
import { Popup } from './components/Popup.tsx';
import { UserForm } from './containers/UserForm.tsx';
import { formSchema } from './constants/schema.ts';
import { TREE_DIVIDER } from './constants/tree.ts';
import { thousandNumber } from './utils/formatNumber.ts';
import {
  BAR_ANIMATE_DELAY,
  FIRST_BAR_DEFAULT_PERCENT,
} from './constants/radialBar.ts';
import { IcSnow } from './assets/icons/IcSnow.tsx';
import FirstPage from './containers/PDF/FirstPage.tsx';
import SecondPage from './containers/PDF/SecondPage.tsx';

function App() {
  const methods = useForm<FormType>({
    defaultValues: {
      basicPlastic: 'NONE',
      productCount: undefined,
      productWeight: undefined,
    },
    resolver: yupResolver(formSchema),
  });

  const radialBarNum = useRef(0);
  const [loading, setLoading] = useState(false);
  const [calculatedCarbonData, setCalculatedCarbonData] = useState<any>({});
  const [openPopup, setOpenPopup] = useState(false);
  const [formData, setFormData] = useState<FormType>({
    basicPlastic: 'NONE',
    productCount: 0,
    productWeight: 0,
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const { handleSubmit, control } = methods;
  // const { isButtonDisabled, handleFormSubmit } = useWatchFieldValues(watch());

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setTimeout(async () => {
      setLoading(true);
      const { resData, error } = await getCalculNumber();
      if (resData === null || error) {
        return;
      }
      setCalculatedCarbonData({ ...getCarbonData(resData, data) });
    }, 1000);
    radialBarNum.current++;
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      setLoading(false);
      // handleFormSubmit(data);
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

  const treeConverter = useCallback(() => {
    if (calculatedCarbonData?.lastCalculatedData) {
      const carbonCount =
        calculatedCarbonData.lastCalculatedData -
        calculatedCarbonData.revationLastCalculatedData;

      return thousandNumber(Math.floor(carbonCount / TREE_DIVIDER));
    }

    return null;
  }, [calculatedCarbonData]);

  return (
    <>
      <Header />
      <FirstPage />
      <SecondPage calculatedCarbonData={calculatedCarbonData} />
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
        <Form
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex max-w-[1560px] flex-col"
        >
          <div
            id="formContainer"
            className="flex w-full min-w-[320px] flex-col gap-5 px-20"
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
                required={true}
              />
              <FormInput
                name="productWeight"
                label="제품 무게(g)"
                placeholder="제품 무게를 입력해주세요."
                type="number"
                required={true}
              />
            </div>
            <div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <div className="flex items-center gap-[2px]">
                  <Typography className="sm:title-sm body-xs">
                    소재 선택
                  </Typography>
                  <IcSnow />
                </div>
                <Typography color="text-bg-500" className="body-2xs">
                  하나의 소재만 선택 가능합니다.
                </Typography>
              </div>
              <Controller
                name="basicPlastic"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <div className="relative lg:flex lg:flex-col lg:justify-center">
                      <div className="mt-3 grid items-center justify-center gap-y-4 xs:grid-cols-1 sm:grid-cols-2 sm:gap-x-2.5 sm:gap-y-3 md:grid-cols-5 md:gap-5 lg:w-[1560px]">
                        {PLASTIC_TYPE.map((plastic) => (
                          <ProductItem
                            state={field.value === plastic}
                            onToggle={onToggle}
                            label={plastic}
                            key={plastic}
                          />
                        ))}
                      </div>

                      {error?.message && (
                        <Typography
                          className="error absolute"
                          color="text-bg-500"
                        >
                          {error?.message}
                        </Typography>
                      )}
                    </div>
                  );
                }}
              />

              <div className="mt-[50px] flex justify-center sm:mt-[60px]">
                <LoadingButton type="submit" loading={loading}>
                  <Typography
                    className="sm:button-but1 button-but2"
                    color="text-white"
                  >
                    계산하기
                  </Typography>
                </LoadingButton>
                <div ref={scrollRef} />
              </div>
            </div>
          </div>
          <AnimatePresence>
            {calculatedCarbonData && calculatedCarbonData?.percent ? (
              <motion.div
                key={`radialBar${radialBarNum.current}`}
                initial={{ opacity: 0 }}
                animate={fadeIn}
                exit={{ opacity: 0 }}
                className="min-w-[320px] px-20"
              >
                <div className="relative mb-7 mt-8 flex flex-col gap-6 sm:mb-[53px] sm:mt-[130px] sm:block md:mb-[68px]">
                  <RadialBarResult
                    calculResult={calculatedCarbonData.reductionPercent}
                    calculData={calculatedCarbonData.revationLastCalculatedData}
                    delay={BAR_ANIMATE_DELAY}
                  />
                  <RadialBar
                    duration={1000}
                    progressFirstValue={FIRST_BAR_DEFAULT_PERCENT}
                    progressSecondValue={calculatedCarbonData.percent}
                    delay={BAR_ANIMATE_DELAY}
                    lastCalculData={calculatedCarbonData.lastCalculatedData}
                  />
                </div>
                <Typography
                  color="text-bg-400"
                  className="md:title-lg sm:title-md title-xs-sb text-center"
                >
                  LESS PLASTIC SOLUTION으로
                  <br />
                  편백나무 {treeConverter()}그루를 심는 효과가 발생합니다.
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
                <div className="mb-[80px] mt-[70px] flex w-full flex-col items-center gap-[54px] sm:mb-[140px] sm:mt-20">
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
                    PDF를 받지 못한 경우, 고객 지원팀에 문의해 주세요.
                  </Typography>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={fadeOut}
              >
                <div
                  className={`flex h-[593px] items-center justify-center sm:h-[936px] md:h-[1070px]`}
                >
                  <EmptyResult />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Form>
        <Popup open={openPopup} onClose={onClosePopup}>
          <AnimatePresence>
            <motion.div
              key="popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              <UserForm
                onClose={onClosePopup}
                formData={formData}
                calculatedCarbonData={calculatedCarbonData}
              />
            </motion.div>
          </AnimatePresence>
        </Popup>
        <Footer />
      </div>
    </>
  );
}

export default App;
