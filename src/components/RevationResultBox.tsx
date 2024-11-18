import { twMerge } from 'tailwind-merge';
import { UNIT } from '../constants/common';
import { Plastic } from '../types/form';
import { formatNumber } from '../utils/formatNumber';
import { Typography } from './Typography';
import { Button } from './Button';
import RevationInfoPopup from '../containers/RevationInfoPopup';
import { useState } from 'react';
import { firstWordSplit } from '../utils/firstWordSplit';

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
  const [open, setOpen] = useState(false);

  return (
    <div
      className={twMerge(
        'flex aspect-[4/3] flex-1 flex-col items-center justify-center gap-6 bg-url sm:aspect-auto sm:gap-7 sm:py-[125px] md:aspect-[4/3] md:py-0',
        `product-item-box-${firstWordSplit(label)}`,
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <Typography className="en-body-sm sm:body-lg" color="text-bg-100">
          {label}
        </Typography>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 blur-[6px]">
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
          <div className="flex justify-center">
            <Typography
              className="blur-[3px] body-2xs sm:body-2xs-sb"
              color="text-bg-100"
            >
              {reductionPercent.toFixed(0)}
            </Typography>
            <Typography className="body-2xs sm:body-2xs-sb" color="text-bg-100">
              % 절감
            </Typography>
          </div>
        </div>
      </div>
      <Button variant="md" type="button" onClick={() => setOpen(true)}>
        Click Here
      </Button>
      <RevationInfoPopup
        label={label}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};
