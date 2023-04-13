import { SignIn, RedirectToSignIn } from "@clerk/clerk-react";
import styled from "styled-components";

const LoginWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPage = () => {
  return (
    <RedirectToSignIn />
  );
};

export default LoginPage;
