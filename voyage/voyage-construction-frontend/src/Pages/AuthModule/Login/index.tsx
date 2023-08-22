import * as React from "react";
import { Navigate } from "react-router-dom";

// Components
import LoginComponent from "../../../Components/Core/AuthModule/Login";

// images
import logo from "../../../Assets/images/logo.svg"

// helper
import { isAuth } from "../../../Library/Utils/Auth";

// css
import "../../../Assets/css/style.css";
import "../../../Assets/css/auth.css";

export interface LoginProps {}

export default function Login() {
  if (isAuth()) {
    return <Navigate to="/project/choose" />;
  }

  return (
    <section className="auth-main">
      <div className="container">
        <div className="auth-form">
          <img src={logo} alt="logo" className="logo" />
          <LoginComponent />
        </div>
      </div>
    </section>
  );
}
