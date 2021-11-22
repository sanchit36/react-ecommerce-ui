import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useSelector(({ auth }) => auth.token);

  return !token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
