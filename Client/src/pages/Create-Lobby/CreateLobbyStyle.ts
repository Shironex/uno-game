import styled from "styled-components";

export const LobbyLayout = styled.main`
  height: calc(100vh - 132.4px);
  display: flex;
`;

export const LeftSide = styled.section`
  background: #242830;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  gap: 10px;
`;

export const Title = styled.label`
  font-size: 16px;
  font-weight: 700;
  color: white;
`;

export const TitleHint = styled.label`
    font-size: 14px;
    color: #64686c;
`;

export const Form = styled.form`
  background: #2b2f37;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 40px;
  padding-top: 40px;
  gap: 10px;
`;

export const LabelGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
`;

export const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
`;