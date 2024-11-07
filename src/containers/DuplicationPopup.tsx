import { LoadingButton } from '../components/LoadingButton';
import { Popup } from '../components/Popup';
import PopupLayout from '../components/Popup/PopupLayout';
import { Typography } from '../components/Typography';

interface DuplicationPopupProps {
  open: boolean;
  onClose: () => void;
}

const DuplicationPopup = ({ open, onClose }: DuplicationPopupProps) => {
  return (
    <Popup
      open={open}
      onClose={onClose}
      isBackdrop={false}
      className="shadow-duplicationBox"
    >
      <PopupLayout key="duplication-popup">
        <Popup.Contents>
          <div className="mt-[10px] flex w-[calc(100vw-64px)] min-w-[256px] max-w-[412px] flex-col gap-6 px-24 pb-32 sm:w-[443px] sm:max-w-[443px]">
            <div className="flex flex-col gap-8">
              <Popup.Title>중복 계산 안내</Popup.Title>
              <Typography
                color="text-gray-700"
                className="text-center body-2xs sm:title-xs"
              >
                같은 소재로는 다시 계산할 수 없습니다.
                <br />
                새로운 값을 입력해 주세요.
              </Typography>
            </div>
            <Popup.Footer>
              <LoadingButton
                loading={false}
                type="submit"
                variant="sm"
                onClick={onClose}
              >
                <Typography className="button-but2" color="text-white">
                  확인
                </Typography>
              </LoadingButton>
            </Popup.Footer>
          </div>
        </Popup.Contents>
      </PopupLayout>
    </Popup>
  );
};

export default DuplicationPopup;
