import { createContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IcWarning } from '../../assets/icons/IcWarning';
import clsx from 'clsx';
import { PopupContents, PopupFooter } from './Children';

const PopupContext = createContext<{ onClose: () => void } | null>(null);

export const Popup = ({
  children,
  open,
  onClose,
  isBackdrop = true,
  className = '',
}: PopupProps) => {
  const [portalEl, setPortalEl] = useState<Element | null>(null);
  const body = document.body;

  useEffect(() => {
    if (open) {
      setPortalEl(document.getElementById('portal'));
      if (!isBackdrop) return;
      document.body.style.overflowY = 'hidden';
    }
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [open]);

  const handleCloseModal = () => {
    setPortalEl(null);
    document.body.style.overflowY = 'auto';
    onClose();
  };

  return (
    open &&
    portalEl &&
    createPortal(
      <>
        <PopupContext.Provider value={{ onClose }}>
          <div
            className={clsx(
              isBackdrop ? 'bg-black' : 'bg-transparent',
              'fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-50',
            )}
            onClick={handleCloseModal}
          />

          <div
            className={clsx(
              className,
              'fixed left-1/2 top-1/2 z-30 max-h-[calc(100%-28px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white',
            )}
          >
            <div
              className="flex cursor-pointer justify-end px-16 pt-16 sm:px-24 sm:pt-24"
              onClick={onClose}
            >
              <IcWarning />
            </div>
            {children}
          </div>
        </PopupContext.Provider>
      </>,
      body,
    )
  );
};

Popup.Contents = PopupContents;
Popup.Footer = PopupFooter;
