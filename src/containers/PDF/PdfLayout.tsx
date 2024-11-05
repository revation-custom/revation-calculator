import clsx from 'clsx';
import { ReactNode } from 'react';

interface PdfLayoutProps {
  children: ReactNode;
  bgColor?: string;
}

const PdfLayout = ({ children, bgColor = 'bg-white' }: PdfLayoutProps) => {
  return <div className={clsx('h-[842px] w-[595px]', bgColor)}>{children}</div>;
};

export default PdfLayout;
