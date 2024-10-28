import { IcSpin } from '../assets/icons/IcSpin.tsx';

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export const LoadingButton = ({
  children,
  loading,
  disabled = false,
  ...props
}: CustomButtonProps) => {
  return (
    <button
      className="transition-2 group flex h-[50px] w-[128px] select-none items-center justify-center rounded-[34px] bg-primary-600 duration-300 hover:bg-primary-500 disabled:bg-primary-100 sm:h-[68px] sm:w-[232px]"
      disabled={disabled}
      {...props}
    >
      {loading ? <IcSpin className="animate-spin" /> : children}
    </button>
  );
};
