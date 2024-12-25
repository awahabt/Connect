import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes";
// import Layout from "./components/common/Layout";
import Signup from "./pages/Signup";
import Index from "./pages/auth";
const ErrorBoundary = lazy(() => import("./components/common/ErrorBoundary"));
const Login = lazy(() => import("./pages/Login"));
const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
    <p>Loading...</p>
  </div>
);

function AppRouter() {
  // const stagingStatus = import.meta.env.VITE_STAGING_DEVELOPMENT;
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.signup} element={<Signup />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default AppRouter;
