import { UNIT } from '../constants/common';
import useDelayAnimating from '../hooks/useDelayAnimating';
import { BasicPlastic } from '../types/form';
import { AnimatedNumber } from '../utils/animatedNumber';
import { formatNumber } from '../utils/formatNumber';
import { Typography } from './Typography';

export const RadialBarResult = ({
  calculResult,
  calculData,
  basicType,
  delay,
}: {
  calculResult: number;
  calculData: number;
  basicType: BasicPlastic;
  delay: number;
}) => {
  const { isAnimating } = useDelayAnimating(delay);

  return (
    <div className="flex flex-col items-center gap-3 font-pretendard text-primary-600 sm:absolute sm:left-1/2 sm:top-[55%] sm:-translate-x-1/2 sm:-translate-y-1/2 md:gap-4">
      <div className="body-md-sb sm:title-md md:title-lg">
        리베이션 제품 탄소 발생량
      </div>
      <div className="flex flex-col items-center sm:gap-1">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-[2px] sm:gap-1">
            <div className="text-primary-600 en-body-2xs sm:en-body-sm">
              {basicType}
            </div>
            <div className="text-primary-600 body-2xs-sb sm:body-sm"> 대비</div>
          </div>
          <div className="leading-[38px] heading-xs sm:leading-[46px] sm:heading-sm md:leading-[67px] md:heading-md">
            <AnimatedNumber value={calculResult} isAnimating={isAnimating} />%
            절감
          </div>
        </div>

        <div className="flex">
          <Typography color="text-primary-600" className="body-sm md:body-lg">
            {formatNumber(calculData)}
          </Typography>
          <Typography color="text-primary-600" className="en-body-sm">
            {UNIT}
          </Typography>
        </div>
      </div>
    </div>
  );
};
