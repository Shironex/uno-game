import { Button } from "@chakra-ui/react";
import Loader from "../../components/ui/Loader/Loader";
import React, { useState } from "react";
import styled from "styled-components";

const Layout = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #242830;
  color: #666666;
  gap: 15px;
`;

type Props = {
  lobbyname: string;
  numberOfPlayers: number;
  maxplayers: number;
};

const WaitingPage = ({ lobbyname, numberOfPlayers, maxplayers }: Props) => {
  const gamelink = `http://uno-game.herokuapp.com/join/${lobbyname}`;
  //const gamelink = `http://localhost:5173/join/${lobbyname}`


  return (
    <Layout>
      <Loader />
      <label>Waiting For Players</label>
      <label>
        {numberOfPlayers} / {maxplayers} have joined
      </label>
      <label>
        Link to join game for other players
      </label>
      <label>
        {gamelink}
      </label>
    </Layout>
  );
};

export default WaitingPage;
