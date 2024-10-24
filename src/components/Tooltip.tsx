import { ReactNode } from 'react';

const Tooltip = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-tooltip absolute left-4 top-[43px] z-10 w-194 rounded-sm p-12">
      {children}
    </div>
  );
};

export default Tooltip;
