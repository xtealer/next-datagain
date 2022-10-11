import { FC, ReactNode } from "react";

const CenterComponent: FC<{
  children: ReactNode | ReactNode[];
  mode?: "row" | "col";
}> = ({ children, mode = "row" }) => {
  return (
    <div
      className={
        mode === "row"
          ? "bg-white flex-1 flex flex-row h-full w-full justify-center items-center"
          : "bg-white flex-1 flex flex-col h-full w-full justify-center items-center"
      }
    >
      {children}
    </div>
  );
};

export default CenterComponent;
