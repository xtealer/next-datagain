import { FC, useMemo } from "react";
import useGlobalStore from "../../store/useGlobalStore";
import BrandHeader from "../BrandHeader";

const LoadingComponent: FC = () => {
  const loading = useGlobalStore((state: any) => state.loading);
  return useMemo(() => {
    if (loading) {
      return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-[100000] overflow-hidden bg-app-green flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-3xl">
            <BrandHeader />
          </div>
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 mt-12"></div>
          <h2 className="text-center text-white text-xl font-bold">
            Please Wait...
          </h2>
          <p className="w-1/3 text-center text-white">
            {"This may take a few seconds, please don't close this page."}
          </p>
        </div>
      );
    }

    return null;
  }, [loading]);
};

export default LoadingComponent;
