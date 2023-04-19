import styled from "styled-components";


export const HeaderWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1b1f24;
  color: #fff;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-left: 18px;
`;

export const NavSection = styled.section`
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
