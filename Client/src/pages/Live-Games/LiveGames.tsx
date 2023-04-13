import LiveTable from "../../components/Live-Table/LiveTable";
import Header from "../../components/Header";
import { Layout } from "../../styles/Layout";
import React from "react";
import Tabs from "../../components/Tabs/Tabs";

const LiveGamesTabs = [
  {
    label: "Live Games",
    onTabClick: () => console.log("test"),
  },
  {
    label: "Tournaments",
    onTabClick: () => console.log("test"),
  },
  {
    label: "Leaderboards",
    onTabClick: () => console.log("test"),
  },
  {
    label: "Game History",
    onTabClick: () => console.log("test"),
  },
  {
    label: "Achievements",
    onTabClick: () => console.log("test"),
  },
];

const LiveGames = () => {
  return (
    <Layout>
      <Header />
      <Tabs tabs={LiveGamesTabs} />

    </Layout>
  );
};

export default LiveGames;
