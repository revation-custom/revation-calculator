import { useForm } from 'react-hook-form';
import { Form } from './FormProvider';
import { Typography } from '../components/Typography';
import { FormInput } from './FormInput';
import { Checkbox } from '../components/Checkbox';
import { LoadingButton } from '../components/LoadingButton';
import { IcWarning } from '../assets/icons/IcWarning';
import { ReactNode, useEffect, useState } from 'react';
import { useWatchFieldValues } from '../hooks/useWatchFieldValues';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormType, UserFormType } from '../types/form';
import { supabase } from '../supabase/instance';
import { userFormSchema } from '../constants/schema';
import { DEFAULT_USER_FORM } from '../constants/defaultForm';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { renderToString } from 'react-dom/server';
import FirstPage from './PDF/FirstPage';
import SecondPage from './PDF/SecondPage';

interface UserFormProps {
  onClose: () => void;
  formData: FormType;
  calculatedCarbonData: any;
}

export const UserForm = ({
  onClose,
  formData,
  calculatedCarbonData,
}: UserFormProps) => {
  const methods = useForm<UserFormType>({
    defaultValues: DEFAULT_USER_FORM,
    resolver: yupResolver(userFormSchema),
  });

  const [loading, setLoading] = useState(false);
  const { handleSubmit, watch, setValue, formState, reset } = methods;
  const { isButtonDisabled } = useWatchFieldValues(watch());

  async function createDynamicPageImage(
    component: ReactNode,
    width: number,
    height: number,
  ) {
    const componentHtml = renderToString(component);
    const container = document.createElement('div');
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.style.backgroundColor = '#ffffff';
    container.innerHTML = componentHtml;
    document.body.appendChild(container); // 임시로 HTML 요소 추가
    const scale = 8;

    // html2canvas로 HTML을 캡처하여 이미지로 변환
    const canvas = await html2canvas(container, {
      width: width,
      height: height,
      scale: scale,
    });
    const imageDataUrl = canvas.toDataURL('image/png');
    document.body.removeChild(container); // 임시 요소 제거

    return imageDataUrl;
  }

  const loadAndModifyPDF = async () => {
    const existPdfBytes = await fetch('/test.pdf').then((res) =>
      res.arrayBuffer(),
    );
    const existPdfBytes2 = await fetch('/second_page.pdf').then((res) =>
      res.arrayBuffer(),
    );

    const pdfDoc = await PDFDocument.load(existPdfBytes);
    const pdfSecondDoc = await PDFDocument.load(existPdfBytes2);
    const newPdfDoc = await PDFDocument.create();

    const components = [
      <FirstPage />,
      <SecondPage calculatedCarbonData={calculatedCarbonData} />,
    ]; // 여기에 추가하고 싶은 컴포넌트를 추가

    for (const component of components) {
      const { width, height } = pdfSecondDoc.getPages()[0].getSize(); // 기준 페이지 크기 사용
      const dynamicPage = newPdfDoc.addPage([width, height]); // 각 컴포넌트에 대해 새 페이지 생성
      const dynamicContentImage = await createDynamicPageImage(
        component,
        width,
        height,
      ); // 컴포넌트를 이미지로 변환
      const embeddedImage = await newPdfDoc.embedPng(dynamicContentImage);

      dynamicPage.drawImage(embeddedImage, {
        // 페이지에 이미지 삽입
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    }
    const [thirdPage] = await newPdfDoc.copyPages(pdfSecondDoc, [0]);

    const [fourthPage] = await newPdfDoc.copyPages(pdfDoc, [3]);

    newPdfDoc.addPage(thirdPage);
    newPdfDoc.addPage(fourthPage);

    return { pdfDoc, newPdfDoc };
  };

  const downloadHtmlAsPDF = async () => {
    setLoading(true);
    const { newPdfDoc } = await loadAndModifyPDF();
    const pdfBytes = await newPdfDoc.save();

    saveAs(new Blob([pdfBytes]), 'test.pdf');
    setLoading(false);
    onClose();
  };

  const onSubmit = async (data: UserFormType) => {
    downloadHtmlAsPDF();
    const { basicPlastic, productCount, productWeight } = formData;
    const { company, name, email, phone } = data;

    const { error } = await supabase.from('calcul_histories').insert({
      plastic_type: basicPlastic,
      product_count: productCount,
      product_weight: productWeight,
      company,
      name,
      email,
      phone,
    });
    if (error) {
      console.log(error);
      return;
    }
    reset();
  };

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col gap-[10px] bg-white px-16 pb-32 pt-20 sm:w-[665px] sm:px-24 sm:py-32">
        <div className="cursor-pointer self-end" onClick={onClose}>
          <IcWarning />
        </div>
        <div className="flex flex-col">
          <Typography className="border-b border-gray-900 p-10 pb-15 heading-xs">
            정보 입력
          </Typography>
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-2 pt-32 sm:gap-5">
              <FormInput
                name="company"
                label="소속명 *"
                placeholder="소속명을 입력해주세요."
              />
              <FormInput
                name="name"
                label="성함 *"
                placeholder="성함을 입력해주세요."
              />
              <FormInput
                name="email"
                label="이메일 *"
                placeholder="이메일을 입력해주세요."
              />
              <FormInput
                name="phone"
                label="전화번호 *"
                placeholder="전화번호를 입력해주세요."
              />
            </div>
            <div
              className="flex flex-col gap-1"
              onClick={() => setValue('privacyAgree', !watch('privacyAgree'))}
            >
              <div className="flex cursor-pointer items-center gap-1.5">
                <Checkbox state={watch('privacyAgree')} />
                <Typography
                  color="text-gray-700"
                  className="body-3xs sm:title-xs"
                >
                  개인정보처리방침에 동의합니다.
                </Typography>
                <Typography
                  color="text-primary-600"
                  className="underline body-3xs sm:body-sm"
                >
                  <a href="https://google.com" target="_blank">
                    View <span className="hidden sm:inline">Terms</span>
                  </a>
                </Typography>
              </div>
              {formState.errors.privacyAgree?.message && (
                <Typography className="error" color="text-bg-500">
                  {formState.errors.privacyAgree.message}
                </Typography>
              )}
            </div>
            <div className="mt-10 self-end">
              <LoadingButton
                loading={loading}
                type="submit"
                disabled={isButtonDisabled}
              >
                <Typography
                  className="button-but2 sm:button-but1"
                  color="text-white"
                >
                  다운받기
                </Typography>
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};
