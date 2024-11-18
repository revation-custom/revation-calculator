import { Typography } from '../components/Typography.tsx';
import { IcInfo } from '../assets/icons/IcInfo.tsx';
import { BasicPlastic } from '../types/form.ts';
import Tooltip from '../components/Tooltip.tsx';
import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RadioButton from '../components/RadioButton.tsx';
import { twMerge } from 'tailwind-merge';
import IcABS from '../assets/icons/IcABS.svg';
import IcPP from '../assets/icons/IcPP.svg';
import IcPET from '../assets/icons/IcPET.svg';
import IcHDPE from '../assets/icons/IcHDPE.svg';
import IcPVC from '../assets/icons/IcPVC.svg';

interface ProductItemProps {
  state: boolean;
  onToggle: (label: BasicPlastic) => void;
  label: BasicPlastic;
}

export const ProductItem = ({ state, onToggle, label }: ProductItemProps) => {
  const [hoveringTooltip, setHoveringTooltip] = useState(false);
  const SVG_OBJECT: { [key: string]: string } = {
    ABS: IcABS,
    PP: IcPP,
    PET: IcPET,
    HDPE: IcHDPE,
    PVC: IcPVC,
  };

  const TOOLTIP_MESSAGE: { [key: string]: string } = {
    ABS: 'ABS (아크릴로니트릴 부타디엔스티렌)<br/><br/>내충격성과 가공성이 좋아 레고 블록, 가전제품 외장, 자동차 인테리어 부품처럼 내구성이 중요한 제품에 사용됩니다.',
    PP: 'PP (폴리프로필렌)<br/><br/>가볍고 내열성과 내충격성이 뛰어나 일상에서 다양하게 사용되며, 대표적으로 요거트 용기, 배터리 케이스, 자동차 부품 등에 사용됩니다.',
    PET: 'PET (폴리에틸렌 테레프탈레이트)<br/><br/>투명하고 재활용이 용이해 생수병, 탄산음료 병과 같은 음료 용기뿐 아니라 섬유 및 필름에도 사용됩니다.',
    HDPE: 'HDPE (고밀도 폴리에틸렌)<br/><br/>가강도와 내화학성이 높고 재활용이 용이해 우유병, 플라스틱 파이프, 다용도 장바구니 등 다양한 산업과 일상 제품에 사용됩니다.',
    PVC: 'PVC (폴리염화비닐)<br/><br/>내구성과 화학 저항성이 뛰어나며, 배관, 바닥재, 전선 피복, 카드 등 다양한 일상 제품과 건축 자재에 사용됩니다.',
  };

  return (
    <div className="flex w-full flex-col items-center gap-2 md:gap-3">
      <div
        className={twMerge(
          'relative flex h-192 w-280 cursor-pointer flex-col items-center gap-2 pt-[32px] bg-url xs:w-full sm:max-w-[575px] md:h-262 md:max-w-[296px] md:pt-[36px]',
          `bg-bg-200`,
        )}
        onClick={() => onToggle(label)}
      >
        <img
          className="h-[110px] w-[110px] md:mt-[16px] md:h-[148px] md:w-[148px]"
          src={SVG_OBJECT[label]}
          alt="img"
        />
        <Typography
          className="en-title-xs-b text-opacity-50"
          color="text-gray-900"
        >
          {label}
        </Typography>
        <div
          className="z-100 absolute left-4 top-4"
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
                  {TOOLTIP_MESSAGE[label].split('<br/>').map((text) => (
                    <Fragment key={text}>
                      {text}
                      <br />
                    </Fragment>
                  ))}
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
