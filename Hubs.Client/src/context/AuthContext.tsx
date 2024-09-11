import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from "react";

const AuthContext = createContext<AuthContext | null>(null);
type AuthState = {
  username: string;
};
type AuthContext = {
  user: AuthState | null;
  setUser: Dispatch<SetStateAction<AuthState | null>>;
};
const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<AuthState | null>(null);
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
