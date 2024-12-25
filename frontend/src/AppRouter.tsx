import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes";
const ErrorBoundary = lazy(() => import("./components/common/ErrorBoundary"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const AuthLayout = lazy(() => import("./pages/Auth/AuthLayout"));
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
          <Route path="/" element={<AuthLayout />}>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.signup} element={<Signup />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default AppRouter;
