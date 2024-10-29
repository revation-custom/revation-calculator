import { formatNumber } from '../utils/formatNumber';

const getCarbonDataUnit = (data: number) => {
  return `${formatNumber(data)} tCO2e`;
};

export default getCarbonDataUnit;
