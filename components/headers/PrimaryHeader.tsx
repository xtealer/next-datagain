import { FC } from "react";

export interface PrimaryHeaderProps {
  title?: string;
}

const PrimaryHeader: FC<PrimaryHeaderProps> = ({ title }) => {
  return <h1 className="mb-4 text-app-green text-3xl font-bold">{title}</h1>;
};

export default PrimaryHeader;
