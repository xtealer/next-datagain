import Image from "next/image";
import { FC } from "react";

interface BrandHeaderProps {
  title?: string;
}

const BrandHeader: FC<BrandHeaderProps> = ({
  title = "don't waste your data... start earning now with it!",
}) => {
  return (
    <div>
      <div className="max-w-[200px] mx-auto">
        <Image
          src="/icons/datagain-logo-horizontal.png"
          width={512}
          height={140}
          alt="horizontal-datagain-logo"
        />
      </div>

      <p className="text-black text-center">{title}</p>
    </div>
  );
};

export default BrandHeader;
