import React from "react";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import App from "../App";
import CreateLobby from "../pages/CreateLobby";
import Layout from "../Layout/Layout";
import Game from "../pages/Game/Game";
import LoginPage from "../pages/Login/LoginPage";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const Routers = () => {

  return (
    <Router>
      <ClerkProvider
        publishableKey={clerkPubKey}
      >
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/lobby/:id" element={<Game />} />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/create-lobby"
            element={
              <Layout>
                <CreateLobby />
              </Layout>
            }
          />
        </Routes>
      </ClerkProvider>
    </Router>
  );
};

export default Routers;
