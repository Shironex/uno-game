import React, { useRef, useState } from "react";
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
  const user = useAuth().user;
  const navigate = useNavigate();
  const toast = useToast();
  const errortoastid = "Game not created";



  function handeLobbyCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    SetLoading(true);
    
    try {
      if (!name.current || name.current.value == "" || !numberofplayers.current || !coins.current) 
      {
        SetLoading(false);
        return;
      } else 
      if (!/^[a-zA-Z0-9]{4,20}$/.test(name.current.value)) {
        SetLoading(false);
        toast({
          id: errortoastid,
          title: errortoastid,
          description: `lobby name must be minimum of 4 characters and can not have special characters!`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      if (Number(coins.current.value) > user!.coins )
      {
        SetLoading(false);
        toast({
          id: errortoastid,
          title: errortoastid,
          description: `U dont have enough coins to create this game u have ${user?.coins} and u need ${coins.current.value}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }
  
      setTimeout(() => {
        emit("Create-Game", {
          id: user!.id,
          leader: user!.username,
          name: name.current!.value,
          maxplayers: numberofplayers.current!.value,
          coins: coins.current!.value,
        });
        on("Server Error", (data: {code: string, message: string}) => {
          SetLoading(false);
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
        on("Game-Created", (Name: string) => {
          SetLoading(false);
          navigate(`/lobby/${Name}`);
        });
      }, 1000);
      
    } catch (error) {
      SetLoading(false);
      console.log(error);
    }
  }

  return (
    <LobbyLayout>
      <LeftSide>
        <Title>Set up your Game Lobby</Title>
        <TitleHint>Use right panel to quickly set up your game lobby</TitleHint>
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
          <Label>Coins bet from each player</Label>
        </LabelGroup>
        <NumberInput
          ref={coins}
          background="#1b1f24"
          bordercolor="#f27d0a"
          color="#fff"
          placeholderText="Name"
          width="300px"
          height="50px"
          min={10}
          max={50000}
          mainvalue={100}
          required={true}
        />

        <TitleHint>
          Minimum amount is <span style={{color: "white"}}>10</span> and maximum is <span style={{color: "white"}}>50000</span>
        </TitleHint>
        <TitleHint>
          All players pay same amount of coins, player who win take them all
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
