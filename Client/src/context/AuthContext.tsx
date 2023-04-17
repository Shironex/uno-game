import { createContext, useContext, ReactNode } from "react";
import { useUser, useAuth as useClerckAuth } from "@clerk/clerk-react";
import { AuthWrapper } from "../pages/Live-Games/LiveGameStyle";
import Loader from "../components/ui/Loader/Loader";

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
      <AuthWrapper>
        <Loader />
        loading Connection...
      </AuthWrapper>
    );
  }

  if (isSignedIn && user) {
    userObject = {
      id: user.id,
      firstName: user.firstName!,
      lastName: user.lastName!,
      username: user.username!,
      email: user.primaryEmailAddress?.emailAddress!,
    };
  }

  return (
    <AuthContext.Provider value={{ user: userObject, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
