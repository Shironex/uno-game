import styled from 'styled-components';

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #282936;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const NavLogo = styled.img`
  height: 50px;
  width: auto;
`;

export const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavMenuItem = styled.li`
  margin-right: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #555555;
  cursor: pointer;
  transition: color .4s ease-in-out;
  &:last-child {
    margin-right: 0;
  }
  
  &:hover {
    color: #ffff;
  }
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #555555;
  
  img {
    height: 40px;
    width: 40px;
    margin-right: 10px;
    border-radius: 50%;
  }
`;