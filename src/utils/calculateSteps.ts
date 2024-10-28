import { getPlasticType } from '../types/plastic';

export const calculateSteps = (
  data: getPlasticType,
  productCount: number,
  productWeight: number,
) => {
  const {
    raw_material_step,
    manufacture_step,
    transport_step,
    incineration_step,
    incineration_percent,
    recycle_step,
    recycle_percent,
  } = data;

  const rawStepFunc = raw_material_step;
  const manufactureStepFunc = rawStepFunc + manufacture_step;
  const transportStepFunc = manufactureStepFunc + transport_step;
  const resultStepFunc =
    transportStepFunc +
    incineration_step * incineration_percent +
    recycle_step * recycle_percent;

  const funcArray = [
    rawStepFunc,
    manufactureStepFunc,
    transportStepFunc,
    resultStepFunc,
  ];
  const resultArray = funcArray.map(
    (func) => func * productCount * productWeight,
  );

  return resultArray;
};
