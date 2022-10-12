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
        <div className="w-full min-h-min max-w-[500px] max-h-[500px] flex-1 flex flex-col p-4 justify-center items-center">
          <ShadowCard>
            <div className="h-full flex flex-1 flex-col items-center justify-center">
              <BrandHeader />

              <div className=" mt-12 p-3 pt-0">
                <Button className="w-full bg-app-green font-bold">
                  <Link href="/login">
                    <a className="h-full w-full">Get Started</a>
                  </Link>
                </Button>
              </div>
            </div>
          </ShadowCard>
        </div>
      </CenterComponent>
    </BaseContainer>
  );
};

export default Home;
