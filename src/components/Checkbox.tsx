import { IcCheckboxLg } from "../assets/icons/IcCheckboxLg.tsx";

interface Checkbox {
  state: boolean;
  onToggle: (state: boolean) => void;
}

export const Checkbox = ({ state, onToggle }: Checkbox) => {
  return (
    <div>
      {state ? (
        <div className="w-[24px] h-[24px]" onClick={() => onToggle(state)}>
          <IcCheckboxLg />
        </div>
      ) : (
        <div
          className="w-[24px] h-[24px] border border-primary-600"
          onClick={() => onToggle(state)}
        />
      )}
    </div>
  );
};
