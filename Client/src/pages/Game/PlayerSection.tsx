import React from "react";
import { Game, GamePlayer, Player, TCard } from "./GameStyle";
import { isValidPlay } from "../..//utils/helpers";
import { useSocket } from "../../context/SocketContext";
import { useToast } from "@chakra-ui/react";
import CardList from "./CardList";

type Props = {
  gameSetup: Game;
  currentPlayer: string;
  player: GamePlayer;
  index: number;
  uno: boolean;
  setSelectedCard: React.Dispatch<React.SetStateAction<TCard | undefined>>;
  setIsColorDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  SetUNO: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayerSection = ({ gameSetup, currentPlayer, player, index, uno, setSelectedCard, setIsColorDialogOpen, SetUNO,}: Props) => {
  const { emit } = useSocket();
  const toast = useToast();
  const TopCard = gameSetup.discardPile[gameSetup.discardPile.length - 1];

  const handleCardClick = ( player: GamePlayer, card: string, TopCard: TCard) => {
    const validPlayer = player.name == gameSetup?.currentPlayerTurn;
    if (validPlayer && isValidPlay(card, TopCard).valid) {
      //? We going to Plave a Card that need to have selected Color
      if (card == "W" || card == "D4W") {
        setSelectedCard({
          src: card,
          effect: isValidPlay(card, TopCard).effect,
        });
        setIsColorDialogOpen(true);
        return;
      }

      emit("Play-Card", {
        gameId: gameSetup.id,
        playerName: player.name,
        card: card,
        effect: isValidPlay(card, TopCard).effect,
        uno: uno,
      });
      setSelectedCard({
        src: card,
        effect: isValidPlay(card, TopCard).effect,
      });
      //? Reset Uno Button
      if (uno) SetUNO(false);
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

  return (
    <Player key={index} position={player.position!}>
      <CardList
        player={player}
        positon={player.position!}
        currentPlayer={currentPlayer}
        GamePlayerTurn={gameSetup.currentPlayerTurn}
        onCardClick={(card) => handleCardClick(player, card, TopCard!)}
      />
    </Player>
  );
};

export default PlayerSection;
