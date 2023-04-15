import styled from "styled-components";

export type Game = {
  id: number;
  name: string;
  leader: string;
  coins: number;
  players: GamePlayer[];
  maxplayers: number;
  currentPlayerTurn: string;
  drawPile: TCard[];
  discardPile: TCard[];
  status: "Currently Live" | "Finished" | "Waiting To Start";
  started: boolean;
};

export type GamePlayer = {
  name: string;
  position?: string;
  deck?: TCard[];
};

export type TCard = {
  src: string;
  color?: string;
  effect?: string;
};

export type PlaceCardData = {
  started: boolean;
  players: GamePlayer[];
  drawPile: TCard[];
  discardPile: TCard[];
  currentPlayerTurn: string;
};

export type Color = "R" | "B" | "Y" | "G";

type PlayerProps = {
  position: string;
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100vh;
  color: white;
`;

export const Player = styled.div<PlayerProps>`
  grid-column: ${(props) => {
    switch (props.position) {
      case "top":
        return "1 / 4";
      case "left":
        return "1 / 2";
      case "bottom":
        return "1 / 4";
      case "right":
        return "3 / 4";
      default:
        return "";
    }
  }};
  grid-row: ${(props) => {
    switch (props.position) {
      case "top":
        return "1 / 2";
      case "left":
        return "1 / 4";
      case "bottom":
        return "3 / 4";
      case "right":
        return "1 / 4";
      default:
        return "";
    }
  }};
  display: flex;
  justify-content: ${(props) => {
    switch (props.position) {
      case "top":
        return "center";
      case "left":
        return "flex-start";
      case "bottom":
        return "center";
      case "right":
        return "flex-end";
      default:
        return "";
    }
  }};
  align-items: center;
  font-size: 24px;
`;

export const MainSection = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0;
  width: 100%;
  height: 100%;
  padding: 50px;
`;

export const PileSection = styled.div`
  background: #282936;
  width: 100%;
  height: 80%;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  //gap: 55px;
`;

export const CardSection = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 55px;
`;

export const PlayerSection = styled.section<PlayerProps>`
  grid-column: ${({ position }) => {
    switch (position) {
      case "top":
        return "2 / 3";
      case "left":
        return "1 / 2";
      case "bottom":
        return "2 / 3";
      case "right":
        return "3 / 4";
      default:
        return "";
    }
  }};
  grid-row: ${({ position }) => {
    switch (position) {
      case "top":
        return "1 / 2";
      case "left":
        return "2 / 3";
      case "bottom":
        return "3 / 4";
      case "right":
        return "2 / 3";
      default:
        return "";
    }
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

export const Button = styled.button`
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

export const Deck = styled.div<PlayerProps>`
  width: ${(props) => {
    switch (props.position) {
      case "top":
        return "700px";
      case "left":
        return "150px";
      case "bottom":
        return "700px";
      case "right":
        return "150px";
      default:
        return "700px";
    }
  }};
  height: ${(props) => {
    switch (props.position) {
      case "top":
        return "150px";
      case "left":
        return "700px";
      case "bottom":
        return "150px";
      case "right":
        return "700px";
      default:
        return "150px";
    }
  }};
  background: #282936;
  border-radius: 12px;
  display: flex;
  flex-direction: ${(props) => {
    switch (props.position) {
      case "top":
        return "row";
      case "left":
        return "column";
      case "bottom":
        return "row";
      case "right":
        return "column";
      default:
        return "row";
    }
  }};
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

type PCard = {
  isHoverable: boolean;
  haveChangedColor?: string;
};

const getBoxShadow = (color: string) => {
  switch (color) {
    case "R":
      return "0px 0px 50px 16px rgba(231, 99, 103, 1)";
    case "B":
      return "0px 0px 50px 16px rgba(99, 120, 231, 1)";
    case "G":
      return "0px 0px 50px 16px rgba(99, 231, 106, 1)";
    case "Y":
      return "0px 0px 50px 16px rgba(220, 231, 99, 1)";
    default:
      return "";
  }
};

export const CardImage = styled.img<PCard>`
  position: relative;
  width: 82px;
  height: 82px;
  -webkit-box-shadow: ${({ haveChangedColor }) =>
    haveChangedColor ? getBoxShadow(haveChangedColor) : ""};
  -moz-box-shadow: ${({ haveChangedColor }) =>
    haveChangedColor ? getBoxShadow(haveChangedColor) : ""};
  box-shadow: ${({ haveChangedColor }) =>
    haveChangedColor ? getBoxShadow(haveChangedColor) : ""};
  cursor: ${({ isHoverable }) => (isHoverable ? "pointer" : "default")};
  :hover {
    bottom: ${({ isHoverable }) => (isHoverable ? "5px" : "0")};
  }
`;

export const Cardistack = styled.div`
  position: relative;
  width: 82px;
  height: 82px;
`;

function getRandomRotationDegree(): number {
  return Math.floor(Math.random() * 360);
}

type CardistackIMG = {
  haveChangedColor?: string;
  CanRotate: boolean;
};

export const CardistackIMG = styled.img<CardistackIMG>`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 82px;
  max-height: 82px;
  &.first {
    -webkit-box-shadow: ${({ haveChangedColor }) =>
      haveChangedColor ? getBoxShadow(haveChangedColor) : ""};
    -moz-box-shadow: ${({ haveChangedColor }) =>
      haveChangedColor ? getBoxShadow(haveChangedColor) : ""};
    box-shadow: ${({ haveChangedColor }) =>
      haveChangedColor ? getBoxShadow(haveChangedColor) : ""};
    transform: rotate(0);
  }
  
  &:not(.first) {
    transform: rotate(${getRandomRotationDegree()}deg);
    box-shadow: none;
  }
`;
