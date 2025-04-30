import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const Checkauth = ({ user, children }) => {
  if (location.pathname === "/") {
    if (!user) {
      return <Navigate to="/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  if (
    user &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin" />;
    } else {
      <Navigate to="/shop/home" />;
    }
  }
  if (
    !user &&
    !(
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    )
  ) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default Checkauth;
