import { UNIT } from '../constants/common';
import { Plastic } from '../types/form';
import { formatNumber } from '../utils/formatNumber';
import { Typography } from './Typography';

interface RevationResultBoxProps {
  label: Plastic;
  resultData: number;
}

export const RevationResultBox = ({
  label,
  resultData,
}: RevationResultBoxProps) => {
  return (
    <div className="result-box flex aspect-[4/3] flex-1 flex-col items-center justify-center gap-3 py-[125px] sm:aspect-auto md:aspect-[4/3]">
      <Typography className="body-lg" color="text-bg-100">
        {label}
      </Typography>
      <div className="flex flex-col items-center">
        <Typography className="heading-sm leading-[45.6px]" color="text-bg-100">
          {formatNumber(resultData)}
        </Typography>
        <Typography className="en-body-sm" color="text-bg-100">
          {UNIT}
        </Typography>
      </div>
    </div>
  );
};
