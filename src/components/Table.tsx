import clsx from 'clsx';
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
      <div className="flex flex-1 flex-col divide-y divide-bg-200">
        {tableData.map((data, idx) => (
          <div
            key={`${data}`}
            className="flex gap-4 divide-x divide-bg-200 py-12 pl-12 sm:py-14"
          >
            <Typography color="text-font" className="body-2xs-sb sm:body-sm">
              {TABLE_LABEL[idx]}
            </Typography>
            <div
              className={clsx(
                'flex flex-1 flex-col items-center',
                idx > 0 && 'blur-[4px]',
              )}
            >
              <div className="flex flex-1 items-center justify-center gap-1">
                <Typography
                  color="text-primary-500"
                  className="body-2xs-sb sm:body-sm"
                >
                  {formatNumber(data)}
                </Typography>
                <Typography
                  color="text-primary-500"
                  className="en-body-2xs sm:en-body-2sm"
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
