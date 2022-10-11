import { FC, ReactNode } from "react";

export interface MainLayoutProps {
  children?: ReactNode | ReactNode[];
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 flex flex-col w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
