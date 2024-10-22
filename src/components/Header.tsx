import { IcLogo } from "../assets/icons/IcLogo.tsx";

export const Header = () => {
  return (
    <div className="px-5 py-[22px] h-[72px] flex justify-start bg-primary-600 border-b border-primary-500 w-full fixed z-10">
      <div
        className="cursor-pointer"
        onClick={() => (window.location.href = "https://revation.co.kr")}
      >
        <IcLogo />
      </div>
    </div>
  );
};
