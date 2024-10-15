import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import client from "../api/http.ts";
import { SidebarHubDto } from "../types.ts";

const AuthContext = createContext<AuthContext | null>(null);
type AuthState = {
  username: string;
  userId: string;
  joinedHubs: SidebarHubDto[];
};
type AuthContext = {
  user: AuthState | null | undefined;
  setUser: Dispatch<SetStateAction<AuthState | null | undefined>>;
};
const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<AuthState | null | undefined>(undefined);
  useEffect(() => {
    if (user === undefined || user === null) {
      client
        .GET("/api/users/me")
        .then(({ data }) => {
          if (data === undefined) {
            throw new Error("No data");
          }
          setUser({
            username: data.username,
            userId: data.userId,
            joinedHubs: data.joinedHubs,
          });
        })
        .catch((error) => {
          console.log(error);
          setUser(null);
        });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context == null)
    throw new Error("AuthContext has not been initialized yet");
  return context;
};
export default AuthProvider;
