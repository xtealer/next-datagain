import { ReactElement, useCallback, useState } from "react";
import { Button } from "@nextui-org/react";
import { NextPageWithLayout } from "../types/Layout";
import BaseContainer from "../components/BaseContainer";
import ShadowCard from "../components/ShadowCard";
import CenterComponent from "../components/CenterComponent";
import PrimaryHeader from "../components/headers/PrimaryHeader";
import { Input, Spacer } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { collection, doc, setDoc } from "firebase/firestore";
import { Collections } from "../types/Collections";
import { Reward, RewardAction } from "../types/Reward";

import SecondaryLayout from "../layouts/SecondaryLayout";
import Router from "next/router";
import useFirebaseUser from "../hooks/useFirebaseUser";

interface ProfilePageFormProps {
  firstName: string;
  lastName: string;
  username: string;
  metamaskId: string;
  password: string;
  points: number;
}

const SignupPage: NextPageWithLayout = () => {
  const firebaseUser = useFirebaseUser();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfilePageFormProps>();
  const onSubmit = useCallback(
    async ({
      firstName,
      lastName,
      metamaskId,
      points = 0,
    }: ProfilePageFormProps) => {
      if (loading) {
        return;
      }

      setLoading(true);

      try {
        const firebaseFirestore = (await import("../helpers/initFirebase"))
          .firebaseFirestore;
        const collectionRef = collection(firebaseFirestore, Collections.USERS);
        const rewardsCollectionRef = collection(
          firebaseFirestore,
          Collections.REWARDS
        );

        const newRewardData = {
          created: new Date(),
          action: RewardAction.CREATE,
          amount: 20,
          userId: firebaseUser?.uid,
        } as Reward;

        const userDocRef = doc(collectionRef, firebaseUser?.uid);
        const rewardsDocRef = doc(rewardsCollectionRef);

        await setDoc(
          userDocRef,
          {
            firstName,
            lastName,
            metamaskId,
            updated: new Date(),
            created: new Date(),
            email: firebaseUser?.email,
            amount: points + newRewardData.amount,
          },
          { merge: true }
        );
        await setDoc(rewardsDocRef, newRewardData);

        toast.success("Changes saved!");
        Router.push("/dashboard");
      } catch (err) {
        console.log("login:signInWithEmailAndPassword:err", err);
        toast.error("Could not save, try again later.");
      }

      setLoading(false);
    },
    [firebaseUser?.email, firebaseUser?.uid, loading]
  );

  return (
    <BaseContainer>
      <CenterComponent mode="col">
        <div className="w-full min-h-min max-w-[500px] flex flex-col p-4">
          <ShadowCard>
            <div className="mt-6 p-3 pt-0">
              <PrimaryHeader title="Profile" />
              <div className="flex flex-col mt-6">
                <form
                  className="flex flex-col"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    clearable
                    label="Firstname"
                    placeholder="Firstname"
                    initialValue=""
                    required
                    autoComplete="off"
                    {...register("firstName")}
                  />

                  <Spacer y={0.5} />

                  <Input
                    clearable
                    label="Lastname"
                    placeholder="Lastlame"
                    initialValue=""
                    required
                    autoComplete="off"
                    {...register("lastName")}
                  />

                  <Spacer y={0.5} />

                  <Input
                    clearable
                    label="Metamask Wallet"
                    placeholder=""
                    initialValue=""
                    required
                    autoComplete="off"
                    {...register("metamaskId")}
                  />

                  <Spacer y={0.5} />

                  <Input
                    clearable
                    label="Email"
                    placeholder="Email"
                    initialValue=""
                    required
                    readOnly
                    autoComplete="off"
                    className="cursor-none select-none"
                    {...register("username")}
                  />

                  <Spacer y={2} />

                  <Button className="w-full bg-app-green" type="submit">
                    Save
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

export default SignupPage;

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};
