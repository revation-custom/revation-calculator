import { IcCheckboxLg } from '../assets/icons/IcCheckboxLg.tsx';

interface Checkbox {
  state: boolean;
}

export const Checkbox = ({ state }: Checkbox) => {
  return (
    <div>
      {state ? (
        <div className="h-20 w-20 md:h-24 md:w-24">
          <IcCheckboxLg />
        </div>
      ) : (
        <div className="h-20 w-20 border border-primary-600 md:h-24 md:w-24" />
      )}
    </div>
  );
};
