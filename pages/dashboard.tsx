import { ReactElement, useCallback, useState } from "react";
import { Button } from "@nextui-org/react";
import { NextPageWithLayout } from "../types/Layout";
import BaseContainer from "../components/BaseContainer";
import CenterComponent from "../components/CenterComponent";
import PrimaryHeader from "../components/headers/PrimaryHeader";
import { Input, Spacer } from "@nextui-org/react";

import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";

interface RecoveryPageFormProps {
  email: string;
  password: string;
}

const RecoveryPage: NextPageWithLayout = () => {
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
          <div className="mt-6 p-3 pt-0">
            <div className="flex flex-col mt-3">
              <Link href="/surveys" passHref>
                <a>
                  <button className="w-full text-black border-black border-2 opacity-90 rounded font-bold text-lg p-2 h-[50px] mt-4">
                    Surveys
                  </button>
                </a>
              </Link>

              <Link href="/earnings" passHref>
                <a>
                  <button className="w-full text-black border-black border-2 opacity-90 rounded font-bold text-lg p-2 h-[50px] mt-4">
                    Points Earned
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
            </div>
          </div>
        </div>
      </CenterComponent>
    </BaseContainer>
  );
};

export default RecoveryPage;

RecoveryPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
