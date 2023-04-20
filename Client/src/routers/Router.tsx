import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateLobby from "../pages/Create-Lobby/CreateLobby";
import Layout from "../Layout/Layout";
import Game from "../pages/Game/Game";
import ProtectedRoute from "./ProtectedRoute";
import LiveGames from "../pages/Live-Games/LiveGames";
import JoinLobby from "../pages/Join-Lobby/JoinLobby";
import RegisterPage from "../pages/Register/RegisterPage";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LiveGames />
            </Layout>
          }
        />
        <Route
          path="/live-games"
          element={
            <ProtectedRoute>
              <Layout>
                <LiveGames />
              </Layout>
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
        <Route
          path="/join/:gamename"
          element={
            <ProtectedRoute>
              <JoinLobby />
            </ProtectedRoute>
          }
        />
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
