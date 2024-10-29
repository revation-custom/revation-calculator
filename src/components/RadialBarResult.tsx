import useDelayAnimating from '../hooks/useDelayAnimating';
import getCarbonDataUnit from '../useCase/getCarbonDataUnit';
import { AnimatedNumber } from '../utils/animatedNumber';

export const RadialBarResult = ({
  calculResult,
  calculData,
  delay,
}: {
  calculResult: number;
  calculData: number;
  delay: number;
}) => {
  const { isAnimating } = useDelayAnimating(delay);

  return (
    <div className="flex flex-col items-center gap-3 font-pretendard text-primary-600 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 md:gap-4">
      <div className="md:title-lg sm:title-md body-md-sb">
        리베이션 제품 탄소 발생량
      </div>
      <div className="flex flex-col items-center sm:gap-1">
        <div className="md:heading-md sm:heading-sm heading-xs leading-[38px] sm:leading-[46px] md:leading-[67px]">
          <AnimatedNumber value={calculResult} isAnimating={isAnimating} />%
          절감
        </div>
        <div className="md:body-lg body-sm">
          {getCarbonDataUnit(calculData)}
        </div>
      </div>
    </div>
  );
};
