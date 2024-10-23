import { IcLogo } from '../assets/icons/IcLogo.tsx';

export const Header = () => {
  return (
    <div className="fixed z-10 flex h-[72px] w-full justify-start border-b border-primary-500 bg-primary-600 px-5 py-[22px]">
      <div
        className="cursor-pointer"
        onClick={() => (window.location.href = 'https://revation.co.kr')}
      >
        <IcLogo />
      </div>
    </div>
  );
};
