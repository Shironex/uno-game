import {
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useUser, useAuth as useClerckAuth } from "@clerk/clerk-react";
import { Spinner } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isSignedIn: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isSignedIn: false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Props) => {
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useClerckAuth();
  let userObject = null;


  if (!isLoaded) {
    return (
      <div style={{height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#b19df7"
          size="xl"
        />
        loading Instance...
      </div>
    );
  }

  if (isSignedIn && user) {
    userObject = ({
      id: user.id,
      firstName: user.firstName!,
      lastName: user.lastName!,
      username: user.username!,
      email: user.primaryEmailAddress?.emailAddress!,
    });
  }

  console.log(userObject)

  return (
    <AuthContext.Provider value={{ user: userObject, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
