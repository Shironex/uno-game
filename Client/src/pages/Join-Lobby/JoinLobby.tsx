import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/ui/Loader/Loader";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSocket } from "../../context/SocketContext";
import { useToast } from "@chakra-ui/react";

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

const JoinLobby = () => {
  const { gamename } = useParams();
  const { user } = useAuth();
  const { emit, on, off } = useSocket();
  const navigate = useNavigate();
  const toast = useToast();
  
  useEffect(() => {
    if (gamename && user)
    {
      emit("Join-Game", {
        id: user.id,
        username: user.username,
        lobby: gamename,
      });
    }

    on("Game-User-Join", () => {
      navigate(`/lobby/${gamename}?playerName=${user!.username}`);
    });

    on("Server Error", (data: {code: string, message: string}) => {
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

    return () => {
      off("Game-User-Join");
      off("Server Error");
    };
  }, [gamename, user]);

  return (
    <Layout>
      <Loader />
      <label>Joining {gamename? gamename : "undefined"} Lobby</label>
      <label>Please wait...</label>
    </Layout>
  );
};

export default JoinLobby;
