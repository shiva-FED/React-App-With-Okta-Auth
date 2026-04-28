import { useOktaAuth } from "@okta/okta-react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children, role }: any) {
  const { authState } = useOktaAuth();

  if (!authState) return <div>Loading...</div>;

  if (!authState.isAuthenticated) {
    return <Navigate to="/" />;
  }

  const userRole = authState.idToken?.claims.role;

  if (role && userRole !== role) {
    return <div>Access Denied</div>;
  }

  return children;
}