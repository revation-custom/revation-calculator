import { clsx } from "clsx";
import { ReactNode } from "react";

const textVariant = {
  titleSmall: "text-md font-bold font-pretendard",
  buttonText: "md:text-lg font-semibold text-base font-pretendard",
  errorText: "text-sm font-pretendard",
  checkboxText: "font-geologica text-base font-medium leading-[22.4px]",
};

interface TypographyType {
  variant: string;
  color?: string;
  children: string | ReactNode;
}

export const Typography = ({ variant, color, children }: TypographyType) => {
  return (
    <div className={clsx(color ? color : "", textVariant[variant])}>
      {children}
    </div>
  );
};
