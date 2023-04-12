import React,{ useRef, useEffect } from "react";
import { imagecards } from "../../utils/helpers";
import CardsBack from "../../assets/card-back.png";

import styled from "styled-components";
import { type GamePlayer } from "./GameStyle";

const GetPosition = (position: string) => {
  switch (position) {
    case "top":
      return { width: "700px", height: "150px", flex: "row", rotate: "rotate(0))"  };
    case "left":
      return { width: "150px", height: "600px", flex: "column", rotate: "rotate(90deg)" };
    case "bottom":
      return { width: "700px", height: "150px", flex: "row", rotate: "rotate(0)"  };
    case "right":
      return { width: "150px", height: "600px", flex: "column", rotate: "rotate(-90deg)" };

    default:
      return { width: "0", height: "0" };
  }
};

type DeckProps = {
  position: string;
};

const Deck = styled.div<DeckProps>`
  width: ${({ position }) => GetPosition(position).width};
  height: ${({ position }) => GetPosition(position).height};
  background: #282936;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type CardProps = {
  isHoverable: boolean;
  position: string;
};

const CardContainer = styled.ul<{ position: string, hasOverflow: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${({ position }) => GetPosition(position).flex};
  align-items: center;
  flex-wrap: nowrap;
  gap: 5px;
  list-style: none;
  padding: 0;
  margin: 0;
  white-space: nowrap;
  overflow: hidden; // hide horizontal scrollbar
  justify-content: ${({ hasOverflow }) =>
    hasOverflow ? "flex-start" : "center"};
  padding-left: ${({ hasOverflow, position }) => (hasOverflow ? "10px" : "0")};

`;

const Card = styled.img<CardProps>`
  position: relative;
  min-width: 82px;
  height: 82px;
  cursor: ${({ isHoverable }) => (isHoverable ? "pointer" : "default")};
  transform: ${({ position }) => GetPosition(position).rotate};
  :hover {
    bottom: ${({ isHoverable }) => (isHoverable ? "5px" : "0")};
  }
`;


type Props = {
  player: GamePlayer;
  currentPlayer: string;
  GamePlayerTurn: string;
  positon: string;
  onCardClick: (src: string) => void;
};

const CardList = ({ player, currentPlayer, GamePlayerTurn, positon, onCardClick}: Props) => {
  const scrollRef = useHorizontalScroll();
  const hasOverflow = scrollRef.current ? scrollRef.current.scrollWidth > scrollRef.current.clientWidth : false;
  
  return (
    <Deck position={positon}>
      <CardContainer ref={scrollRef} position={positon} hasOverflow={hasOverflow}>
        {player.deck?.map((card, index) => {
          const isPlayerCard = currentPlayer == player.name;
          const isPlayerTurn = currentPlayer == GamePlayerTurn;
          return (
            <li key={index}>
              <Card
                position={positon}
                src={isPlayerCard ? imagecards[card.src] : CardsBack}
                isHoverable={isPlayerCard && isPlayerTurn}
                onClick={() => onCardClick(card.src)}
              />
            </li>
          );
        })}
      </CardContainer>
    </Deck>
  );
};


const useHorizontalScroll = () => {
    const elRef = useRef<HTMLUListElement>(null);
  
    useEffect(() => {
      const el = elRef.current;
      if (el) {
        const onWheel = (e: WheelEvent) => {
          if (e.deltaY === 0) return;
          e.preventDefault();
          el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            behavior: "smooth"
          });
        };
        el.addEventListener("wheel", onWheel);
        return () => el.removeEventListener("wheel", onWheel);
      }
    }, []);
  
    return elRef;
  };


export default CardList;
