import * as React from "react";

// Components
import SignupComponent from "../../Components/Core/SignupPage";

// images
import images from "../../Assets/images";

// css
import "../../Assets/css/style.css";
import "../../Assets/css/auth.css";

export interface SignupProps {}

export default function Signup() {

  return (
    <section className="auth-main">
      <div className="container">
        <div className="auth-form">
          <img src={images.logoSvg} alt="logo" className="logo" />
          <SignupComponent />
        </div>
      </div>
    </section>
  );
}
