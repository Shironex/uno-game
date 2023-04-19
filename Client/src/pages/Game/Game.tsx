import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Layout } from "../../styles/Layout";
import {
  Container,
  MainSection,
  Button,
  Game,
  GamePlayer,
  TCard,
  PlaceCardData,
} from "./GameStyle";
import PlayerSection from "./PlayerSection";
import PileSection from "./PileSection";
import WaitingPage from "../Waiting-Lobby/WaitingPage";
import { useAuth } from "../../context/AuthContext";

const Game = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { on, off, emit } = useSocket();
  const { search } = useLocation();
  const toast = useToast();
  const toastGameEndedId = "Game Ended";
  const toastCardPlacedId = "Auto Placed";
  const refetchBalance = useAuth().refetchBalance;

  const playerName = new URLSearchParams(search).get("playerName");
  const [gameSetup, setGameSetup] = useState<Game | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<TCard | undefined>();
  const [uno, SetUNO] = useState(false);
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);

  useEffect(() => {
    //? Request Game Data for User that Join
    if (playerName && gameSetup == null) {
      emit("Get-Game-Info", id);
    }

    on("Get-Game-Data", (data: Game) => {
      console.log("Data", data)
      setGameSetup(data);
      //? Indicate for creator that game got created successfully
      if (gameSetup && gameSetup.status == "Waiting To Start" && playerName == null) {
        toast({
          title: "Game Created.",
          description: "Waiting for user to join.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }

      if (data && data.status == "Currently Live" && data.started == false) {
        const players = [...data.players];
        console.log(players);
        const bottomPlayer = playerName ? playerName : data.leader;
        const currentPlayer = players.find(
          (player) => player.name === bottomPlayer
        );
        const playerPositions =
          players.length === 2
            ? ["top", "bottom"]
            : ["top", "left", "right", "bottom"];
        if (currentPlayer) {
          setCurrentPlayer(currentPlayer.name);
          const playerIndex = players.indexOf(currentPlayer);
          const rotatedPositions = playerPositions
            .slice(playerIndex)
            .concat(playerPositions.slice(0, playerIndex));
          players.forEach((player: GamePlayer, index: number) => {
            player.position =
              rotatedPositions[rotatedPositions.length - index - 1];
          });
        }

        setGameSetup({
          ...data,
          players: players,
          started: true,
        });

        toast({
          title: "Game Started.",
          description: `Its ${data.currentPlayerTurn} turn!`,
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    });

    on("Card-Placed", (Card: string) => {
      if (!toast.isActive(toastCardPlacedId))
      {
        toast({
          id: toastCardPlacedId,
          title: "Auto Placed",
          description: `${Card} Have been placed`,
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    });

    on("user joined", (user: string) => {
      //? New User Joined our Lobby
      toast({
        title: "Player Joined",
        description: `${user} has joined the room`,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      //? Emit To room that new user joined so they will get updated Data of Game
      emit("Get-Game-Info", id);
    });

    on("Player-Lose", (name: string) => {
      if (!toast.isActive(toastGameEndedId))
      {
        toast({
          id: toastGameEndedId,
          title: toastGameEndedId,
          description: `${name} have won Game!`,
          status: "info",
          duration: 3000,
          isClosable: false,
          position: "top",
        });
      }
      refetchBalance();
      setTimeout(() => {
        navigate("/");
      }, 3500);
    });

    on("Player-Win", () => {
      if (!toast.isActive(toastGameEndedId))
      {
        toast({
          id: toastGameEndedId,
          title: toastGameEndedId,
          description: `U win The Game!`,
          status: "info",
          duration: 3000,
          isClosable: false,
          position: "top",
        });
      }
      refetchBalance();
      setTimeout(() => {
        navigate("/");
      }, 3500);
    });

    on("Server Error", (data: {code: string, message: string}) => {
      if (!toast.isActive(data.code)) {
        toast({
          id: data.code,
          title: data.code,
          description: data.message,
          status: "error",
          duration: 3500,
          isClosable: true,
          position: "top",
        });
      }
    });

    on("Player-Played-Card", (data: PlaceCardData) => {
      setGameSetup((prevValue) => {
        const updatedPlayers = prevValue!.players.map((player) => {
          const newPlayerData = data.players.find(
            (newPleyerData) => player.name === newPleyerData.name
          );
          if (newPlayerData) {
            return {
              ...player,
              deck: newPlayerData.deck,
            };
          }
          return player;
        });
        return {
          ...prevValue!,
          players: updatedPlayers,
          drawPile: data.drawPile,
          discardPile: data.discardPile,
          currentPlayerTurn: data.currentPlayerTurn,
          started: data.started,
        };
      });

      toast({
        title: "Nex Turn.",
        description: `Its ${data.currentPlayerTurn} turn`,
        status: "info",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    });

    return () => {
      off("user joined");
      off("Get-Game-Data");
      off("Player-Played-Card");
      off("Player-Won");
    };
  }, [id, gameSetup]);

  if (gameSetup && (gameSetup.status == "Waiting To Start" || !gameSetup.started)) {
    //TODO Fix bug when waiting page not appear randomly
    //? !gamesetup or players < max players to add
    return <WaitingPage lobbyname={gameSetup.name} numberOfPlayers={gameSetup.players.length} maxplayers={gameSetup.maxplayers} />;
  }

  return (
    <Layout>
      <Container>
        {gameSetup &&
          gameSetup.players.map((player, index) => {
            return (
              <PlayerSection
                gameSetup={gameSetup}
                currentPlayer={currentPlayer}
                player={player}
                index={index}
                uno={uno}
                SetUNO={SetUNO}
                setSelectedCard={setSelectedCard}
                setIsColorDialogOpen={setIsColorDialogOpen}
              />
            );
          })}
        <MainSection style={{ marginTop: "15px" }}>
          {gameSetup && (
            <PileSection
              gameSetup={gameSetup}
              currentPlayer={currentPlayer}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              uno={uno}
              SetUNO={SetUNO}
              isColorDialogOpen={isColorDialogOpen}
              setIsColorDialogOpen={setIsColorDialogOpen}
            />
          )}
          <Button style={{ marginTop: "15px" }} onClick={() => SetUNO(true)}>
            UNO
          </Button>
        </MainSection>
      </Container>
    </Layout>
  );
};

export default Game;
