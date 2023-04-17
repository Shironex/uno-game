import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

type TProps = {
  children: ReactNode;
};

type TSocketContext = {
  socket: Socket | null;
  on: (eventName: string, callback: (data: any) => void) => void;
  emit: (eventName: string, data: any) => void;
  off: (eventName: string) => void;
  isConnected: boolean;
};

//const SOCKET_IO_SERVER_URL = "ws://uno-game.herokuapp.com";
const SOCKET_IO_SERVER_URL = "ws://uno-game.herokuapp.com";

const SocketContext = createContext<TSocketContext>({
  socket: null,
  on: () => {},
  emit: () => {},
  off: () => {},
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }: TProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_IO_SERVER_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected successfully!");
      setIsConnected(true);
    });

    newSocket.on("connect_error", () => {
      console.log("Socket Connection Error!");
      setIsConnected(false);
    });
    
    newSocket.on("disconnect", () => {
      console.log("Socket Disconnected!");
      setIsConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const on = (eventName: string, callback: (data: any) => void) => {
    if (socket) {
      socket.on(eventName, (data: any) => {
        callback(data);
      });
    }
  };

  const emit = (eventName: string, data: any) => {
    if (socket) {
      socket.emit(eventName, data);
    }
  };

  const off = (eventName: string) => {
    if (socket) {
      socket.off(eventName);
    }
  };

  const contextValue = {
    socket,
    on,
    emit,
    off,
    isConnected
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
