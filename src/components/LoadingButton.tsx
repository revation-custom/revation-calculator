import { IcSpin } from "../assets/icons/IcSpin.tsx";

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
      className="select-none bg-primary-600 duration-300 flex justify-center items-center transition-2 group rounded-[34px] disabled:bg-primary-100 hover:bg-primary-500 md:w-[232px] md:h-[68px] w-[128px] h-[50px]"
      disabled={disabled}
      {...props}
    >
      {loading ? <IcSpin className="animate-spin" /> : children}
    </button>
  );
};
