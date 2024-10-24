import { Checkbox } from '../components/Checkbox.tsx';
import { Typography } from '../components/Typography.tsx';
import { IcInfo } from '../assets/icons/IcInfo.tsx';
import { BasicPlastic } from '../types/form.ts';

interface ProductItemProps {
  state: boolean;
  onToggle: (label: BasicPlastic) => void;
  label: BasicPlastic;
}

export const ProductItem = ({ state, onToggle, label }: ProductItemProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-2 md:gap-3">
      <div
        className="relative h-157 w-280 bg-gray-400 xs:w-full sm:max-w-[575px] md:h-262 md:max-w-[296px]"
        onClick={() => onToggle(label)}
      >
        <div className="absolute left-4 top-4">
          <IcInfo />
        </div>
      </div>
      <div
        className="flex select-none items-center gap-1.5 md:gap-2"
        onClick={() => onToggle(label)}
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
