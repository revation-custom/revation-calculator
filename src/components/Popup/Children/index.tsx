import { Typography } from '../../Typography';

export const PopupContents = ({ children }: Props) => {
  return <>{children}</>;
};

export const PopupFooter = ({ children }: Props) => {
  return <div className="self-end">{children}</div>;
};

export const PopupTitle = ({ children }: Props) => {
  return (
    <Typography
      color="text-gray-900"
      className="border-b border-b-gray-900 pb-12 pl-8 title-sm sm:pb-15 sm:pl-10 sm:heading-xs"
    >
      {children}
    </Typography>
  );
};
