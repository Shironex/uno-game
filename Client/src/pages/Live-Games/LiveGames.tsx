import {
  Table,
  TableWrapper,
  TableCell,
  TableHeader,
  TableRow,
  Image,
  GameCell,
  Leaderlabel,
  Label,
  TableHeaderWrapper,
} from "../../components/Live-Table/LiveTableStyle";
import GameImage from "../../assets/Table-images/1.jpg";
import { Layout } from "../../styles/Layout";
import { useEffect, useState } from "react";
import GameDetails from "../../components/Game-Details/GameDetails";
import { GameLiveWrapper } from "./LiveGameStyle";
import { type Game } from "../../types/type";
import { useSocket } from "../../context/SocketContext";

const LiveGames = () => {
  const [Games, SetGames] = useState<Game[]>();
  const [Game, SetGame] = useState<Game>();
  const { on, emit, off } = useSocket();

  const handleGameboards = (data: Game[]) => {
    console.log(data);
    SetGames(data);
  };
  
  useEffect(() => {
    emit('Get-Game-List', null);

    on('Game-List', handleGameboards);
  
    return () => {
      off('Game-List');
    };
  }, [on, off]);

  return (
    <Layout>
      <GameLiveWrapper>
        <TableWrapper>
          <TableHeaderWrapper>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Table</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Coins to win</TableHeader>
                  <TableHeader>Players</TableHeader>
                  <TableHeader style={{ textAlign: "center" }}>
                    Informations
                  </TableHeader>
                </TableRow>
              </thead>
            </Table>
          </TableHeaderWrapper>
          <Table>
            <tbody>
              {Games && Games.map((Game, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Image src={GameImage} />
                    </TableCell>
                    <GameCell>
                      {Game.name}
                      <Label isLive={Game.status}>{Game.status}</Label>
                      <span>
                        Leader: <Leaderlabel>{Game.leader}</Leaderlabel>
                      </span>
                    </GameCell>
                    <TableCell>🟡{Game.coins}</TableCell>
                    <TableCell>
                      {Game.players.length} / {Game.maxplayers}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <span onClick={() => SetGame(Game)}>Details</span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
        {Game && <GameDetails Game={Game} />}
      </GameLiveWrapper>
    </Layout>
  );
};

export default LiveGames;
