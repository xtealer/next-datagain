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

import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import Link from "next/link";

interface RecoveryPageFormProps {
  email: string;
  password: string;
}

const RecoveryPage: NextPageWithLayout = () => {
  const { address, error, connectWallet } = useWeb3();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RecoveryPageFormProps>();
  const onSubmit = useCallback(
    async ({ email, password }: RecoveryPageFormProps) => {
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
        await sendPasswordResetEmail(firebaseAuth, email);
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
            <BrandHeader title="Help to recover your account, if it exists we will sent instructions to get back into it." />

            <div className="mt-6 p-3 pt-0">
              <PrimaryHeader title="Account Recovery" />
              <div className="flex flex-col mt-3">
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

                  <Spacer y={2} />

                  <Button className="w-full bg-app-green" type="submit">
                    Submit
                  </Button>

                  <Spacer y={0.5} />

                  <Link href="/login" passHref>
                    <a>
                      <Button className="w-full" color="warning" bordered>
                        Go Back
                      </Button>
                    </a>
                  </Link>
                </form>
              </div>
            </div>
          </ShadowCard>
        </div>
      </CenterComponent>
    </BaseContainer>
  );
};

export default RecoveryPage;

// RecoveryPage.getLayout = function getLayout(page: ReactElement) {
//   return <MainLayout>{page}</MainLayout>;
// };
