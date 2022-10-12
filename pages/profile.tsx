import { ReactElement, useCallback, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { NextPageWithLayout } from "../types/Layout";
import BaseContainer from "../components/BaseContainer";
import ShadowCard from "../components/ShadowCard";
import CenterComponent from "../components/CenterComponent";
import PrimaryHeader from "../components/headers/PrimaryHeader";
import { Input, Spacer } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useGlobalStore from "../store/useGlobalStore";
import { collection, doc, setDoc } from "firebase/firestore";
import { Collections } from "../types/Collections";
import { Reward, RewardAction } from "../types/Reward";
import { UserFirestoreData } from "../types/User";
import SecondaryLayout from "../layouts/SecondaryLayout";
import Router from "next/router";

interface ProfilePageFormProps {
  firstName: string;
  lastName: string;
  username: string;
  metamaskId: string;
  password: string;
  points: number;
}

const ProfilePage: NextPageWithLayout = () => {
  const user: UserFirestoreData = useGlobalStore((state: any) => state.user);
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
          action: RewardAction.UPDATE,
          amount: 5,
          userId: user.documentId,
        } as Reward;

        const userDocRef = doc(collectionRef, user?.documentId);
        const rewardsDocRef = doc(rewardsCollectionRef);

        await setDoc(
          userDocRef,
          {
            firstName,
            lastName,
            metamaskId,
            updated: new Date(),
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
    [loading, user?.documentId]
  );

  useEffect(() => {
    const {
      firstName,
      lastName,
      metamaskId,
      email,
      points = 0,
    } = (user ?? {}) as UserFirestoreData;

    if (typeof firstName === "string") {
      setValue("firstName", firstName);
    }

    if (typeof lastName === "string") {
      setValue("lastName", lastName);
    }

    if (typeof metamaskId === "string") {
      setValue("metamaskId", metamaskId);
    }

    if (typeof email === "string") {
      setValue("username", email);
    }

    if (typeof points === "string") {
      setValue("points", points);
    }
  }, [setValue, user]);

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

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};
