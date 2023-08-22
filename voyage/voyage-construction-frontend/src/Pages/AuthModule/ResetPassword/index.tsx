import * as React from "react";
import { Navigate } from "react-router-dom";

// Components
import ResetPasswordComponent from "../../../Components/Core/AuthModule/ResetPassword";

// images
import logo from "../../../Assets/images/logo.svg"

// helper
import { isAuth } from "../../../Library/Utils/Auth";

// css
import "../../../Assets/css/style.css";
import "../../../Assets/css/auth.css";


export interface ResetPasswordProps {}

export default function ResetPassword() {
  if (isAuth()) {
    return <Navigate to="/project/choose" />;
  }

  return (
    <section className="auth-main">
      <div className="container">
        <div className="auth-form">
          <img src={logo} alt="logo" className="logo" />
          <ResetPasswordComponent />
        </div>
      </div>
    </section>
  );
}
