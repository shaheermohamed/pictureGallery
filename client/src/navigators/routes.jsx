import { Route, Routes } from "react-router-dom";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import Dashboard from "../pages/Dashboard";
import ProjectDetails from "../pages/ProjectDetails";
import RedirectIfAuthenticated from "../components/RedirectIfAuthenticated ";
import ProtectedRoute from "../components/ProctectedRoute";
const routes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-3xl font-bold underline bg-red-300">
              Hello world!
            </h1>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <Signup />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default routes;