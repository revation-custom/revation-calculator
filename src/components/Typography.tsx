import { ClassValue, clsx } from 'clsx';
import { ReactNode } from 'react';

const textVariant = {
  titleSmall: 'sm:text-17 text-16 font-bold',
  buttonText: 'md:text-20 font-semibold text-base',
  errorText: 'text-13',
  checkboxText: 'text-base font-medium',
  treeText: 'sm:text-20 font-semibold text-16',
};

const geologicaVariants = ['checkboxText'];

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
    <div
      className={clsx(
        geologicaVariants[variant] ? 'font-geologica' : 'font-pretendard',
        textVariant[variant],
        color || '',
        className || '',
      )}
    >
      {children}
    </div>
  );
};
