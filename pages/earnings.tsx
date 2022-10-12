import { ReactElement } from "react";
import { NextPageWithLayout } from "../types/Layout";
import BaseContainer from "../components/BaseContainer";
import PrimaryHeader from "../components/headers/PrimaryHeader";
import { useForm } from "react-hook-form";
import useGlobalStore from "../store/useGlobalStore";
import { UserFirestoreData } from "../types/User";
import SecondaryLayout from "../layouts/SecondaryLayout";
import useRewardsData from "../hooks/useRewardsData";

interface EarningsPageFormProps {
  firstName: string;
  lastName: string;
  username: string;
  metamaskId: string;
  password: string;
  points: number;
}

const EarningsPage: NextPageWithLayout = () => {
  const user: UserFirestoreData = useGlobalStore((state: any) => state.user);
  const rewards = useRewardsData(user?.documentId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EarningsPageFormProps>();

  return (
    <BaseContainer>
      <PrimaryHeader title="Points Earned" />

      <div className="flex-1 w-full flex flex-col p-4">
        <div className="mt-6 p-3 pt-0">
          <div className="flex flex-col justify-center items-center">
            {rewards.map((r, i) => {
              return (
                <div
                  className="min-w-min w-[500px] max-w-[500px] border-app-green border-4 border-solid rounded p-4 shadow"
                  key={i}
                >
                  <p className="font-bold">Type: {r.action}</p>
                  <p className="font-bold">Amount: {r.amount}</p>
                  <p className="font-bold">
                    {/* @ts-ignore */}
                    Type: {r.created.toDate().toISOString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default EarningsPage;

EarningsPage.getLayout = function getLayout(page: ReactElement) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};
