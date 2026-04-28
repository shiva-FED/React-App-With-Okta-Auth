import { Routes, Route, useNavigate } from "react-router-dom";
import { Security, LoginCallback } from "@okta/okta-react";
import { oktaAuth } from "../auth/oktaConfig";
import RequireAuth from "../auth/RequireAuth";
import { Suspense } from "react";
import { AdminDashboard, UserProfile } from "./routes";
import Home from "./Home";

function AppRoutes() {
  const navigate = useNavigate();

  const restoreOriginalUri = async (oktaAuth: any) => {
    const user = await oktaAuth.getUser();
    const email = user.email;

    // call DB to get role
    const res = await fetch(`http://localhost:5000/users?email=${email}`);
    const data = await res.json();

    const role = data[0]?.role;

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user-profile");
    }
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Suspense fallback={<div>LoadinApp...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login/callback"
            element={
              <div>
                <h3>Processing login...</h3>
                <LoginCallback />
              </div>
            }
          />

          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/user-profile"
            element={
              <RequireAuth>
                <UserProfile />
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </Security>
  );
}

export default function App() {
  return <AppRoutes />;
}
