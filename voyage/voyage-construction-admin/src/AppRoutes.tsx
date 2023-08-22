import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// component

// Pages
const Dashboard = lazy(() => import("./Pages/DashBoardModule"));
const ProjectDetail = lazy(() => import("./Pages/Project/ProjectDetails"));
const OrganizationList = lazy(() => import("./Pages/OrganizationModule"));
const OrganizationDetails = lazy(() => import("./Pages/Organization/OrganizationDetails"));
const UserModule = lazy(() => import("./Pages/UserModule"));
const UserDetail = lazy(() => import("./Pages/UserModule/UserDetail"));



export interface IAppRoutesProps {}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading....">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/information/project/:ref" element={<ProjectDetail />} />
          <Route path="/organization" element={<OrganizationList />} />
          <Route path="/information/organization/:id/:region" element={<OrganizationDetails />} />
          <Route path="/users" element={<UserModule />} />
          <Route path="/information/users/:ref/:region" element={<UserDetail />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
