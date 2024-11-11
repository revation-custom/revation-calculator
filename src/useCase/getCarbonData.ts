import { DEFAULT_ALL_DATA } from '../constants/defaultForm';
import { REVATION_PLASTIC_TYPE } from '../constants/plastic';
import {
  FormType,
  RevationPlastic,
  RevationReductionPercentType,
} from '../types/form';
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
    REVATION_PLASTIC_TYPE.includes(res.plastic_type as RevationPlastic),
  );

  const revationCalculatedData: Record<RevationPlastic, number[]> =
    newMaterialResData.reduce(
      (acc, type) => {
        acc[type.plastic_type as RevationPlastic] = calculateSteps(
          type,
          productCount,
          productWeight,
        );
        return acc;
      },
      {} as Record<RevationPlastic, number[]>,
    );

  const calculatedData = calculateSteps(
    selectedResData,
    productCount,
    productWeight,
  );
  const lastCalculatedData = calculatedData[calculatedData.length - 1];

  // const revationLastCalculatedData =
  //   Object.values(revationCalculatedData).reduce(
  //     (acc, cur) => acc + cur[cur.length - 1],
  //     0,
  //   ) / REVATION_PLASTIC_TYPE.length;
  const revationLastCalculatedArray = Object.values(revationCalculatedData).map(
    (arr) => arr[arr.length - 1],
  );
  const revationLastCalculatedData = Math.min(
    ...Object.values(revationLastCalculatedArray),
  );

  const revationReductionPercent = (
    Object.entries(revationCalculatedData) as [RevationPlastic, number[]][]
  ).reduce((acc, [key, values]) => {
    const lastValue = values[values.length - 1];
    const reductionPercent =
      ((lastCalculatedData - lastValue) / lastCalculatedData) * 100;
    acc[key] = reductionPercent;

    return acc;
  }, {} as RevationReductionPercentType);

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
