import { MINIMUM_NUM } from '../constants/defaultForm';
import {
  RevationCalculatedDataType,
  RevationReductionPercentType,
} from '../types/form';

export const formatNumber = (
  num:
    | number
    | string
    | number[]
    | RevationCalculatedDataType
    | RevationReductionPercentType,
) => {
  if (typeof num === 'object') return '';
  if (typeof num !== 'number') return num;
  const convertNum = num / 1000;
  if (convertNum >= MINIMUM_NUM) return '999,999.99';
  return thousandNumber(Math.round(convertNum * 100) / 100);
};

export const thousandNumber = (num: number | string) => {
  if (typeof num !== 'number') return num;

  return num.toLocaleString('en-US');
};

export const formatPhoneNumber = (value: string) => {
  if (!value) return '';

  if (value.length <= 3) return value;
  if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;
  return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
};
