import IcLogoLight from '../../assets/icons/IcLogoLight';
import { Typography } from '../../components/Typography';
import PdfLayout from './PdfLayout';

const FirstPage = () => {
  return (
    <PdfLayout bgColor="bg-primary-500">
      <div className="flex flex-col gap-4 pb-[611px] pl-[20px] pr-[322px] pt-[169px]">
        <IcLogoLight />
        <Typography
          color="text-white"
          className="font-pretendard text-[12px] font-medium leading-[16.8px] tracking-[-0.3px]"
        >
          친환경 제품 도입을 위한 소재별 탄소 배출 시나리오 분석
        </Typography>
      </div>
    </PdfLayout>
  );
};

export default FirstPage;
