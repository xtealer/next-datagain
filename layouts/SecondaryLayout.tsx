import { Navbar, Text } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, ReactNode, useCallback } from "react";
import useGlobalStore from "../store/useGlobalStore";
import { ArrowLeft } from "react-iconly";

export interface SecondaryLayoutProps {
  children?: ReactNode | ReactNode[];
}

const SecondaryLayout: FC<SecondaryLayoutProps> = ({ children }) => {
  const { user }: any = useGlobalStore((state: any) => ({ user: state.user }));
  const router = useRouter();

  const onGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="h-full w-full flex flex-col">
      <Navbar isBordered variant="sticky">
        <button onClick={onGoBack}>
          <ArrowLeft />
        </button>

        <Navbar.Brand>
          <Image
            src="/icons/datagain-logo-horizontal.png"
            width={128}
            height={35}
            alt="horizontal-datagain-logo"
          />
        </Navbar.Brand>
        <Navbar.Content>
          {user ? (
            <Text className="font-bold">
              {user?.firstName} {user?.lastName}
            </Text>
          ) : (
            <Text className="font-bold">...</Text>
          )}
        </Navbar.Content>
      </Navbar>
      <div className="flex-1 flex flex-col w-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default SecondaryLayout;
