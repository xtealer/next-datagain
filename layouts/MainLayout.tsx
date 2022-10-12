import { Navbar, Text } from "@nextui-org/react";

import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { Heart } from "react-iconly";
import useSessionUtils from "../hooks/useSessionUtils";
import useUserData from "../hooks/useUserData";

export interface MainLayoutProps {
  children?: ReactNode | ReactNode[];
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { doLogout, firebaseUser } = useSessionUtils();
  const user = useUserData(firebaseUser?.uid);

  return (
    <div className="h-full w-full flex flex-col">
      <Navbar isBordered variant="sticky">
        <Navbar.Toggle aria-label="toggle navigation" />
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
            <Text className="font-bold flex gap-4 justify-center items-center">
              <span className="text-app-green flex gap-1 justify-center items-center">
                <Heart filled />
                <span className="font-bold">{user?.points ?? 0}</span>
              </span>
              <span>
                {user?.firstName} {user?.lastName}
              </span>
            </Text>
          ) : (
            <Text className="font-bold">...</Text>
          )}
        </Navbar.Content>

        <Navbar.Collapse>
          <Link href="/dashboard" passHref>
            <a>
              <button className="w-full text-black border-black border-2 opacity-90 rounded font-bold text-lg p-2 h-[50px] mt-4">
                Dashboard
              </button>
            </a>
          </Link>

          <Link href="/sharing" passHref>
            <a>
              <button className="w-full text-black border-black border-2 opacity-90 rounded font-bold text-lg p-2 h-[50px] mt-4">
                Sharing Preferences
              </button>
            </a>
          </Link>

          <Link href="/profile" passHref className="h-full w-full">
            <a>
              <button className="w-full text-black border-black border-2 opacity-90 rounded font-bold text-lg p-2 h-[50px] mt-4">
                Profile
              </button>
            </a>
          </Link>

          <button
            className="w-full text-app-green border-app-green opacity-90 border-2 rounded font-bold text-lg p-2 h-[50px] mt-4"
            onClick={doLogout}
          >
            Logout
          </button>
        </Navbar.Collapse>
      </Navbar>
      <div className="flex-1 flex flex-col w-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
