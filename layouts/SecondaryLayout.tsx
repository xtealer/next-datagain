import { useRouter } from "next/router";
import { FC, ReactNode, useCallback } from "react";

export interface SecondaryLayoutProps {
  children?: ReactNode | ReactNode[];
}

const SecondaryLayout: FC<SecondaryLayoutProps> = ({ children }) => {
  const router = useRouter();

  const onGoBack = useCallback(() => {
    router.back();
  }, [router.back]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 flex flex-col w-full">{children}</div>
    </div>
  );
};

export default SecondaryLayout;
