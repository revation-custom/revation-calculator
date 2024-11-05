import clsx from 'clsx';
import { IcSpin } from '../assets/icons/IcSpin.tsx';

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  variant: keyof typeof buttonStyle;
}

const buttonStyle = {
  lg: 'h-[50px] w-[128px] sm:h-[68px] sm:w-[232px]',
  sm: 'h-[46px] w-[76px]',
};

export const LoadingButton = ({
  children,
  loading,
  disabled = false,
  variant,
  ...props
}: CustomButtonProps) => {
  return (
    <button
      className={clsx(
        buttonStyle[variant],
        'transition-2 group flex select-none items-center justify-center rounded-[34px] bg-primary-600 duration-300 hover:bg-primary-500 disabled:bg-primary-100',
      )}
      disabled={disabled}
      {...props}
    >
      {loading ? <IcSpin className="animate-spin" /> : children}
    </button>
  );
};
