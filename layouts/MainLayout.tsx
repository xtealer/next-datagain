import { Button, Navbar, Text, Link as NextUILink } from "@nextui-org/react";

import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
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
            <Text>
              {user?.firstName} {user?.lastName}
            </Text>
          ) : (
            <Text>...</Text>
          )}
        </Navbar.Content>

        <Navbar.Collapse>
          {/* <NextUILink>
            <Link color="inherit" href="">
              Logout
            </Link>
          </NextUILink> */}
          <NextUILink onClick={doLogout}>Logout</NextUILink>
        </Navbar.Collapse>
      </Navbar>
      <div className="flex-1 flex flex-col w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
