import { IcFooterTitle } from "../assets/icons/IcFooterTitle.tsx";
import { Typography } from "./Typography.tsx";

export const Footer = () => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center px-5 py-[22px] bg-bg-100 border-t border-bg-200 min-w-[280px]">
      <Typography variant="errorText" color="text-bg-300">
        @2023 REVATION. all rights reserved.
      </Typography>
      <IcFooterTitle />
    </div>
  );
};
