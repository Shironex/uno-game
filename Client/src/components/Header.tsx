import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, SignInButton   } from "@clerk/clerk-react";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #282936;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 25px;
`;

const Button = styled.button`
  background: #b19df7;
  color: #333;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #a28af5;
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

const Header = () => {
  const navigate = useNavigate();


  function HandleNavigate()
  {
    navigate("/login");
  }

  return (
    <HeaderWrapper>
      <Title>Uno Game</Title>

      <Nav>
        <Label to="/">Lobby</Label>
        <Label to="/create-lobby">Create Game</Label>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton  />
        </SignedOut>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
