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

  if (!selectedResData) return;

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

  const percent =
    ((lastCalculatedData - revationLastCalculatedData) / lastCalculatedData) *
    100;

  return { percent, lastCalculatedData, revationLastCalculatedData };
};
