import React, { ReactNode } from "react";
import { Layout as MainLayout } from "../styles/Layout";
import Header from "../components/Header/Header";

type Props = {
    children: ReactNode
};

const Layout = (props: Props) => {
  return (
    <MainLayout>
      <Header />
      {props.children}
    </MainLayout>
  );
};

export default Layout;
