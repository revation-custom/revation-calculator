import { AnimatedNumber } from '../utils/animatedNumber';

export const RadialBarResult = ({
  calculResult,
  calculData,
}: {
  calculResult: number;
  calculData: number;
}) => {
  return (
    <div className="flex flex-col items-center gap-3 font-pretendard text-primary-600 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 md:gap-4">
      <div className="text-18 font-semibold sm:text-22 md:text-2xl">
        리베이션 제품 탄소 발생량
      </div>
      <div className="flex flex-col items-center sm:gap-1">
        <div className="text-32 font-extrabold leading-[38px] sm:leading-[46px] md:text-5xl md:leading-[67px]">
          <AnimatedNumber value={calculResult} />% 절감
        </div>
        <div className="text-16 font-semibold md:text-xl">
          {calculData}kg CO2e
        </div>
      </div>
    </div>
  );
};
