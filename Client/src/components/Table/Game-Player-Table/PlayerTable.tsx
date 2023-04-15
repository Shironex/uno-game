import { player } from "../../../types/type";
import React from "react";
import { Table } from "../Style";
import styled from "styled-components";

const TableRow = styled.tr`
  background: #1c1f24;
  :nth-child(even) {
    background: #242830;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 5px 10px;
  font-size: 15px;
  background: #242830;
  color: #666666;
  vertical-align: top;
`;

const TableCell = styled.td`
  width: 50%;
  padding: 8px;
  padding-left: 10px;
  height: 100%;
  text-align: left;
  font-size: 13px;
  vertical-align: top;
  color: #ffff;

  vertical-align: top;
  span {
    color: #666666;
  }
`;

interface Props {
  players: player[];
}

const PlayerTable: React.FC<Props> = ({ players }) => {
  return (
    <Table>
      <thead>
        <TableRow>
          <TableHeader>Player</TableHeader>
          <TableHeader>Coins</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <TableRow key={index}>
            <TableCell>
              <span> {player.name}</span>
            </TableCell>
            <TableCell>🟡{player.coins}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default PlayerTable;
