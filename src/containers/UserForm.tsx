import { useForm } from 'react-hook-form';
import { Form } from './FormProvider';
import { Typography } from '../components/Typography';
import { FormInput } from './FormInput';
import { Checkbox } from '../components/Checkbox';
import { LoadingButton } from '../components/LoadingButton';
import { IcWarning } from '../assets/icons/IcWarning';
import { useEffect, useState } from 'react';
import { useWatchFieldValues } from '../hooks/useWatchFieldValues';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormType, UserFormType } from '../types/form';
import { supabase } from '../supabase/instance';
import { userFormSchema } from '../constants/schema';
import { DEFAULT_USER_FORM } from '../constants/defaultForm';

interface UserFormProps {
  onClose: () => void;
  formData: FormType;
}

export const UserForm = ({ onClose, formData }: UserFormProps) => {
  const methods = useForm<UserFormType>({
    defaultValues: DEFAULT_USER_FORM,
    resolver: yupResolver(userFormSchema),
  });

  const [loading, setLoading] = useState(false);
  const { handleSubmit, watch, setValue, formState, reset } = methods;
  const { isButtonDisabled } = useWatchFieldValues(watch());

  const onSubmit = async (data: UserFormType) => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      reset();
      const { basicPlastic, productCount, productWeight } = formData;
      const { company, name, email } = data;

      const { error } = await supabase.from('calcul_histories').insert({
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
      onClose();
    }, 3000);
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
          <Typography className="heading-xs border-b border-gray-900 p-10 pb-15">
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
                  className="sm:title-xs body-3xs"
                >
                  개인정보처리방침에 동의합니다.
                </Typography>
                <Typography
                  color="text-primary-600"
                  className="body-3xs sm:body-sm underline"
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
                  className="sm:button-but1 button-but2"
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