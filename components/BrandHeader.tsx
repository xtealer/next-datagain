import Image from "next/image";
import { FC } from "react";

const BrandHeader: FC = () => {
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

      <p className="text-black text-center">
        don't waste your data... start earning now with it!
      </p>
    </div>
  );
};

export default BrandHeader;
