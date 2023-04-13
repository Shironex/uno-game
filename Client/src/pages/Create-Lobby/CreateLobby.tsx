import {
  FormControl,
  Center,
  FormLabel,
  Input,
  InputGroup,
  NumberInput,
  NumberInputField,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSocket } from "../../context/SocketContext";
import { useUser } from "@clerk/clerk-react";

const Layout = styled.section`
  display: flex;
  justify-content: center;
`;

const CreateLobby = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [maxPlayers, setmaxPlayers] = useState(2);
  const { user } = useUser();

  const navigate = useNavigate();
  const socket = useSocket();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setLoading(true);
    if (name == "" ) {
      setLoading(false);
      return;
    }
    setTimeout(() => {
      socket.emit("Create-Game", {
        creator: user?.firstName,
        name,
        maxPlayers,
      });
      setLoading(false);
      navigate(`/lobby/${name}`);
    }, 1500);
  };



  return (
    <Center marginTop="20px">
      <Layout>
        <FormControl>
          <form onSubmit={handleSubmit}>
            <FormLabel marginTop="20px" color="#ffff">Nazwa Lobby</FormLabel>
            <InputGroup width="300px">
              <Input
                type="text"
                placeholder="Nazwa lobby"
                color="#ffff"
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>

            <FormLabel marginTop="20px" color="#ffff">
              Ilość Graczy
            </FormLabel>
            <InputGroup width="300px">
              <NumberInput
                defaultValue={2}
                min={2}
                max={4}
                color="#ffff"
                onChange={(number) => setmaxPlayers(parseInt(number))}
              >
                <NumberInputField />
              </NumberInput>
            </InputGroup>
            <FormHelperText color="#ffff">
              Maksymalna ilośc graczy to 4
            </FormHelperText>

            <Button
              marginTop="20px"
              isLoading={loading}
              type="submit"
              background="#b19df7"
              color="#333"
              borderColor="#333"
              loadingText="Tworzenie"
              variant="outline"
              _hover={{ bg: "#a28af5" }}
            >
              Submit
            </Button>
          </form>
        </FormControl>
      </Layout>
    </Center>
  );
};

export default CreateLobby;
