import styled from "styled-components";

export const TabsContainer = styled.ul`
  background: #1b1f24;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  gap: 15px;
  padding: 0 40px;
`;

export const Label = styled.label<{ isActive: boolean }>`
  display: inline-block;
  transition: all 0.3s ease-in-out;
  padding: 0 3px;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  :hover {
    border-bottom-color: #f27d0a;
    color: #f27d0a;
    cursor: pointer;
  }
  border-bottom: ${({ isActive }) => isActive && `2px solid #f27d0a`};
  color: ${({ isActive }) => (isActive ? "#f27d0a" : "#73777a")};
  padding-bottom: 5px;
`;
export const TabItem = styled.li`
  padding: 5px 5px 20px 0;
  width: max-content;
  border-bottom: 1px solid transparent;
`;
