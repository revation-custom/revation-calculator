import { IcCheckboxLg } from "../assets/icons/IcCheckboxLg.tsx";

interface Checkbox {
  state: boolean;
}

export const Checkbox = ({ state }: Checkbox) => {
  return (
    <div>
      {state ? (
        <div className="w-5 h-5 md:w-6 md:h-6">
          <IcCheckboxLg />
        </div>
      ) : (
        <div className="w-5 h-5 md:w-6 md:h-6 border border-primary-600" />
      )}
    </div>
  );
};
