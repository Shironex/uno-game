import { type Game } from "../../../types/type";
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
  data: Game;
}

const InfoTable: React.FC<Props> = ({ data }) => {
  return (
    <Table>
      <thead>
        <TableRow>
          <TableHeader>Info</TableHeader>
          <TableHeader>Value</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        <TableRow>
          <TableCell>
            <span>Leader:</span>
          </TableCell>
          <TableCell>{data.leader}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>Players:</span>
          </TableCell>
          <TableCell>{data.players.length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>Max Players:</span>
          </TableCell>
          <TableCell>{data.maxplayers}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>Game Mode:</span>
          </TableCell>
          <TableCell>{data.gamemode}</TableCell>
        </TableRow>
      </tbody>
    </Table>
  );
};

export default InfoTable;
