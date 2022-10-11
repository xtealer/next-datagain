import type { ReactElement } from "react";

import MainLayout from "../layouts/MainLayout";
import { NextPageWithLayout } from "../types/Layout";

const Home: NextPageWithLayout = () => {
  return <div>Home Page!</div>;
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
