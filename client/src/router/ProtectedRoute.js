import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const {isAuthenticated, checkIsAuthenticated} = useAuth();

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/" replace />
      ) : (
        <Outlet context={isAuthenticated} />
      )}
    </>
  );
};

export default ProtectedRoute;
