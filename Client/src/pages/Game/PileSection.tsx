import React from "react";
import {
  PileSection as Section,
  CardImage,
  CardSection,
  type Game,
  type Color,
  type GamePlayer,
  type TCard,
  PlayerSection,
  Cardistack,
  CardistackIMG,
} from "./GameStyle";
import CardsBack from "../../assets/card-back.png";
import { imagecards } from "../../utils/helpers";
import ColorDialog from "../../components/ColorDIalog";
import { useSocket } from "../../context/SocketContext";
import { useToast } from "@chakra-ui/react";

type Props = {
  gameSetup: Game;
  currentPlayer: string;
  selectedCard: TCard | undefined;
  setSelectedCard: React.Dispatch<React.SetStateAction<TCard | undefined>>;
  uno: boolean;
  SetUNO: React.Dispatch<React.SetStateAction<boolean>>;
  isColorDialogOpen: boolean;
  setIsColorDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PileSection = ({
  gameSetup,
  currentPlayer,
  selectedCard,
  uno,
  SetUNO,
  isColorDialogOpen,
  setIsColorDialogOpen,
}: Props) => {
  const { emit } = useSocket();
  const toast = useToast();

  const handleCardClick = (
    player: GamePlayer,
    card: string,
    TopCard: TCard
  ) => {
    const validPlayer = player.name == gameSetup?.currentPlayerTurn;
    //? We going to draw a Card
    if (validPlayer && card === "BackCard") {
      emit("Draw-Card", {
        gameId: gameSetup.id,
        playerName: player.name,
      });
    } else {
      toast({
        title: "Move Error",
        description: `This Card Cant be placed`,
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleColorSelect = (color: Color, player: GamePlayer) => {
    setIsColorDialogOpen(false);

    if (selectedCard && color) {
      emit("Play-Card", {
        gameId: gameSetup?.id,
        playerName: player?.name,
        card: selectedCard.src,
        color: color,
        effect: selectedCard?.effect,
        uno: uno,
      });
      //? Reset Uno Button
      if (uno) SetUNO(false);
    }
  };

  return (
    <Section>
      {gameSetup &&
        gameSetup.players.map((player) => {
          const playerTurn = currentPlayer == gameSetup.currentPlayerTurn;
          const lastThreeCards = gameSetup.discardPile.slice(
            gameSetup.discardPile.length - 4,
            gameSetup.discardPile.length
          );
          const latestDiscardedCard =
            gameSetup.discardPile[gameSetup.discardPile.length - 1]!.src;
          const ChangedColor =
            gameSetup.discardPile[gameSetup.discardPile.length - 1]!.color;
          const TopCard =
            gameSetup.discardPile[gameSetup.discardPile.length - 1];
          console.log(lastThreeCards);
          if (currentPlayer == player.name) {
            return (
              <CardSection>
                <CardImage
                  src={CardsBack}
                  isHoverable={playerTurn}
                  onClick={() => handleCardClick(player, "BackCard", TopCard!)}
                />
                <label>
                  Player Turn:{" "}
                  <span style={{ display: "block", textAlign: "center" }}>
                    {gameSetup.currentPlayerTurn}
                  </span>
                </label>
                {gameSetup.discardPile.length > 3 ? (
                  <Cardistack>
                    {lastThreeCards.map((card, index) => {
                      return (
                        <CardistackIMG
                          className={index === 3 ? "first" : ""}
                          src={imagecards[card.src]}
                          onClick={() =>
                            console.log("discard Pile:", gameSetup.discardPile)
                          }
                          haveChangedColor={ChangedColor}
                          CanRotate={gameSetup.discardPile.length > 3}
                        />
                      );
                    })}
                  </Cardistack>
                ) : (
                  <CardImage
                    src={imagecards[latestDiscardedCard]}
                    isHoverable={false}
                    onClick={() =>
                      console.log("discard Pile:", gameSetup.discardPile)
                    }
                    haveChangedColor={ChangedColor}
                  />
                )}
                <ColorDialog
                  isOpen={isColorDialogOpen}
                  onClose={() => setIsColorDialogOpen(false)}
                  onSelect={(color) => handleColorSelect(color, player)}
                />
              </CardSection>
            );
          } else {
            return (
              <PlayerSection position={player.position!}>
                {player.name}
              </PlayerSection>
            );
          }
        })}
    </Section>
  );
};

export default PileSection;
