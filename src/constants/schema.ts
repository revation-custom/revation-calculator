import * as yup from 'yup';
import { BasicPlastic } from '../types/form';
import { MINIMUM_NUM } from './defaultForm';
import { MAX_COUNT, MAX_WEIGHT } from './common';
import { PLASTIC_TYPE } from './plastic';

export const formSchema = yup.object().shape({
  basicPlastic: yup
    .mixed<BasicPlastic>()
    .required()
    .test(
      'basicPlasticSelect',
      '반드시 소재 하나를 선택해주세요.',
      function (value) {
        return PLASTIC_TYPE.includes(value);
      },
    ),

  productCount: yup
    .number()
    .required('제품 수량을 입력해주세요.')
    .typeError('제품 수량은 숫자만 입력 가능합니다.')
    .min(1, '수량은 1개 이상이여야 합니다.')
    .max(MAX_COUNT, '수량은 최대 1,000,000개 까지 입력 가능합니다.')
    .test(
      'productCountMultiply',
      '수량과 무게의 곱셈 값이 100,000이 넘어야합니다.',
      function (value) {
        const { productWeight } = this.parent;
        return value * productWeight >= MINIMUM_NUM;
      },
    ),
  productWeight: yup
    .number()
    .required('제품 무게를 입력해주세요.')
    .typeError('제품 무게는 숫자만 입력 가능합니다.')
    .min(1, '무게는 1g 이상이여야 합니다.')
    .test(
      'productWeightMultiply',
      '수량과 무게의 곱셈 값이 100,000이 넘어야합니다.',
      function (value) {
        const { productCount } = this.parent;
        return value * productCount >= MINIMUM_NUM;
      },
    )
    .max(MAX_WEIGHT, '무게는 최대 10,000g 까지 입력 가능합니다.'),
});

export const userFormSchema = yup.object().shape({
  company: yup.string().required('회사명을 입력해주세요.'),
  name: yup.string().required('성함을 입력해주세요.'),
  email: yup
    .string()
    .required('이메일을 입력해주세요.')
    .email('이메일 형식이 잘못되었습니다.'),
  phone: yup
    .string()
    .required('전화번호를 입력해주세요.')
    .matches(
      /^(010)-\d{4}-\d{4}$/,
      '전화번호 형식이 잘못되었습니다. 010-xxxx-xxxx의 형식으로 입력해주세요.',
    ),
  privacyAgree: yup
    .boolean()
    .required('개인정보처리방침에 반드시 동의해주세요.')
    .oneOf([true], '개인정보처리방침에 반드시 동의해주세요.'),
});
