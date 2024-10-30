import { UNIT } from '../constants/common';
import { TABLE_LABEL } from '../constants/plastic';
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
        className="sm:body-xs body-2xs-sb w-47 sm:w-56"
      >
        리베이션 탄소량
      </Typography>
      <div className="flex flex-1 flex-col divide-y divide-bg-200">
        {tableData.map((data, idx) => (
          <div
            key={`${data}`}
            className="flex gap-4 divide-x divide-bg-200 py-12 pl-12 sm:py-14"
          >
            <Typography color="text-font" className="body-xs">
              {TABLE_LABEL[idx]}
            </Typography>
            <div className="flex flex-1 flex-col items-center">
              <div className="flex flex-1 justify-center gap-1">
                <Typography
                  color="text-primary-500"
                  className="sm:table-md body-2xs-sb"
                >
                  {formatNumber(data)}
                </Typography>
                <Typography
                  color="text-primary-500"
                  className="sm:en-body-2sm en-body-2xs"
                >
                  {UNIT}
                </Typography>
              </div>
              {/* {idx % 2 ? (
                <Typography
                  className="sm:table-md body-2xs-sb"
                  color="text-red-500"
                >
                  -30,000(42%절감)
                </Typography>
              ) : (
                <Typography
                  className="sm:table-md body-2xs-sb"
                  color="text-blue-500"
                >
                  +30,000(13%증가)
                </Typography>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
