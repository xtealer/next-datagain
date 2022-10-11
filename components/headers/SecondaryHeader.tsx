import { FC } from "react";

export interface SecondaryHeaderProps {
  title?: string;
  center?: boolean;
}

const SecondaryHeader: FC<SecondaryHeaderProps> = ({
  title,
  center = true,
}) => {
  return (
    <h1
      className={
        center
          ? "mb-4 text-black text-3xl font-bold text-center mx-auto"
          : "mb-4 text-black text-3xl font-bold"
      }
    >
      {title}
    </h1>
  );
};

export default SecondaryHeader;
