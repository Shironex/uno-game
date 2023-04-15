import React, { useState } from "react";
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
import { Button } from "@chakra-ui/react";
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
  const navigate = useNavigate();
  const { user } = useAuth();
  const { emit } = useSocket();
  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const handleJoingGame = () => {
    emit("Join-Game", {
      username: user?.username,
      lobby: Game.name,
    });
    navigate(`/lobby/${Game.name}?playerName=${user?.username}`);
  }

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
