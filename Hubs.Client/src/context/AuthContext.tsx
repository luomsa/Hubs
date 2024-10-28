import {
  createContext,
  ReactElement,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";
import client from "../api/http.ts";
import { SidebarHubDto } from "../types.ts";
import { Dispatch } from "react";
type AuthContext = {
  state: AuthState;
  dispatch: Dispatch<AuthReducerAction>;
};
type AuthState = {
  user: AuthUser | null | undefined;
};
type AuthUser = {
  username: string;
  userId: string;
  joinedHubs: SidebarHubDto[];
};

type AuthReducerAction =
  | {
      type: "set_user";
      payload: {
        username: string;
        userId: string;
        joinedHubs: SidebarHubDto[];
      };
    }
  | {
      type: "update_hub";
      payload: SidebarHubDto;
    }
  | {
      type: "update_hubs";
      payload: SidebarHubDto[];
    }
  | { type: "reset_user" };

const initialState: AuthState = { user: undefined };
const AuthContext = createContext<AuthContext>({} as AuthContext);

const authReducer: Reducer<AuthState, AuthReducerAction> = (state, action) => {
  switch (action.type) {
    case "set_user":
      return { user: action.payload };
    case "update_hub":
      return {
        user: {
          ...state.user!,
          joinedHubs: [...(state.user?.joinedHubs || []), action.payload],
        },
      };
    case "update_hubs":
      return {
        user: {
          ...state.user!,
          joinedHubs: action.payload,
        },
      };
    case "reset_user":
      return { user: null };
    default:
      throw new Error("Error in authReducer");
  }
};
const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    if (state.user === null || state.user === undefined) {
      client
        .GET("/api/users/me")
        .then(({ data }) => {
          if (data === undefined) {
            throw new Error("No data");
          }
          dispatch({
            type: "set_user",
            payload: {
              username: data.username,
              userId: data.userId,
              joinedHubs: data.joinedHubs,
            },
          });
        })
        .catch(() => {
          dispatch({ type: "reset_user" });
        });
    }
  }, [state.user]);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext has not been initialized yet");
  return context;
};
export default AuthProvider;
