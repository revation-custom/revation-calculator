import { IcTree } from '../assets/icons/IcTree.tsx';
import { Typography } from './Typography.tsx';

export const EmptyResult = () => {
  return (
    <div className="flex w-[298px] flex-col items-center gap-16">
      <IcTree />
      <Typography
        variant="treeText"
        color="text-bg-400"
        className="text-center"
      >
        소재를 선택하여
        <br />
        탄소배출량을 계산해보세요.
      </Typography>
    </div>
  );
};
