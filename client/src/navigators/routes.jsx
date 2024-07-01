import { Route, Routes, Navigate } from "react-router-dom";
import View from "../pages/View";
const routes = () => {
  return (
    <div>
      <Routes>
        <Route path="/:id" element={<View />} />{" "}
        <Route
          path="/"
          element={
            <div className="flex justify-center items-center">
              <hi>hello there</hi>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default routes;
