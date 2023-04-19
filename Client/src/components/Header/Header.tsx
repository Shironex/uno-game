import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, SignInButton,} from "@clerk/clerk-react";
import { BsWallet, BsBell } from "react-icons/bs";
import { RiBaseStationLine } from "react-icons/ri";
import { useSocket } from "../../context/SocketContext";
import Tabs from "../Tabs/Tabs";
import DropDown from "../ui/DropDown/DropDown";
import { useAuth } from "../../context/AuthContext";
import { HeaderWrapper, NavSection, Title } from "./Headerstyle";

const Header = () => {
  const { isConnected } = useSocket();
  const navigate = useNavigate();
  const LiveGamesTabs = [
    {
      label: "Live Games",
      onTabClick: () => navigate("/live-games"),
    },
    {
      label: "Create Lobby",
      onTabClick: () => navigate("/create-lobby"),
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
  const [openBalance, SetOpenBalance] = useState(false);
  const openBalanceRef = useRef(false);
  const user = useAuth().user;
  const refetchbalance = useAuth().refetchBalance;

  return (
    <>
      <HeaderWrapper>
        <Title>Uno Game</Title>
        <NavSection>
          {isConnected ? (
            <RiBaseStationLine style={{ color: "green", cursor: "auto" }} />
          ) : (
            <RiBaseStationLine style={{ color: "red", cursor: "auto" }} />
          )}

          <BsBell onClick={() => refetchbalance()} />
          <BsWallet
            onClick={(e) => {
              e.stopPropagation();
              SetOpenBalance(!openBalance);
            }}
          />
          {openBalance && (
            <DropDown
              isOpen={openBalance}
              setIsOpen={SetOpenBalance}
              dropref={openBalanceRef}
              height="80px"
              width="240px"
              top="60px"
              right="70px"
            >
              <DropDown.item text="Your Current Balance:" />
              <span>{user?.coins ? user.coins : 0}</span>
            </DropDown>
          )}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="redirect" />
          </SignedOut>
        </NavSection>
      </HeaderWrapper>
      <Tabs tabs={LiveGamesTabs} />
    </>
  );
};

export default Header;
