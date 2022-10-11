import { Button } from "@nextui-org/react";
import Link from "next/link";
import BaseContainer from "../components/BaseContainer";
import BrandHeader from "../components/BrandHeader";
import CenterComponent from "../components/CenterComponent";
import ShadowCard from "../components/ShadowCard";
import { NextPageWithLayout } from "../types/Layout";

const OfflinePage: NextPageWithLayout = () => {
  return (
    <BaseContainer>
      <CenterComponent mode="col">
        <div className="w-full min-h-[400px] max-w-[500px] flex flex-col p-4">
          <ShadowCard>
            <div className="h-full flex flex-col justify-center">
              <BrandHeader title="Sorry! Network is not available right now. Check your internet conection and try again!" />

              <div className=" mt-12 p-3 pt-0">
                <Link href="/login" passHref>
                  <a>
                    <Button className="w-full bg-app-green font-bold">
                      Retry
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </ShadowCard>
        </div>
      </CenterComponent>
    </BaseContainer>
  );
};

export default OfflinePage;
