import styled from "styled-components";

export const DetailsWrapper = styled.div`
  width: 30%;
  height: 100%;
  padding: 50px 60px 100px 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DetailsContainer = styled.div`
  background: #2c2f36;
  width: 100%;
  height: 100%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const GameTitle = styled.section`
  background: #1c1f24;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f27d09;
  height: 60px;
`;

export const TabsContainer = styled.ul`
  background: #1c1f24;
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0;
  cursor: pointer;
`;

export const TabLabel = styled.label`
  display: inline-block;
  transition: all 0.3s ease-in-out;
  padding: 0 3px;
  font-size: 12px;
  cursor: pointer;
`;

export const TabItem = styled.li<{ isActive: boolean }>`
  width: 50%;
  height: 100%;
  background: ${({isActive}) => isActive ? "#f27d0a" : "#1c1f24"};
  color: ${({isActive}) => isActive ? "white" : "#73777a"};
  padding: 10px;
  text-align: center;
`;