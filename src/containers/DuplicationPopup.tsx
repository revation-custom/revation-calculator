import { LoadingButton } from '../components/LoadingButton';
import { Typography } from '../components/Typography';

interface DuplicationPopupProps {
  onClose: () => void;
}

const DuplicationPopup = ({ onClose }: DuplicationPopupProps) => {
  return (
    <div className="mt-[10px] flex w-[calc(100vw-64px)] min-w-[256px] max-w-[412px] flex-col gap-6 px-24 pb-32 sm:w-[443px] sm:max-w-[443px]">
      <div className="flex flex-col gap-8">
        <Typography
          color="text-gray-900"
          className="border-b border-b-gray-900 pb-12 pl-8 title-sm sm:pb-15 sm:pl-10 sm:heading-xs"
        >
          중복 계산 안내
        </Typography>
        <Typography
          color="text-gray-700"
          className="text-center body-2xs sm:title-xs"
        >
          같은 소재로는 다시 계산할 수 없습니다.
          <br />
          새로운 값을 입력해 주세요.
        </Typography>
      </div>
      <div className="self-end">
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
      </div>
    </div>
  );
};

export default DuplicationPopup;
