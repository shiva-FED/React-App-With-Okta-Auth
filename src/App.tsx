import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Login from './pages/auth/Login';
import LoginCallback from './pages/auth/LoginCallback';
import RoleRoute from './routes/RoleRoute';
import ProtectedRoute from './routes/ProtectedRoute';


const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'));
const UserProfile = lazy(() => import('./pages/user/UserProfile'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <RoleRoute role="Admins">
              <ManageUsers />
            </RoleRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RoleRoute role="Admins">
              <ManageUsers />
            </RoleRoute>
          }
        />

        {/* User */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}