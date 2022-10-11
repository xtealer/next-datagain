import "../styles/globals.css";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";

import { AppPropsWithLayout } from "../types/Layout";
import useEmitAppStartedEvent from "../useEmitAppStartedEvent";
import { ToastContainer } from "react-toastify";

const supportedChainIds = [1, 3, 4, 5, 2018, 61, 63, 6, 212];
const connectors = {
  injected: {},
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  useEmitAppStartedEvent();

  return (
    // @ts-ignore
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <NextUIProvider>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer />
      </NextUIProvider>
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;
