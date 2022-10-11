import { FC } from "react";

export interface SecondaryHeaderProps {
  title?: string;
}

const SecondaryHeader: FC<SecondaryHeaderProps> = ({ title }) => {
  return <h1 className="mb-4 text-black text-3xl font-bold">{title}</h1>;
};

export default SecondaryHeader;
