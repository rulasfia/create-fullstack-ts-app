import { BrowserRouter, Route, Routes as ReactRoutes } from "react-router-dom";
import DefaultLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
}
