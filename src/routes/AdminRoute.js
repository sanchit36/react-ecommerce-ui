import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { token, currentUser } = useSelector(({ auth }) => auth);

  return token && currentUser.isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
