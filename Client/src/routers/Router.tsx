import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "../App";
import CreateLobby from "../pages/Create-Lobby/CreateLobby";
import Layout from "../Layout/Layout";
import Game from "../pages/Game/Game";
import LoginPage from "../pages/Login/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import LiveGames from "../pages/Live-Games/LiveGames";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/live-games"
          element={
            <ProtectedRoute>
              <LiveGames />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lobby/:id"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/create-lobby"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateLobby />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Routers;
