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
  const [copySuccess, setCopySuccess] = useState("");

  async function copyToClipboard(text: string) {
    const gamelink = `http://localhost:5173/join/${text}`
    try {
      await navigator.clipboard.writeText(gamelink);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  }
  return (
    <Layout>
      <Loader />
      <label>Waiting For Players</label>
      <label>
        {numberOfPlayers} / {maxplayers} have joined
      </label>
      <Button
        onClick={() => copyToClipboard(lobbyname)}
        size="sm"
        colorScheme="orange"
        disabled={true}
      >
        {copySuccess ? copySuccess : "Copy Invite Link"}
      </Button>
    </Layout>
  );
};

export default WaitingPage;
