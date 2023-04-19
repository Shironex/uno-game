import React, { useState, useEffect } from "react";
import {
  DetailsContainer,
  DetailsWrapper,
  GameTitle,
  TabItem,
  TabLabel,
  TabsContainer,
} from "./GameDetailsStyle";
import PlayerTable from "../Table/Game-Player-Table/PlayerTable";
import { type Game } from "../../types/type";
import { Button, useToast } from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";
import InfoTable from "../Table/Game-Info-Table/InfoTable";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  Game: Game;
};

const GameDetails = ({ Game }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { emit, on, off } = useSocket();
  const toast = useToast();
  const errotoastid = "Lobby join error";

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const handleJoingGame = () => {
    if (user!.coins < Game.coins)
    {
      setLoading(false);
      return;
    }
    emit("Join-Game", {
      id: user!.id,
      username: user!.username,
      lobby: Game.name,
    });
  }

  useEffect(() => {
    on("Game-User-Exist", () => {
      if (!toast.isActive(errotoastid))
      {
        toast({
          id: errotoastid,
          title: errotoastid,
          description: `There is already user with u socket id`,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    });

    on("Game-User-Join", () => {
      setLoading(false);
      navigate(`/lobby/${Game.name}?playerName=${user?.username}`);
    });

    // cleanup function
    return () => {
      off("Game-User-Exist");
      off("Game-User-Join");
    };
  }, []);

  return (
    <DetailsWrapper>
      <DetailsContainer>
        <GameTitle>{Game.name ? Game.name : "No game selected"}</GameTitle>
        <TabsContainer>
          {Tabs.map((tab, index) => (
            <TabItem
              key={index}
              onClick={() => handleTabClick(index)}
              isActive={index === activeTab}
            >
              <TabLabel>{tab.label}</TabLabel>
            </TabItem>
          ))}
        </TabsContainer>
        {activeTab == 0 && (
          <>
            <PlayerTable players={Game.players} />
            {Game.players.length < Game.maxplayers && (
              <Button
                leftIcon={<AiFillPlusCircle />}
                colorScheme="green"
                isLoading={loading}
                loadingText="Joining...."
                margin="25px"
                variant="solid"
                onClick={handleJoingGame}
              >
                Join Game
              </Button>
            )}
          </>
        )}
        {activeTab == 1 && <InfoTable data={Game} />}
      </DetailsContainer>
    </DetailsWrapper>
  );
};

const Tabs = [
  {
    label: "Players Info",
  },
  {
    label: "Table Info",
  },
];

export default GameDetails;
