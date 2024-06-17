import { Route, Routes } from "react-router-dom";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default routes;
