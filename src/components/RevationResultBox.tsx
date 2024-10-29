import getCarbonDataUnit from '../useCase/getCarbonDataUnit';
import { Typography } from './Typography';

interface RevationResultBoxProps {
  resultData: number;
}

export const RevationResultBox = ({ resultData }: RevationResultBoxProps) => {
  return (
    <div className="result-box flex h-[210px] w-full flex-col items-center justify-center gap-3 py-[125px] xs:h-[474px] sm:h-[350px] md:h-[382px] md:w-full">
      <Typography className="body-lg" color="text-bg-100">
        소재 01
      </Typography>
      <div className="flex flex-col items-center">
        <Typography className="heading-sm leading-[45.6px]" color="text-bg-100">
          {getCarbonDataUnit(resultData)}
        </Typography>
      </div>
    </div>
  );
};
