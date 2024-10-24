import { ClassValue, clsx } from 'clsx';
import { ReactNode } from 'react';

const textVariant = {
  titleSmall: 'sm:text-17 text-16 font-bold',
  buttonText: 'md:text-20 font-semibold text-base',
  errorText: 'text-13',
  checkboxText: 'text-base font-medium',
  treeText: 'sm:text-20 font-semibold text-16',
  subTitle: 'sm:text-20 font-semibold text-16',
  title: 'text-32 sm:text-60 font-extrabold',
  unitTitle: 'md:text-22 md:font-medium font-bold text-17',
};

const geologicaVariants = ['checkboxText', 'subTitle'];

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
