import { ReactElement } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();

  const destination = new URLSearchParams({
    destination: window.location.pathname,
  });
  if (auth.user === undefined) {
    return <div>Loading...</div>;
  }
  if (auth.user !== null) {
    return children;
  }
  return <Navigate to={`/authenticate?${destination.toString()}`} />;
};

export default ProtectedRoute;
