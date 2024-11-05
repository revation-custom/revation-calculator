import { DEFAULT_ALL_DATA } from '../constants/defaultForm';
import { REVATION_PLASTIC_TYPE } from '../constants/plastic';
import { FormType } from '../types/form';
import { getPlasticType } from '../types/plastic';
import { calculateSteps } from '../utils/calculateSteps';

export const getCarbonData = (
  resData: getPlasticType[],
  formData: FormType,
) => {
  const { productCount, productWeight } = formData;
  const selectedResData = resData.find(
    (res) => res.plastic_type === formData.basicPlastic,
  );

  if (!selectedResData) return DEFAULT_ALL_DATA;

  const newMaterialResData = resData.filter((res) =>
    REVATION_PLASTIC_TYPE.includes(res.plastic_type),
  );

  const calculatedData = calculateSteps(
    selectedResData,
    productCount,
    productWeight,
  );
  const revationCalculatedData = newMaterialResData.map((res) =>
    calculateSteps(res, productCount, productWeight),
  );
  const lastCalculatedData = calculatedData[calculatedData.length - 1];

  const revationLastCalculatedData =
    revationCalculatedData.reduce((acc, cur) => acc + cur[cur.length - 1], 0) /
    REVATION_PLASTIC_TYPE.length;

  const revationReductionPercent = revationCalculatedData.map(
    (res) =>
      ((lastCalculatedData - res[res.length - 1]) / lastCalculatedData) * 100,
  );
  const percent =
    (revationLastCalculatedData / (lastCalculatedData / 0.8)) * 100;
  const reductionPercent =
    ((lastCalculatedData - revationLastCalculatedData) / lastCalculatedData) *
    100;

  return {
    percent,
    reductionPercent,
    calculatedData,
    lastCalculatedData,
    revationLastCalculatedData,
    revationCalculatedData,
    revationReductionPercent,
    reductionData: revationLastCalculatedData - lastCalculatedData,
  };
};
