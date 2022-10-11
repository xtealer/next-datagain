import { FC } from "react";

export interface PrimaryHeaderProps {
  title?: string;
  center?: boolean;
}

const PrimaryHeader: FC<PrimaryHeaderProps> = ({ title, center = true }) => {
  return (
    <h1
      className={
        center
          ? "mb-4 text-app-green text-3xl font-bold text-center mx-auto"
          : "mb-4 text-app-green text-3xl font-bold"
      }
    >
      {title}
    </h1>
  );
};

export default PrimaryHeader;
