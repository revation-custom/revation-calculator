import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { BasicPlastic, CalculatedDataType, FormType } from './types/form.ts';
import { Typography } from './components/Typography.tsx';
import RadialBar from './components/RadialBar.tsx';
import { LoadingButton } from './components/LoadingButton.tsx';
import { useRef, useState } from 'react';
import { ProductItem } from './containers/ProductItem.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { EmptyResult } from './components/EmptyResult.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { PLASTIC_TYPE, REVATION_PLASTIC_TYPE } from './constants/plastic.ts';
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
import { UserForm } from './containers/UserForm.tsx';
import { formSchema } from './constants/schema.ts';
import { formatNumber } from './utils/formatNumber.ts';
import {
  BAR_ANIMATE_DELAY,
  FIRST_BAR_DEFAULT_PERCENT,
} from './constants/radialBar.ts';
import { IcSnow } from './assets/icons/IcSnow.tsx';
import { DEFAULT_ALL_DATA } from './constants/defaultForm.ts';
import DuplicationPopup from './containers/DuplicationPopup.tsx';
import { useWatchFieldValues } from './hooks/useWatchFieldValues.ts';
import { UNIT } from './constants/common.ts';
import { treeConverter } from './utils/treeConverter.ts';

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
  const [calculatedCarbonData, setCalculatedCarbonData] =
    useState<CalculatedDataType>(DEFAULT_ALL_DATA);
  const [openPopup, setOpenPopup] = useState(false);
  const [openDuplicationPopup, setOpenDuplicationPopup] = useState(false);
  const [formData, setFormData] = useState<FormType>({
    basicPlastic: 'NONE',
    productCount: 0,
    productWeight: 0,
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const { handleSubmit, control, watch } = methods;
  const { isButtonDisabled, handleFormSubmit } = useWatchFieldValues(watch());

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    if (isButtonDisabled) {
      setOpenDuplicationPopup(true);
      return;
    }
    setLoading(true);
    radialBarNum.current++;
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    const { resData, error } = await getCalculNumber();
    if (resData === null || error) {
      return;
    }
    handleFormSubmit(data);

    setCalculatedCarbonData({ ...getCarbonData(resData, data), ...data });
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

  const onCloseDuplicationPopup = () => {
    setOpenDuplicationPopup(false);
  };

  return (
    <div>
      <Header />
      <div id="container" className="w-full min-w-[320px] bg-bg-100">
        <div
          id="topBox"
          className="flex h-[654px] w-full bg-primary-700 pt-72 sm:justify-center"
        >
          <div className="mx-5 flex w-full max-w-[522px] flex-col items-start justify-center gap-6 sm:max-w-[783px] sm:items-center">
            <Typography
              color="text-bg-50"
              className="sm:en-heading-lg en-heading-xs"
            >
              CALCULATOR
            </Typography>
            <Typography
              color="text-bg-200"
              className="sm:body-md break-keep text-left body-xs sm:text-center"
            >
              'REVATION'의 탄소배출계산기는 친환경 제품 도입을 위한 소재별 탄소
              배출 분석 시나리오를 제공합니다.
              <br />
              탄소배출계산기를 통해 일반적인 플라스틱 제품을 친환경 플라스틱으로
              전환함으로써 줄일 수 있는 예상 탄소 배출량 정보를 제공하여, 기업이
              지속가능한 결정을 내릴 수 있도록 도와주는 의사결정 보조 도구
              입니다.
              <br />
              'REVATION'은 기업의 탄소 중립을 향한 모든 과정을 함께하고자 하며
              지속 가능한 목표 달성을 위한 전략과 솔루션을 제공할 수 있습니다.
              <br />
              <br />
              탄소 중립을 향한 여정, 지금 REVATION과 시작하세요.
            </Typography>
          </div>
        </div>
        <div
          id="titleWrapper"
          className="mx-auto flex max-w-[1560px] flex-col gap-2 px-20 pb-70 pt-60 sm:gap-3 sm:pb-80 sm:pt-100"
        >
          <Typography
            className="en-body-sm sm:caption-md"
            color="text-primary-600"
          >
            CARBON EMISSION CALCULATE
          </Typography>
          <Typography className="heading-xs sm:heading-lg" color="text-font">
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
              <Typography className="title-sm md:title-md" color="text-bg-100">
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
                  <Typography className="body-xs sm:title-sm">
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
                          className="absolute error"
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
                <LoadingButton type="submit" loading={loading} variant="lg">
                  <Typography
                    className="button-but2 sm:button-but1"
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
                <div className="relative mb-7 mt-[60px] flex flex-col items-center gap-12 sm:mb-[53px] sm:mt-[80px] md:mb-[68px]">
                  <div className="hidden gap-12 sm:flex">
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                      >
                        <circle cx="6" cy="6.5" r="6" fill="#43564A" />
                      </svg>
                      <Typography
                        color="text-gray-600 tracking-[-0.32px]"
                        className="body-sm"
                      >
                        친환경 소재 최소 배출량
                      </Typography>
                      <div className="flex items-center">
                        <Typography color="text-font" className="body-md-sb">
                          {formatNumber(
                            calculatedCarbonData.revationLastCalculatedData,
                          )}
                        </Typography>
                        <Typography className="en-body-sm">{UNIT}</Typography>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                      >
                        <circle cx="6" cy="6.5" r="6" fill="#A2A2A5" />
                      </svg>
                      <Typography
                        color="text-gray-600 tracking-[-0.32px]"
                        className="body-sm"
                      >
                        기존 소재 최소 배출량
                      </Typography>
                      <div className="flex items-center">
                        <Typography color="text-font" className="body-md-sb">
                          {formatNumber(
                            calculatedCarbonData.lastCalculatedData,
                          )}
                        </Typography>
                        <Typography className="en-body-sm">{UNIT}</Typography>
                      </div>
                    </div>
                  </div>
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
                  />
                </div>
                <Typography
                  color="text-bg-400"
                  className="text-center title-xs-sb sm:title-md md:title-lg"
                >
                  LESS PLASTIC SOLUTION으로
                  <br />
                  편백나무 {treeConverter(calculatedCarbonData)}그루를 심는
                  효과가 발생합니다.
                </Typography>
                <div className="mt-[60px] sm:mt-[120px]">
                  <div className="mb-[20px] flex justify-start bg-primary-600 p-16 md:p-20">
                    <Typography
                      className="title-sm md:title-md"
                      color="text-bg-100"
                    >
                      친환경 소재별 도입 효과 (LCA 비교)
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-5 md:flex-row md:gap-[15px]">
                    {REVATION_PLASTIC_TYPE.map((type, idx: number) => (
                      <div
                        key={`${type}-${idx}`}
                        className="flex w-full flex-col gap-3 sm:gap-5 md:gap-4"
                      >
                        <RevationResultBox
                          label={REVATION_PLASTIC_TYPE[idx]}
                          resultData={
                            calculatedCarbonData.revationCalculatedData[type][3]
                          }
                          reductionPercent={
                            calculatedCarbonData.revationReductionPercent[type]
                          }
                        />
                        <Table
                          tableData={
                            calculatedCarbonData.revationCalculatedData[type]
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-[80px] mt-[70px] flex w-full flex-col items-center gap-[54px] sm:mb-[140px] sm:mt-20">
                  <LoadingButton
                    type="button"
                    loading={false}
                    variant="lg"
                    onClick={() => {
                      setOpenPopup(true);
                    }}
                  >
                    <Typography
                      className="button-but2 sm:button-but1"
                      color="text-white"
                    >
                      PDF 다운받기
                    </Typography>
                  </LoadingButton>
                  <Typography
                    color="text-gray-400"
                    className="text-center body-3xs sm:tooltip"
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
        <UserForm
          open={openPopup}
          onClose={onClosePopup}
          formData={formData}
          calculatedCarbonData={calculatedCarbonData}
        />
        <DuplicationPopup
          open={openDuplicationPopup}
          onClose={onCloseDuplicationPopup}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
