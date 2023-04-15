import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import { BsWallet, BsBell } from "react-icons/bs";
import { RiBaseStationLine } from "react-icons/ri";
import { useSocket } from "../context/SocketContext";
import Tabs from "./Tabs/Tabs";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1b1f24;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-left: 18px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 25px;

  svg {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    width: 20px;
    height: 22px;
  }
  svg:hover {
    color: #f27d0a;
  }
`;

const Label = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  color: #666666;
  cursor: pointer;

  &:hover {
    color: #ffff;
  }
`;

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

const Header = () => {
  const { isConnected } = useSocket();
  return (
    <>
      <HeaderWrapper>
        <Title>Uno Game</Title>

        <Nav>
          <Label to="/live-games">Live Games</Label>
          <Label to="/create-lobby">Create Game</Label>
          {isConnected ? (
            <RiBaseStationLine style={{ color: "green", cursor: "auto" }} />
          ) : (
            <RiBaseStationLine style={{ color: "red", cursor: "auto" }} />
          )}

          <BsBell />
          <BsWallet />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </Nav>
      </HeaderWrapper>
      <Tabs tabs={LiveGamesTabs} />
    </>
  );
};

export default Header;
