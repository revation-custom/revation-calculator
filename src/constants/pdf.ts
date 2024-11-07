import { CalculatedDataType } from '../types/form';
import { UNIT } from './common';

export type PDF_BASIC_RESULT_TYPE = {
  title: string;
  unit: string;
  type: keyof CalculatedDataType;
}[];

export type EXAMPLE_CASE_RESULT_TYPE = {
  title: string;
  unit: null | string;
  data: string;
}[];

export const PDF_BASIC_RESULT: PDF_BASIC_RESULT_TYPE = [
  {
    title: '소재',
    unit: 'PP',
    type: 'basicPlastic',
  },
  {
    title: '제품 무게',
    unit: 'PP',
    type: 'productWeight',
  },
  {
    title: '제품 수량',
    unit: 'ea',
    type: 'productCount',
  },
  {
    title: 'PP 소재 최저 배출량',
    unit: UNIT,
    type: 'lastCalculatedData',
  },
  {
    title: '대체 소재 최저 배출량',
    unit: UNIT,
    type: 'revationLastCalculatedData',
  },
  {
    title: '탄소 배출 저감량',
    unit: UNIT,
    type: 'reductionData',
  },
];

export const EXAMPLE_CASE_RESULT: EXAMPLE_CASE_RESULT_TYPE = [
  {
    title: '고객사',
    unit: null,
    data: '기업은행',
  },
  {
    title: '제품',
    unit: null,
    data: '현금 트레이',
  },
  {
    title: '소재',
    unit: null,
    data: 'PP -> WOOD COMPOSITE',
  },
  {
    title: '제품 무게',
    unit: 'g',
    data: '100',
  },
  {
    title: '제품 수량',
    unit: 'ea',
    data: '20,000',
  },
  {
    title: '탄소 저감량',
    unit: UNIT,
    data: '19,050',
  },
];
