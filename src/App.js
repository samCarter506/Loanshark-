import { Routes, Route } from "react-router-dom";

import MainLayout from "./Pages/Layout/MainLayout";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import LoanLandingPage from "./Pages/Landing";
import Applications from "./Pages/Applications";
import Apply from "./Pages/Apply";
import Audit from "./Pages/Audit";
import SystemCode from "./Pages/System/SystemCode";
import SystemCodeDetails from "./Pages/System/SystemCodeDetails";

import ProtectedRoute from "./Routes/ProtectedRoute";
import UpdateUserRole from "./Pages/Roles";
import PublicRoute from "./Routes/PublicRoute";

import Profile from "./Pages/Profile";
//import Users from "./Pages/Users";

import RoleRoute from "./Helpers/RolesMan";
import CheckStatus from "./Pages/StatusCheck";

function App() {

  return (

    <Routes>

      {/* ========================= */}
      {/* PUBLIC ROUTES */}
      {/* ========================= */}

      

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* ========================= */}
      {/* PROTECTED LAYOUT */}
      {/* ========================= */}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >

        {/* USER + ADMIN */}
        <Route
          path="/application/apply"
          element={
            <RoleRoute allowedRoles={["User", "Admin"]}>
              <Apply />
            </RoleRoute>
          }
        />
        <Route
        path="/"
        element={<LoanLandingPage />}
      />

        {/* ADMIN ONLY */}
        <Route
          path="/application"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <Applications />
            </RoleRoute>
          }
        />

        <Route
          path="/rolesman"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <UpdateUserRole />
            </RoleRoute>
          }
        />

        {/* ADMIN ONLY */}
        <Route
          path="/audit"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <Audit />
            </RoleRoute>
          }
        />
       

        {/* USER + ADMIN */}
        <Route
          path="/user/profile"
          element={
            <RoleRoute allowedRoles={["User", "Admin"]}>
              <Profile />
            </RoleRoute>
          }
        />
          <Route
          path="/checkstatus"
          element={
            <RoleRoute allowedRoles={["User", "Admin"]}>
              <CheckStatus />
            </RoleRoute>
          }
        />

        {/* ADMIN ONLY */}
        <Route
          path="/systemcode"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <SystemCode />
            </RoleRoute>
          }
        />

        {/* ADMIN ONLY */}
        <Route
          path="/systemcodedetails"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <SystemCodeDetails />
            </RoleRoute>
          }
        />

      </Route>

    </Routes>

  );
}

export default App;