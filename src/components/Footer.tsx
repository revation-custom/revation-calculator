import { IcFooterTitle } from '../assets/icons/IcFooterTitle.tsx';
import { Typography } from './Typography.tsx';

export const Footer = () => {
  return (
    <div className="flex w-full min-w-[280px] flex-col items-center justify-center gap-2 border-t border-bg-200 bg-bg-100 px-5 py-[22px]">
      <Typography color="text-bg-300" className="tooltip">
        @2023 REVATION. all rights reserved.
      </Typography>
      <IcFooterTitle />
    </div>
  );
};
