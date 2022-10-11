import { ReactElement } from "react";
import MainLayout from "../layouts/MainLayout";
import { NextPageWithLayout } from "../types/Layout";

const LoginPage: NextPageWithLayout = () => {
  return <div>test</div>;
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
