interface PopupProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  isBackdrop?: boolean;
  className?: string;
}

interface Props {
  children: ReactNode;
}

interface KeyProps extends Props {
  key: string;
}
