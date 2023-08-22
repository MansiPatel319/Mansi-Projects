import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// component
import PrivateRoute from "./AppPrivateRoutes";
import Loader from '../src/Components/UI/Loader'
// Pages
const Login = lazy(() => import("./Pages/AuthModule/Login"));
const ForgotPassword = lazy(() => import("./Pages/AuthModule/ForgotPassword"));
const ResetPassword = lazy(() => import("./Pages/AuthModule/ResetPassword"));
const ChooseProject = lazy(() => import("./Pages/ChooseProject"));
const Dashboard = lazy(() => import("./Pages/DashBoardModule"));
const UserManagment = lazy(() => import("./Pages/UserManagment"));
const MyOrganization = lazy(() => import("./Pages/ProfileModule/MyOrganization"));
const SetupProfilePage = lazy(() => import("./Pages/SetupProfilePage"));
const SetupCompanyPage = lazy(() => import("./Pages/SetupCompanyPage"));
const AccountCompletePage = lazy(() => import("./Pages/AccountCompletePage"));
const ExistingUserInvitePage = lazy(() => import("./Pages/ExistingUserInvitePage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const ChooseCompany = lazy(() => import("./Pages/ChooseCompany"));
const NoJoinCompany = lazy(() => import("./Pages/NoJoinCompany"));
const ProjectNotAssociated = lazy(() => import("./Pages/ProjectNotAssociated"));
const  MyAccount = lazy(() => import("./Pages/ProfileModule/MyAccount"));
const SiteDetail = lazy(() => import("./Pages/SiteManagment/SiteDetail"));
const Availablity = lazy(() => import("./Pages/SiteManagment/Availablity"));
const BookingFormModule = lazy(() => import("./Pages/BookingFormModule"));
const AdminRedirect = lazy(() => import("./Pages/AdminRedirect/index."));
const BookingList = lazy(() => import("./Pages/BookingList/index"));

export interface IAppRoutesProps {}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/home/:project" element={<Dashboard />} />
            <Route path="/project/choose" element={<ChooseProject />} />
            <Route path="/dashboard/manage-user/:project" element={<UserManagment />} />
            <Route path="/site-details/:project" element={<SiteDetail />} />
            <Route path="/availablity/:project" element={<Availablity />} />
            <Route path="/new-booking-form/:project" element={<BookingFormModule />} />
            <Route path="/organization" element={<MyOrganization />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/booking/:project" element={<BookingList />} />

          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route path="/setprofile" element={<SetupProfilePage />} />
          <Route path="/setcompany" element={<SetupCompanyPage />} />
          <Route path="/accountcomplete" element={<AccountCompletePage />} />
          <Route path="/acceptinvite" element={<ExistingUserInvitePage />} />
          <Route path="/user/invite" element={<SignupPage />} />
          <Route path="/company/choose" element={<ChooseCompany />} />
          <Route path="/contactus" element={<NoJoinCompany />} />  
          <Route path="/projectNotAssociated" element={<ProjectNotAssociated />} />
          <Route path={`/adminredirect`} element={<AdminRedirect />} />  
          {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
