import { ReactElement, useCallback, useState } from "react";
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
import Image from "next/image";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";

interface ProfilePageFormProps {
  email: string;
  password: string;
}

const ProfilePage: NextPageWithLayout = () => {
  const { connectWallet } = useWeb3();

  const onConnectWallet = useCallback(() => {
    connectWallet("injected");
  }, [connectWallet]);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfilePageFormProps>();
  const onSubmit = useCallback(
    async ({ email, password }: ProfilePageFormProps) => {
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
              <div className="flex flex-col mt-6">
                <Button
                  onClick={onConnectWallet}
                  className="w-full flex bg-black"
                  icon={
                    <Image
                      src="/images/metamask-icon.png"
                      width={26}
                      height={26}
                      alt="metamask-icon"
                    />
                  }
                >
                  <span className="font-bold flex-1">MetaMask</span>
                </Button>
                <Spacer y={0.5} />
                <Button
                  className="w-full bg-[#4285f4]"
                  icon={
                    <Image
                      src="/images/google-icon.png"
                      width={26}
                      height={26}
                      alt="google-icon"
                    />
                  }
                >
                  <span className="font-bold flex-1">Google</span>
                </Button>

                <Spacer y={0.5} />

                <p className="font-bold text-center w-full mt-6">Or</p>

                <form
                  className="flex flex-col mt-4"
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
                    Signin
                  </Button>

                  <Spacer y={0.5} />

                  <Button className="w-full" color="warning" bordered>
                    <Link href="/recovery" passHref>
                      <a className="h-full w-full">Help? Account Recovery</a>
                    </Link>
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

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
