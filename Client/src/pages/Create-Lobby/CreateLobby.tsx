import React, { useEffect, useRef, useState } from "react";
import {
  Label,
  LabelGroup,
  LeftSide,
  LobbyLayout,
  Form,
  Title,
  TitleHint,
} from "./CreateLobbyStyle";
import { Button, useToast } from "@chakra-ui/react";
import { MdGames } from "react-icons/md";
import { TbBrandCoinbase } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import TextInput from "../../components/ui/input/TextInput";
import NumberInput from "../../components/ui/input/NumberInput";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateLobby = () => {
  const [loading, SetLoading] = useState(false);
  const name = useRef<HTMLInputElement | null>(null);
  const numberofplayers = useRef<HTMLInputElement | null>(null);
  const coins = useRef<HTMLInputElement | null>(null);
  const { emit, on } = useSocket();
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const errortoastid = "Lobby no created";

  function handeLobbyCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    SetLoading(true);
    if (
      !name.current ||
      name.current.value == "" ||
      !numberofplayers.current ||
      !coins.current
    ) {
      SetLoading(false);
      return;
    }
    setTimeout(() => {
      emit("Create-Game", {
        leader: user!.username,
        name: name.current!.value,
        maxplayers: numberofplayers.current!.value,
        coins: coins.current!.value,
      });
      on("Game-Exist", () => {
        SetLoading(false);
        if (!toast.isActive(errortoastid)) {
          toast({
            id: errortoastid,
            title: "Lobby no created",
            description: `lobby name exist use other one!`,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
      });
      on("Game-Created", (name: string) => {
        SetLoading(false);
        navigate(`/lobby/${name}`);
      });
    }, 1000);
  }

  return (
    <LobbyLayout>
      <LeftSide>
        <Title>Set up u Game Lobby</Title>
        <TitleHint>Use right panel to quickly set up u game lobby</TitleHint>
      </LeftSide>
      <Form onSubmit={handeLobbyCreate}>
        <LabelGroup>
          <MdGames />
          <Label>Game Name</Label>
        </LabelGroup>
        <TextInput
          ref={name}
          background="#1b1f24"
          bordercolor="#f27d0a"
          color="#fff"
          placeholderText="Name"
          width="300px"
          height="50px"
          required={true}
        />

        <LabelGroup>
          <FaUserAlt />
          <Label>Number of Players</Label>
        </LabelGroup>
        <NumberInput
          ref={numberofplayers}
          background="#1b1f24"
          bordercolor="#f27d0a"
          color="#fff"
          placeholderText="2"
          width="300px"
          height="50px"
          min={2}
          max={4}
          mainvalue={2}
          required={true}
        />

        <LabelGroup>
          <TbBrandCoinbase />
          <Label>Coins to win</Label>
        </LabelGroup>
        <NumberInput
          ref={coins}
          background="#1b1f24"
          bordercolor="#f27d0a"
          color="#fff"
          placeholderText="Name"
          width="300px"
          height="50px"
          min={100}
          max={500}
          mainvalue={100}
          required={true}
        />

        <TitleHint>U can create game with max 500 coins </TitleHint>
        <TitleHint>
          If lose u will lose 1/2 1/4 1/3 Coins to win depend of number of
          players
        </TitleHint>
        <Button
          type="submit"
          marginTop="10px"
          colorScheme="orange"
          size="sm"
          isLoading={loading}
          loadingText="Creating Lobby"
        >
          Create Game
        </Button>
      </Form>
    </LobbyLayout>
  );
};

export default CreateLobby;
