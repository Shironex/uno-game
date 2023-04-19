import React from "react";
import styled from "styled-components";

interface IProps {
  icon?: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const SLayout = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  height: 30px;
  margin: 3px 0;
  padding: 5px 8px;
  gap: 6px;


  svg {
    font-size: 22px;
  }
  label {
    transition: all .3s ease-in-out;
    cursor: pointer;
    :hover {
      color: #f27d0a;
    }
  }
`;

const DropdowItem = ({ icon, text, onClick }: IProps) => {
  return (
    <SLayout>
      {icon}
      <label onClick={onClick}>{text}</label>
    </SLayout>
  );
};

export default DropdowItem;
