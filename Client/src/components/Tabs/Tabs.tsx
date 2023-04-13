import React, { useState } from "react";
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
