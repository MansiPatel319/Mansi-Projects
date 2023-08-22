import * as React from "react";
// Components
import NoJoinCompanyComponent from "../../Components/Core/NoJoinCompany";

// images
import images from "../../Assets/images";

// css
import "../../Assets/css/style.css";
import "../../Assets/css/auth.css";

export interface NoJoinCompanyProps {}

export default function NoJoinCompany() {
  return (
    <section className="auth-main">
      <div className="container">
        <div className="auth-form">
          <img src={images.logoSvg} alt="logo" className="logo" />
          <NoJoinCompanyComponent />
        </div>
      </div>
    </section>
  );
}
