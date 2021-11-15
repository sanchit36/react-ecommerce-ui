import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const currentUser = useSelector((state) => state.user.currentUser);

  return token && currentUser.isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
