import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./styles/GlobalStye";
import SocketProvider from "./context/SocketContext";
import Router from "./routers/Router";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <ChakraProvider>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
      </SocketProvider>
    </ChakraProvider>
  </React.StrictMode>
);
