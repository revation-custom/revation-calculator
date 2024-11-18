import { Fragment } from 'react/jsx-runtime';
import { Popup } from '../components/Popup';
import PopupLayout from '../components/Popup/PopupLayout';
import { Typography } from '../components/Typography';
import { firstWordSplit } from '../utils/firstWordSplit';
import reduce from '../assets/images/reduce.png';
import biodegrade from '../assets/images/biodegrade.png';
import sgs from '../assets/images/sgs.png';
import recycle from '../assets/images/recycle.png';
import fsc from '../assets/images/fsc.png';
import okBiobased from '../assets/images/ok-biobased.png';
import pefc from '../assets/images/pefc.png';
import iscc from '../assets/images/iscc.png';
import reach from '../assets/images/reach.png';
import eu from '../assets/images/eu.png';
import { twMerge } from 'tailwind-merge';

interface RevationInfoPopupProps {
  label: string;
  open: boolean;
  onClose: () => void;
}

interface DetailProps {
  contents: string[];
  percent: string;
  example: string;
  certify?: string[];
  use?: string[];
}

interface Props {
  [key: string]: DetailProps;
}

export const REVATION_INFO_DATA: Props = {
  LIMESTONE: {
    contents: [
      '석회 기반의 성분으로 플라스틱 사용량 절감',
      '매끈한 표면과 높은 밀도가 특징',
      '고급스러운 연출 가능',
    ],
    percent: '최대 78%',
    example: '화장품 용기, 전자 제품, 일반 제품 등',
    certify: [sgs],
    use: [reduce, biodegrade],
  },
  WOOD: {
    contents: [
      '목재 섬유를 활용해 플라스틱 사용량 절감',
      '제품 경량화 및 탄소 저감 효과',
      '목재 특유의 질감 구현',
    ],
    percent: '20~40%',
    example: '식품용기, 화장품 용기, 일반 제품 등',
    certify: [fsc, okBiobased, pefc, iscc, reach, eu],
    use: [reduce, recycle],
  },
  PLA: {
    contents: [
      '식물성 자원을 기반으로 탄소배출량이 적음',
      '폐기 단계에서 100% 생분해 가능',
      '디자인적 자유도가 높음',
    ],
    percent: '100%',
    example: '식품용기, 의류 및 액세서리, 3D 프린팅 등',
    use: [reduce, biodegrade],
  },
};

const RevationInfoPopup = ({
  label,
  open,
  onClose,
}: RevationInfoPopupProps) => {
  const firstWord = firstWordSplit(label);
  const { contents, percent, example, use, certify } =
    REVATION_INFO_DATA[firstWord];

  return (
    <Popup
      open={open}
      onClose={onClose}
      isBackdrop={true}
      className="shadow-duplicationBox"
    >
      <PopupLayout key="revation-info-popup">
        <Popup.Contents>
          <div className="mt-[10px] flex h-full max-h-[calc(727px-146px)] w-[calc(100vw-64px)] min-w-[280px] flex-col gap-6 px-24 pb-32 sm:w-[665px] sm:max-w-[665px]">
            <div className="flex flex-col gap-6">
              <Popup.Title>{label}</Popup.Title>
              <div className="h-full max-h-[calc(727px-228px)] overflow-y-auto sm:max-h-[calc(727px-248px)]">
                <div className="flex flex-col gap-5 overflow-y-auto sm:gap-4">
                  <div
                    className={twMerge(
                      'sm:min:w-[605px] h-[222px] w-full bg-url sm:h-[284px]',
                      `product-img-${firstWord}`,
                    )}
                  />
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <Typography className="body-xs-b" color="text-font">
                      소재 및 디자인 특징
                    </Typography>
                    <Typography className="body-2xs" color="text-font">
                      {contents.map((content, idx) => (
                        <Fragment key={`${idx}-${content}`}>
                          {content}
                          {idx < contents.length - 1 && <br />}
                        </Fragment>
                      ))}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <Typography className="body-xs-b" color="text-font">
                      플라스틱 저감률(바이오 메스 함량)
                    </Typography>
                    <Typography className="body-2xs" color="text-font">
                      {percent}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <Typography className="body-xs-b" color="text-font">
                      사용가능 제품군
                    </Typography>
                    <Typography className="body-2xs" color="text-font">
                      {example}
                    </Typography>
                  </div>
                  {certify && (
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <Typography className="body-xs-b" color="text-font">
                        제품 인증
                      </Typography>
                      <div className="flex flex-wrap gap-1.5">
                        {certify.map((src) => (
                          <img
                            key={src}
                            src={src}
                            alt={src}
                            className="h-[36px] w-[36px] sm:h-[48px] sm:w-[48px]"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {use && (
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <Typography className="body-xs-b" color="text-font">
                        사용목적
                      </Typography>
                      <div className="flex gap-1.5">
                        {use.map((src) => (
                          <img
                            key={src}
                            src={src}
                            alt={src}
                            className="h-[36px] w-[36px] sm:h-[48px] sm:w-[48px]"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Popup.Contents>
      </PopupLayout>
    </Popup>
  );
};

export default RevationInfoPopup;
