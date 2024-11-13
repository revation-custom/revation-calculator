import { CalculatedDataType } from '../types/form';
import { thousandNumber } from './formatNumber';
import { TREE_DIVIDER } from '../constants/tree';

export const treeConverter = (calculatedCarbonData: CalculatedDataType) => {
  if (calculatedCarbonData?.lastCalculatedData) {
    const carbonCount =
      calculatedCarbonData.lastCalculatedData -
      calculatedCarbonData.revationLastCalculatedData;

    return thousandNumber(Math.floor(carbonCount / TREE_DIVIDER));
  }

  return null;
};
