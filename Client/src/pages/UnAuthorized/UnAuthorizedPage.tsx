import { Button } from "@chakra-ui/react";
import React from "react";
import { Label, Line, Title, Wrapper } from "./UnAuthorizedStyle";
import { useNavigate } from "react-router-dom";


const UnAuthorizedPage = () => { 
  const navigate = useNavigate();

  function HandleHome() {
    navigate("/");
  }

  return (
    <Wrapper>
      <Title>401</Title>
      <Label>Unauthorized</Label>
      <Line />
      <Button onClick={HandleHome} type="button" background="#b19df7" color="#666666" variant="solid" _hover={{ bg: "#a28af5" }} marginTop="5px" >
        Go Home
      </Button>
    </Wrapper>
  );
};

export default UnAuthorizedPage;
