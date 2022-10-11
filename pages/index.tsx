import { Button } from "@nextui-org/react";
import Link from "next/link";
import BaseContainer from "../components/BaseContainer";
import BrandHeader from "../components/BrandHeader";
import CenterComponent from "../components/CenterComponent";
import ShadowCard from "../components/ShadowCard";
import { NextPageWithLayout } from "../types/Layout";

const Home: NextPageWithLayout = () => {
  return (
    <BaseContainer>
      <CenterComponent mode="col">
        <div className="w-full min-h-[400px] max-w-[500px] flex flex-col p-4">
          <ShadowCard>
            <div className="h-full flex flex-col justify-center">
              <BrandHeader />

              <div className=" mt-12 p-3 pt-0">
                <Link href="/login">
                  <Button
                    className="w-full bg-app-green font-bold"
                    type="submit"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </ShadowCard>
        </div>
      </CenterComponent>
    </BaseContainer>
  );
};

export default Home;
