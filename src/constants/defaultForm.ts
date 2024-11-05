import { CalculatedDataType } from '../types/form';

export const DEFAULT_USER_FORM = {
  company: '',
  name: '',
  email: '',
  phone: '',
  privacyAgree: false,
};

export const MINIMUM_NUM = 1000000;

export const DEFAULT_ALL_DATA: CalculatedDataType = {
  percent: 0,
  reductionPercent: 0,
  calculatedData: [],
  lastCalculatedData: 0,
  revationLastCalculatedData: 0,
  revationCalculatedData: [[]],
  reductionData: 0,
  basicPlastic: 'NONE',
  productCount: 0,
  productWeight: 0,
  revationReductionPercent: [],
};
