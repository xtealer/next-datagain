import { FC, ReactNode } from "react";

const ShadowCard: FC<{ children: ReactNode | ReactNode[] }> = ({
  children,
}) => {
  return (
    <div className="bg-white flex-1 flex flex-col max-w-[90%] h-[250px] min-w-[250px] rounded-2xl shadow-lg p-4 border-2 border-solid border-app-black">
      {children}
    </div>
  );
};

export default ShadowCard;
