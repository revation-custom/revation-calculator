import { formatNumber } from '../utils/formatNumber';
import { Typography } from './Typography';

interface TableProps {
  tableData: number[];
}

export const Table = ({ tableData }: TableProps) => {
  return (
    <div className="flex items-center gap-4 border-b border-t border-primary-500 bg-bg-200 bg-opacity-20 px-16 py-16 sm:gap-6 sm:px-24">
      <Typography
        color="text-font"
        className="sm:body-xs body-2xs w-47 sm:w-56"
      >
        리베이션 탄소량
      </Typography>
      <div className="flex flex-1 flex-col divide-y divide-bg-200">
        {tableData.map((data) => (
          <div
            key={`${data}`}
            className="flex gap-4 divide-x divide-bg-200 py-12 pl-12 sm:py-14"
          >
            <Typography color="text-font" className="body-xs">
              원료
            </Typography>
            <Typography
              color="text-primary-500"
              className="sm:table-md body-2xs flex flex-1 justify-center"
            >
              {formatNumber(data)} kg CO2e
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
