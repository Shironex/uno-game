import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useUser, useAuth as useClerckAuth } from "@clerk/clerk-react";
import { AuthWrapper } from "../pages/Live-Games/LiveGameStyle";
import Loader from "../components/ui/Loader/Loader";
import { ApiError, RegisterAPI } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import Cookies from "universal-cookie";

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
  user: User | undefined;
  isSignedIn: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isSignedIn: false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Props) => {
  
  const [userObject, setUserObject] = useState<User | undefined>();
  const { isLoaded, isSignedIn } = useClerckAuth();
  const { user } = useUser();
  const toast = useToast();
  const cookies = new Cookies();
  const RegisterSuccessId = "Register Complete";
  const RegisterErrorId = "Register Error";
  const RegisterCookie = cookies.get("Registered");

  const { mutate } = useMutation({
    mutationKey: ["CompleteRegister"],
    mutationFn: RegisterAPI,
    onSuccess: () => {
      toast({
        id: RegisterSuccessId,
        title: "Register Complete",
        description: `Lets Play that game!`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      cookies.set("Registered", true, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "strict",
      });
    },
    onError: (error: ApiError) => {
      if ( error.response?.status == 409 && error.response?.data.message == "Player Already exist") 
      {
        cookies.set("Registered", true, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          sameSite: "strict",
        });
      } else
      {
        toast({
          id: RegisterErrorId,
          title: "Register Error",
          description: `There was error try again or contact support!`,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (isLoaded && !isSignedIn)
    {
      cookies.remove("Registered");
    }
    if (isLoaded && isSignedIn && user) {
      setUserObject( {
        id: user.id,
        firstName: user.firstName!,
        lastName: user.lastName!,
        username: user.username!,
        email: user.primaryEmailAddress?.emailAddress!,
      });

      if (!RegisterCookie) {
        mutate({
          id: user!.id,
          email: user.primaryEmailAddress?.emailAddress!,
          firstname: user.firstName!,
          lastname: user.lastName!,
          username: user.username!,
        });
      }
    }
    return () => {

    };
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return (
      <AuthWrapper>
        <Loader />
        loading Connection...
      </AuthWrapper>
    );
  }

  return (
    <AuthContext.Provider value={{ user: userObject, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
