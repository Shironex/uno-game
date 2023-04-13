import React, { ReactNode } from "react";
import { Layout as MainLayout } from "../styles/Layout";
import Header from "../components/Header";
import NavBar from "../components/NavBar/NavBar";

type Props = {
    children: ReactNode
};

const Layout = (props: Props) => {
  return (
    <MainLayout>
      <NavBar />
      {props.children}
    </MainLayout>
  );
};

export default Layout;
