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
  const { id } = useParams();
  const { user } = useAuth();
  const { emit, on, off } = useSocket();
  const navigate = useNavigate();
  const toast = useToast();
  const errotoastid = "Lobby join error";

  useEffect(() => {
    
    emit("Join-Game", {
      id: user!.id,
      username: user!.username,
      lobby: id,
    });

    const handleUserExist = () => {
      if (!toast.isActive(errotoastid))
      {
        toast({
          id: errotoastid,
          title: "Lobby join error",
          description: `There is already user with u socket id`,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    };

    const handleUserJoin = () => {
      navigate(`/lobby/${id}?playerName=${user!.username}`);
    };

    on("Game-User-Exist", handleUserExist);
    on("Game-User-Join", handleUserJoin);

    // cleanup function
    return () => {
      off("Game-User-Exist");
      off("Game-User-Join");
    };
  }, []);

  return (
    <Layout>
      <Loader />
      <label>Joining {id} Lobby</label>
      <label>Please wait...</label>
    </Layout>
  );
};

export default JoinLobby;
