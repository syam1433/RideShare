import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import FindRide from "./pages/FindRide";
import PostRide from "./pages/PostRide";
import RideDetails from "./pages/RideDetails";
import Profile from "./pages/Profile";
import ActiveRide from "./pages/ActiveRide";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
    ],
  },
  {
    path: "/driver-dashboard",
    element: (
      <ProtectedRoute requireDriver>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DriverDashboard />,
      },
    ],
  },
  {
    path: "/find-ride",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <FindRide />,
      },
    ],
  },
  {
    path: "/post-ride",
    element: (
      <ProtectedRoute requireDriver>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PostRide />,
      },
    ],
  },
  {
    path: "/ride/:id",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <RideDetails />,
      },
    ],
  },
  {
    path: "/active-ride/:id",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ActiveRide />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
]);
