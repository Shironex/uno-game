"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import io, { type Socket } from "socket.io-client";

interface WebSocketContextProps {
  gameSocket: Socket | null;
  chatSocket: Socket | null;
  lobbySocket: Socket | null;
}

interface WebSocketProviderProps {
  children: React.ReactNode;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined
);

const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [gameSocket, setGameSocket] = useState<Socket | null>(null);
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);
  const [lobbySocket, setLobbySocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newgameSocket = io("http://localhost:5000/game");
    const newchatSocket = io("http://localhost:5000/chat");
    const newlobbySocket = io("http://localhost:5000/lobby");
    
    setGameSocket(newgameSocket);
    setChatSocket(newchatSocket);
    setLobbySocket(newlobbySocket);

    return () => {
      newgameSocket.disconnect();
      newchatSocket.disconnect();
      newlobbySocket.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ gameSocket, lobbySocket, chatSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocket = (): WebSocketContextProps => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export { WebSocketProvider, useWebSocket };
