import { useCallback } from "react";
import { NextPageWithLayout } from "../types/Layout";
import { useWeb3 } from "@3rdweb/hooks";
import BaseContainer from "../components/BaseContainer";
import ShadowCard from "../components/ShadowCard";
import CenterComponent from "../components/CenterComponent";
import PrimaryHeader from "../components/headers/PrimaryHeader";
import BrandHeader from "../components/BrandHeader";
import { Input, Spacer } from "@nextui-org/react";
import UnLockIcon from "../components/icons/UnLockIcon";
import LockIcon from "../components/icons/LockIcon";

const LoginPage: NextPageWithLayout = () => {
  const { address, error, connectWallet } = useWeb3();

  const onConnectWallet = useCallback(() => {
    connectWallet("injected");
  }, [connectWallet]);

  return (
    <BaseContainer>
      <CenterComponent mode="col">
        <div className="w-full min-h-min max-w-[500px] flex flex-col p-4">
          <ShadowCard>
            <BrandHeader />

            <div className="mt-6">
              <PrimaryHeader title="Login" />
              <div className="flex flex-col">
                <button onClick={onConnectWallet}>Connect Wallet</button>

                <Input
                  clearable
                  label="Email"
                  placeholder="Email"
                  initialValue=""
                  type="email"
                />

                <Spacer y={1} />

                <Input.Password
                  clearable
                  label="Password"
                  placeholder="Password"
                  initialValue=""
                  type="password"
                  visibleIcon={<UnLockIcon fill="currentColor" />}
                  hiddenIcon={<LockIcon fill="currentColor" />}
                />
              </div>
            </div>
          </ShadowCard>
        </div>
      </CenterComponent>
    </BaseContainer>
  );
};

export default LoginPage;

// LoginPage.getLayout = function getLayout(page: ReactElement) {
//   return <MainLayout>{page}</MainLayout>;
// };
