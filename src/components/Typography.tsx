import { ClassValue, clsx } from 'clsx';
import { ReactNode } from 'react';

interface TypographyType {
  color?: string;
  className?: ClassValue;
  children: ReactNode;
}

export const Typography = ({ color, children, className }: TypographyType) => {
  return <div className={clsx(color || '', className || '')}>{children}</div>;
};
