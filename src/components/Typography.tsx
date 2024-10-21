import { clsx } from "clsx";
import { ReactNode } from "react";

const textVariant = {
  titleSmall: "text-md font-bold",
  buttonText: "md:text-lg font-semibold text-base",
  errorText: "text-sm",
};

interface TypographyType {
  variant: string;
  color?: string;
  children: string | ReactNode;
}

export const Typography = ({ variant, color, children }: TypographyType) => {
  return (
    <div
      className={clsx(
        "font-pretendard",
        color ? color : "",
        textVariant[variant],
      )}
    >
      {children}
    </div>
  );
};
