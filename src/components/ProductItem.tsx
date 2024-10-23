import { Checkbox } from './Checkbox.tsx';
import { Typography } from './Typography.tsx';
import { IcInfo } from '../assets/icons/IcInfo.tsx';

interface ProductItemProps {
  state: boolean;
  onToggle: (state: boolean) => void;
  label: string;
}

export const ProductItem = ({ state, onToggle, label }: ProductItemProps) => {
  return (
    <div className="flex w-full flex-col gap-2 md:gap-3">
      <div
        className="relative h-157 w-280 bg-gray-400 xs:w-full sm:max-w-[575px] md:max-w-[296px]"
        onClick={() => onToggle(state)}
      >
        <div className="absolute left-4 top-4">
          <IcInfo />
        </div>
      </div>
      <div
        className="flex select-none items-center gap-1.5 md:gap-2"
        onClick={() => onToggle(state)}
      >
        <Checkbox state={state} />
        <Typography
          variant="checkboxText"
          color="text-primary-600"
          className="leading-[22.4px]"
        >
          {label}
        </Typography>
      </div>
    </div>
  );
};
