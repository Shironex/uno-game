import { RegisterAPI } from "../../api";
import { useAuth } from "../..//context/AuthContext";
import { Button, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Title = styled.h1`
  font-size: 28px;
  color: white;
`;

const Label = styled.label`
  font-size: 18px;
`;

type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
};

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const toast = useToast();
  const RegisterSuccessId = "Register Complete";
  const RegisterErrorId = "Register Error";
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationKey: ["CompleteRegister"],
    mutationFn: RegisterAPI,
    onSuccess: () => {
      setLoading(false);
      toast({
        id: RegisterSuccessId,
        title: "Register Complete",
        description: `Lets Play that game!`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      navigate("/live-games");
    },
    onError: () => {
      setLoading(false);
      toast({
        id: RegisterErrorId,
        title: "Register Error",
        description: `There was error try again or contact support!`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    },
  });

  function handleServerRegister() {
    setLoading(true);
    setTimeout(async () => {
      await mutateAsync({
        id: user!.id,
        email: user!.email,
        firstname: user!.firstName,
        lastname: user!.lastName,
        username: user!.username,
      });
    }, 500);
  }

  return (
    <Layout>
      <Title>Your Account got created successfully</Title>
      <Label>There is last step to complete click here to finish</Label>
      <Button
        onClick={handleServerRegister}
        isLoading={loading}
        loadingText="Finishing"
        type="button"
        color="#fff"
        variant="solid"
        colorScheme="orange"
        marginTop="5px"
      >
        Finish
      </Button>
    </Layout>
  );
};

export default RegisterPage;
