import React from 'react'
import { NavContainer, NavLogo, NavMenu, NavMenuItem, UserProfile } from './NavBarStyle'
import cardicon from "../../assets/cardicon.png";

const NavBar = () => {
  return (
    <NavContainer>
      <NavLogo src={cardicon} alt="Uno Logo" />
      <NavMenu>
        <NavMenuItem>Home</NavMenuItem>
        <NavMenuItem>Lobby</NavMenuItem>
        <NavMenuItem>Create Game</NavMenuItem>
        <NavMenuItem>Leaderboards</NavMenuItem>
        <NavMenuItem>Shop</NavMenuItem>
        <NavMenuItem>Achievements</NavMenuItem>
        <NavMenuItem>Game History</NavMenuItem>
      </NavMenu>
      <UserProfile>
        <img src={cardicon} alt="User Profile" />
        <span>Username</span>
      </UserProfile>
    </NavContainer>
  )
}

export default NavBar