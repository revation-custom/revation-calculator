import { ReactNode } from 'react';

const Tooltip = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute left-4 top-[43px] z-10 w-194 rounded-sm bg-tooltip p-12 leading-[18.2px] tracking-[-0.26px]">
      {children}
    </div>
  );
};

export default Tooltip;
