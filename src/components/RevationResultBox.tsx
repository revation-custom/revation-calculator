import { UNIT } from '../constants/common';
import { Plastic } from '../types/form';
import { formatNumber } from '../utils/formatNumber';
import { Typography } from './Typography';

interface RevationResultBoxProps {
  label: Plastic;
  resultData: number;
  reductionPercent: number;
}

export const RevationResultBox = ({
  label,
  resultData,
  reductionPercent,
}: RevationResultBoxProps) => {
  return (
    <div className="result-box bg-url flex aspect-[4/3] flex-1 flex-col items-center justify-center gap-3 sm:aspect-auto sm:py-[125px] md:aspect-[4/3] md:py-0">
      <Typography className="body-lg" color="text-bg-100">
        {label}
      </Typography>
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <Typography
            className="leading-[45.6px] heading-sm"
            color="text-bg-100"
          >
            {formatNumber(resultData)}
          </Typography>
          <Typography className="title-xl" color="text-bg-100">
            {UNIT}
          </Typography>
        </div>
        <div className="text-center">
          <Typography className="body-lg" color="text-bg-100">
            {reductionPercent.toFixed(0)}% 절감
          </Typography>
        </div>
      </div>
    </div>
  );
};
