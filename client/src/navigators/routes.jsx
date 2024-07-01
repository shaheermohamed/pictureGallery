import { Route, Routes, Navigate } from "react-router-dom";
import View from "../pages/View";
const routes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/:id" />} />
        <Route path="/:id" element={<View />} />
      </Routes>
    </div>
  );
};

export default routes;
