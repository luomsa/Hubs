import {
    createContext,
    Dispatch,
    ReactElement,
    SetStateAction,
    useContext, useEffect,
    useState,
} from "react";
import client from "../api/http.ts";

const AuthContext = createContext<AuthContext | null>(null);
type AuthState = {
  username: string;
  userId: string;
};
type AuthContext = {
  user: AuthState | null;
  setUser: Dispatch<SetStateAction<AuthState | null>>;
};
const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<AuthState | null>(null);
    useEffect(() => {
        if (user == null) {
            client.GET("/api/users/me").then(({data}) => {
                if (data === undefined) {
                    throw new Error("No data");
                }
                setUser({username: data.username, userId: data.userId});
            }).catch((error) => {
                console.log(error);
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
