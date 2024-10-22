import { Checkbox } from "./Checkbox.tsx";
import { Typography } from "./Typography.tsx";
import { IcInfo } from "../assets/icons/IcInfo.tsx";

interface ProductItemProps {
  state: boolean;
  onToggle: (state: boolean) => void;
  label: string;
}

export const ProductItem = ({ state, onToggle, label }: ProductItemProps) => {
  return (
    <div className="flex w-full flex-col gap-2 md:gap-3">
      <div
        className="bg-gray-400 relative h-[157px] md:max-w-[296px] sm:max-w-[575px] xs:w-full w-[280px]"
        onClick={() => onToggle(state)}
      >
        <div className="absolute top-4 left-4">
          <IcInfo />
        </div>
      </div>
      <div
        className="flex md:gap-2 gap-1.5 items-center select-none"
        onClick={() => onToggle(state)}
      >
        <Checkbox state={state} />
        <Typography variant="checkboxText" color="text-primary-600">
          {label}
        </Typography>
      </div>
    </div>
  );
};
