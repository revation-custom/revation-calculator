import { useForm } from 'react-hook-form';
import { Form } from './FormProvider';
import { Typography } from '../components/Typography';
import { FormInput } from './FormInput';
import { Checkbox } from '../components/Checkbox';
import { LoadingButton } from '../components/LoadingButton';
import { useEffect, useState } from 'react';
import { useWatchFieldValues } from '../hooks/useWatchFieldValues';
import { yupResolver } from '@hookform/resolvers/yup';
import { CalculatedDataType, FormType, UserFormType } from '../types/form';
import { userFormSchema } from '../constants/schema';
import { DEFAULT_USER_FORM } from '../constants/defaultForm';
import SecondPage from './PDF/SecondPage';
import { downloadHtmlAsPDF } from '../utils/downloadHtmlAsPDF';
import postCalculHistory from '../apis/postCalculHistory';
import PopupLayout from '../components/Popup/PopupLayout';
import { Popup } from '../components/Popup';
import PrivacyAgreePopup from './PrivacyAgreePopup';

interface UserFormProps {
  onClose: () => void;
  formData: FormType;
  calculatedCarbonData: CalculatedDataType;
  open: boolean;
}

export const UserForm = ({
  onClose,
  formData,
  calculatedCarbonData,
  open,
}: UserFormProps) => {
  const methods = useForm<UserFormType>({
    defaultValues: DEFAULT_USER_FORM,
    resolver: yupResolver(userFormSchema),
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const { handleSubmit, watch, setValue, formState, reset } = methods;
  const { isButtonDisabled } = useWatchFieldValues(watch());

  const getPdf = () => {
    downloadHtmlAsPDF(
      '리베이션_탄소배출보고서',
      [<SecondPage calculatedCarbonData={calculatedCarbonData} />],
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
        onClose();
        reset();
      },
    );
  };

  const onSubmit = async (data: UserFormType) => {
    const { basicPlastic, productCount, productWeight } = formData;
    const { company, name, email, phone } = data;

    const { error } = await postCalculHistory({
      basicPlastic,
      productCount,
      productWeight,
      company,
      name,
      email,
      phone,
    });
    if (error) {
      return;
    }
    getPdf();
  };

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <>
      <Popup open={open} onClose={onClose}>
        <PopupLayout key="user-form-popup">
          <Popup.Contents>
            <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <div className="flex w-[calc(100vw-64px)] min-w-[256px] flex-col gap-[10px] bg-white px-16 pb-32 sm:w-[665px] sm:px-24 sm:pb-32">
                <div className="flex flex-col">
                  <Popup.Title>정보 입력</Popup.Title>
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
                        type="phone"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1.5">
                        <div
                          className="flex cursor-pointer items-center gap-1.5"
                          onClick={() =>
                            setValue('privacyAgree', !watch('privacyAgree'))
                          }
                        >
                          <Checkbox state={watch('privacyAgree')} />
                          <Typography
                            color="text-gray-700"
                            className="body-3xs sm:title-xs"
                          >
                            개인정보처리방침에 동의합니다.
                          </Typography>
                        </div>

                        <Typography
                          color="text-primary-600"
                          className="cursor-pointer underline body-3xs sm:body-sm"
                        >
                          <div onClick={() => setPopup(true)}>
                            View <span className="hidden sm:inline">Terms</span>
                          </div>
                        </Typography>
                      </div>
                      {formState.errors.privacyAgree?.message && (
                        <Typography className="error" color="text-bg-500">
                          {formState.errors.privacyAgree.message}
                        </Typography>
                      )}
                    </div>
                    <Popup.Footer>
                      <LoadingButton
                        loading={loading}
                        type="submit"
                        disabled={isButtonDisabled}
                        variant="lg"
                      >
                        <Typography
                          className="button-but2 sm:button-but1"
                          color="text-white"
                        >
                          다운받기
                        </Typography>
                      </LoadingButton>
                    </Popup.Footer>
                  </div>
                </div>
              </div>
            </Form>
          </Popup.Contents>
        </PopupLayout>
      </Popup>
      <PrivacyAgreePopup
        label="개인정보처리방침"
        open={popup}
        onClose={() => setPopup(false)}
        onSubmit={() => {
          setValue('privacyAgree', true);
          setPopup(false);
        }}
      />
    </>
  );
};
