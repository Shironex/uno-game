import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  useClerk
} from "@clerk/clerk-react";
import { BsWallet, BsBell } from "react-icons/bs";
import { RiBaseStationLine } from "react-icons/ri";
import { useSocket } from "../context/SocketContext";
import Tabs from "./Tabs/Tabs";

const HeaderWrapper = styled.nav`
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

const NavSection = styled.section`
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
      onTabClick: () => navigate("/register-complete"),
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

          <BsBell />
          <BsWallet />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="redirect"/>
          </SignedOut>
        </NavSection>
      </HeaderWrapper>
      <Tabs tabs={LiveGamesTabs} />
    </>
  );
};

export default Header;
