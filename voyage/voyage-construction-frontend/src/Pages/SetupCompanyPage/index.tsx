import * as React from "react";

// Components
import CompanySetupComponent from "../../Components/Core/SetupCompanyPage";

// images
import images from "../../Assets/images";
// helper

// css
import "../../Assets/css/style.css";
import "../../Assets/css/auth.css";

export interface SetCompanyProps {}

export default function SetCompany() {
  return (
    <section className="auth-main">
      <div className="container">
        <div className="auth-form">
          <img src={images.logoSvg} alt="logo" className="logo" />
          <CompanySetupComponent />
        </div>
      </div>
    </section>
  );
}
