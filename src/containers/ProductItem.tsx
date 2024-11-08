import { Typography } from '../components/Typography.tsx';
import { IcInfo } from '../assets/icons/IcInfo.tsx';
import { BasicPlastic } from '../types/form.ts';
import Tooltip from '../components/Tooltip.tsx';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RadioButton from '../components/RadioButton.tsx';
import { twMerge } from 'tailwind-merge';

interface ProductItemProps {
  state: boolean;
  onToggle: (label: BasicPlastic) => void;
  label: BasicPlastic;
}

export const ProductItem = ({ state, onToggle, label }: ProductItemProps) => {
  const [hoveringTooltip, setHoveringTooltip] = useState(false);
  return (
    <div className="flex w-full flex-col items-center gap-2 md:gap-3">
      <div
        className={twMerge(
          'bg-url relative h-157 w-280 cursor-pointer xs:w-full sm:max-w-[575px] md:h-262 md:max-w-[296px]',
          `product-item-box-${label}`,
        )}
        onClick={() => onToggle(label)}
      >
        <div
          className="absolute left-4 top-4"
          onMouseEnter={() => setHoveringTooltip(true)}
          onMouseLeave={() => setHoveringTooltip(false)}
        >
          <IcInfo />
        </div>

        <AnimatePresence>
          {hoveringTooltip && (
            <motion.div
              key={`${label}-tooltip`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { opacity: 1, transition: { duration: 0.3 } },
                hidden: { opacity: 0, transition: { duration: 0.3 } },
              }}
            >
              <Tooltip>
                <Typography className="tooltip" color="text-gray-50">
                  북유럽 침엽수 기반 복합소재 DURASENSE는 경량화 효과를
                  제공하며, 탄소 저감 효과를 인정받은 친환경 플라스틱
                  소재입니다.
                </Typography>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        className="flex cursor-pointer select-none items-center gap-1.5 md:gap-2"
        onClick={() => onToggle(label)}
      >
        <RadioButton state={state} />
      </div>
    </div>
  );
};
