import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

import { AppPropsWithLayout } from "../types/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <NextUIProvider>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      {getLayout(<Component {...pageProps} />)}
    </NextUIProvider>
  );
}

export default MyApp;
