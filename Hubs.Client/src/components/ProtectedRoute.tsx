import { ReactElement } from "react";
import { useAuth } from "../context/AuthContext.tsx";

type ProtectedRouteProps = {
  children: ReactElement;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();
  console.log(auth);
  if (auth.user != null) {
    return children;
  }
  throw new Error("Not authenticated");
};
export default ProtectedRoute;
