import { ClassValue, clsx } from "clsx";
import { ReactNode } from "react";

const textVariant = {
  titleSmall: "text-md font-bold font-pretendard",
  buttonText: "md:text-lg font-semibold text-base font-pretendard",
  errorText: "text-sm font-pretendard",
  checkboxText: "font-geologica text-base font-medium leading-[22.4px]",
  treeText: "sm:text-lg font-semibold font-pretendard text-[16px]",
};

interface TypographyType {
  variant: string;
  color?: string;
  className?: ClassValue;
  children: ReactNode;
}

export const Typography = ({
  variant,
  color,
  children,
  className,
}: TypographyType) => {
  return (
    <div className={clsx(textVariant[variant], color || "", className || "")}>
      {children}
    </div>
  );
};
