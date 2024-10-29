import { MINIMUM_NUM } from '../constants/defaultForm';

export const formatNumber = (num: number) => {
  const convertNum = num / 1000;
  if (convertNum >= MINIMUM_NUM) return '999,999.99';
  return thousandNumber(Math.round(convertNum * 100) / 100);
};

export const thousandNumber = (num: number) => {
  return num.toLocaleString('en-US');
};
