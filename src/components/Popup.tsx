import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PopupProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export const Popup = ({ children, open, onClose }: PopupProps) => {
  const [portalEl, setPortalEl] = useState<Element | null>(null);
  const body = document.body;

  useEffect(() => {
    if (open) {
      setPortalEl(document.getElementById('portal'));
      document.body.style.overflowY = 'hidden';
    }
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [open]);

  const handleCloseModal = () => {
    setPortalEl(null);
    document.body.style.overflowY = 'auto';
    return onClose();
  };
  return (
    open &&
    portalEl &&
    createPortal(
      <>
        <div
          className="fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-50"
          onClick={handleCloseModal}
        />
        <div className="fixed left-1/2 top-1/2 z-30 max-h-[calc(100%-28px)] w-[calc(100%-64px)] min-w-[256px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto sm:w-auto">
          {children}
        </div>
      </>,
      body,
    )
  );
};
