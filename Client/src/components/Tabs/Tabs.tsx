import React, { useEffect, useState } from "react";
import { Label, TabItem, TabsContainer } from "./TabStyle";

interface Tab {
  label: string;
  onTabClick: () => void;
}

interface Props {
  tabs: Tab[];
}

const Tabs = ({ tabs }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const path = window.location.pathname;
  console.log(path.substring(1));

  useEffect(() => {
    tabs.forEach(tab => {
      if (tab.label.includes(" "))
      {
        const newTab = tab.label.replace(" ", "-");
        if (path.substring(1).toLowerCase() === newTab.toLowerCase())
        {
          setActiveTab(tabs.indexOf(tab));
        }
      }
      if (path.substring(1) === tab.label)
      {
        //TODO Complete pages and check for initial state
      }
    })
  },[])

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
    tabs[tabIndex]?.onTabClick();
  };

  return (
    <TabsContainer>
      {tabs.map((tab, index) => (
        <TabItem key={index} onClick={() => handleTabClick(index)}>
          <Label isActive={index === activeTab}>{tab.label}</Label>
        </TabItem>
      ))}
    </TabsContainer>
  );
};

export default Tabs;
