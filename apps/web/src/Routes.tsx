import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes as ReactRoutes } from "react-router-dom";
import DefaultLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

const Tasks = lazy(() => import("./pages/Tasks"));

export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route
            path="tasks"
            element={
              <Suspense fallback={<></>}>
                <Tasks />
              </Suspense>
            }
          />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
}
