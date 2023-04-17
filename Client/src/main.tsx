import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./styles/GlobalStye";
import SocketProvider from "./context/SocketContext";
import Router from "./routers/Router";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/AuthContext";
import { dark } from '@clerk/themes';
import { ClerkProvider } from "@clerk/clerk-react";
// Create a client
const queryClient = new QueryClient();
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <ChakraProvider>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
            publishableKey={clerkPubKey}
          >
            <AuthProvider>
              <Router />
            </AuthProvider>
          </ClerkProvider>
        </QueryClientProvider>
      </SocketProvider>
    </ChakraProvider>
  </React.StrictMode>
);
