import { twMerge } from 'tailwind-merge';
import { UNIT } from '../constants/common';
import { Plastic } from '../types/form';
import { formatNumber } from '../utils/formatNumber';
import { Typography } from './Typography';
import { LoadingButton } from './LoadingButton';
import { Button } from './Button';

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
    <div
      className={twMerge(
        'flex aspect-[4/3] flex-1 flex-col items-center justify-center gap-6 bg-url sm:aspect-auto sm:gap-7 sm:py-[125px] md:aspect-[4/3] md:py-0',
        `product-item-box-${label.split(/[ (]/)[0]}`,
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <Typography className="en-body-sm sm:body-lg" color="text-bg-100">
          {label}
        </Typography>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Typography
              className="leading-[45.6px] heading-xs sm:heading-sm"
              color="text-bg-100"
            >
              {formatNumber(resultData)}
            </Typography>
            <Typography className="en-body-lg sm:title-xl" color="text-bg-100">
              {UNIT}
            </Typography>
          </div>
          <div className="text-center">
            <Typography className="body-2xs sm:body-2xs-sb" color="text-bg-100">
              {reductionPercent.toFixed(0)}% 절감
            </Typography>
          </div>
        </div>
      </div>
      <Button variant="md" type="button">
        Click Here
      </Button>
    </div>
  );
};
