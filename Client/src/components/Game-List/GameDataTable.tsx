import { useSocket } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import {
  DataTable,
  DataTableWrapper,
  JoinLink,
  TableCell,
  TableHeader,
  TableRow,
} from "./Game-Data-Style";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { WinApi } from "../../api";
type Props = {
  Games?: Game[];
};

type Game = {
  id: number;
  name: string;
  creator: string;
  players: string[];
  maxPlayers: number;
  currentPlayerTurn: string;
  deck?: string[];
  discardPile?: string[];
};

const GameDataTable = (props: Props) => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { user } = useUser();

  const JoinRoom = (room: string) => {
    socket.emit("Join-Game", {
      name: user?.firstName,
      room,
    });
    navigate(`/lobby/${room}?playerName=${user?.firstName}`);
  };

  const WonGameMutation = useMutation({
    mutationKey: ["Game-Won", user?.firstName],
    mutationFn: WinApi,
    onSuccess: (data) => console.log(data),
  });

  const HandleWonGame = () => {
    console.log(user?.primaryEmailAddress?.emailAddress);
    if (user && user.primaryEmailAddress && user.firstName && user.lastName) {
      WonGameMutation.mutate({
        email: user.primaryEmailAddress?.emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        username: user.username ? user.username : user.fullName!,
      });
    }
  };


  return (
    <>
      <DataTableWrapper>
        <DataTable>
          <thead>
            <TableRow>
              <TableHeader>Nazwa</TableHeader>
              <TableHeader>Autor</TableHeader>
              <TableHeader>Liczba Graczy</TableHeader>
              <TableHeader>Dołącz do gry</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {props.Games &&
              props.Games.length > 0 &&
              props.Games.map((Game) => (
                <TableRow key={Game.id}>
                  <TableCell>{Game.name}</TableCell>
                  <TableCell>{Game.creator}</TableCell>
                  <TableCell>
                    {Game.players.length} / {Game.maxPlayers}
                  </TableCell>
                  <TableCell style={{ textAlign: "right" }}>
                    {Game.players.length < Game.maxPlayers && (
                      <JoinLink
                        href="#"
                        style={{ marginRight: "5px" }}
                        onClick={() => JoinRoom(Game.name)}
                      >
                        Join
                      </JoinLink>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            {(!props.Games || props.Games.length === 0) && (
              <TableRow>
                <TableCell>Nie ma gry do której możesz dołączyć</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </tbody>
        </DataTable>
      </DataTableWrapper>
      <button style={{color: "white"}} onClick={HandleWonGame}>testt</button>
    </>
  );
};

export default GameDataTable;
