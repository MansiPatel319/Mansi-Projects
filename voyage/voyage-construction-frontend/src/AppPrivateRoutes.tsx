import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// helper
import { isAuth } from "./Library/Utils/Auth";

export default function PrivteRoutes() {
  return isAuth() === true ? <Outlet /> : <Navigate to="/login" />;
}
