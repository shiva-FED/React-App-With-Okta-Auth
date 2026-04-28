import { lazy } from "react";

export const AdminDashboard = lazy(() => import("../features/admin/AdminDashboard"));
export const UserProfile = lazy(() => import("../features/user/UserProfile"));