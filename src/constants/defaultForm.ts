import { CalculatedDataType } from '../types/form';

export const DEFAULT_USER_FORM = {
  company: '',
  name: '',
  email: '',
  phone: '',
  privacyAgree: false,
};

export const MINIMUM_NUM = 100000;

export const DEFAULT_ALL_DATA: CalculatedDataType = {
  percent: 0,
  reductionPercent: 0,
  calculatedData: [],
  lastCalculatedData: 0,
  revationLastCalculatedData: 0,
  reductionData: 0,
  basicPlastic: 'NONE',
  productCount: 0,
  productWeight: 0,
  revationCalculatedData: {
    'WOOD COMPOSITE': [],
    'LIMESTONE COMPOSITE': [],
    'PLA(Polylactic acid)': [],
  },
  revationReductionPercent: {
    'WOOD COMPOSITE': 0,
    'LIMESTONE COMPOSITE': 0,
    'PLA(Polylactic acid)': 0,
  },
};
