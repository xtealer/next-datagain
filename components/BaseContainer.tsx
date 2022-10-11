import { FC, ReactNode } from "react";

const BaseContainer: FC<{ children: ReactNode | ReactNode[] }> = ({
  children,
}) => {
  return (
    <div className="bg-light-gray h-full w-full flex-1 flex flex-col p-4">
      {children}
    </div>
  );
};

export default BaseContainer;
