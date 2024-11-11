import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof buttonStyle;
}

const buttonStyle = {
  md: 'w-[85px] sm:h-[30px] h-[26px]',
};

export const Button = ({
  children,
  disabled = false,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        buttonStyle[variant],
        'en-body-xs-lg rounded-[15px] bg-bg-50 text-gray-900 duration-300 hover:bg-white active:bg-bg-100',
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
