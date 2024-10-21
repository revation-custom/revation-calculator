import { IcCheckboxLg } from "../assets/icons/IcCheckboxLg.tsx";

interface Checkbox {
  state: boolean;
  onToggle: (state: boolean) => void;
}

export const Checkbox = ({ state, onToggle }: Checkbox) => {
  return (
    <div>
      {state ? (
        <div className="w-5 h-5 md:w-6 md:h-6" onClick={() => onToggle(state)}>
          <IcCheckboxLg />
        </div>
      ) : (
        <div
          className="w-5 h-5 md:w-6 md:h-6 border border-primary-600"
          onClick={() => onToggle(state)}
        />
      )}
    </div>
  );
};
