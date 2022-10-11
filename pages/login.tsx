import { useCallback, useState } from "react";
import { Button } from "@nextui-org/react";
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
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

interface LoginPageFormProps {
  email: string;
  password: string;
}

const LoginPage: NextPageWithLayout = () => {
  const { address, error, connectWallet } = useWeb3();

  const onConnectWallet = useCallback(() => {
    connectWallet("injected");
  }, [connectWallet]);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginPageFormProps>();
  const onSubmit = useCallback(
    async ({ email, password }: LoginPageFormProps) => {
      if (loading) {
        return;
      }

      if (password.length < 8) {
        toast.error("Invalid password format.");
        return;
      }

      setLoading(true);

      try {
        const firebaseAuth = (await import("../helpers/initFirebase"))
          .firebaseAuth;
        await signInWithEmailAndPassword(firebaseAuth, email, password);
        toast.success("Logged in succesfully!");
      } catch (err) {
        console.log("login:signInWithEmailAndPassword:err", err);
        toast.error("Something failed, verify your credentials and try again.");
      }

      setLoading(false);
    },
    [loading]
  );

  return (
    <BaseContainer>
      <CenterComponent mode="col">
        <div className="w-full min-h-min max-w-[500px] flex flex-col p-4">
          <ShadowCard>
            <BrandHeader />

            <div className="mt-6 p-3 pt-0">
              <PrimaryHeader title="Login" />
              <div className="flex flex-col">
                <button onClick={onConnectWallet}>Connect Wallet</button>

                <form
                  className="flex flex-col"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    clearable
                    label="Email"
                    placeholder="Email"
                    initialValue=""
                    type="email"
                    required
                    {...register("email")}
                  />

                  <Spacer y={0.5} />

                  <Input.Password
                    clearable
                    label="Password"
                    placeholder="Password"
                    initialValue=""
                    type="password"
                    visibleIcon={<UnLockIcon fill="currentColor" />}
                    hiddenIcon={<LockIcon fill="currentColor" />}
                    required
                    {...register("password")}
                  />

                  <Spacer y={2} />

                  <Button className="w-full bg-app-green" type="submit">
                    Submit
                  </Button>
                </form>
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
