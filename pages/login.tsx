import { ReactElement, useCallback } from "react";
import MainLayout from "../layouts/MainLayout";
import { NextPageWithLayout } from "../types/Layout";
import { useWeb3 } from "@3rdweb/hooks";

const LoginPage: NextPageWithLayout = () => {
  const { address, error, connectWallet } = useWeb3();
  console.log(error);
  const onConnectWallet = useCallback(() => {
    connectWallet("injected");
  }, [connectWallet]);

  return (
    <div>
      <h1>Login</h1>
      <p>{address ?? "Must do login!"}</p>
      <button onClick={onConnectWallet}>Connect Wallet</button>
    </div>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
