import React from "react";
import useAuth from "../hooks/useAuth";

function Layout({ children }) {
  const { loading, isAuthenticated } = useAuth();

  return <>{children}</>;
}

export default Layout;
