import * as yup from 'yup';
import { BasicPlastic } from '../types/form';

export const formSchema = yup.object().shape({
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

export const userFormSchema = yup.object().shape({
  company: yup.string().required('회사명을 입력해주세요.'),
  name: yup.string().required('성함을 입력해주세요.'),
  email: yup.string().required('이메일을 입력해주세요.'),
  phone: yup.string().required('전화번호를 입력해주세요.'),
  privacyAgree: yup
    .boolean()
    .required('개인정보처리방침에 반드시 동의해주세요.')
    .oneOf([true], '개인정보처리방침에 반드시 동의해주세요.'),
});
