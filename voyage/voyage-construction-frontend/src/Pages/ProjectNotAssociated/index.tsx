import * as React from "react";
// Components
import ProjectNotAssociated from "../../Components/Core/ProjectNotAssociated";

// images
import images from "../../Assets/images";

// css
import "../../Assets/css/style.css";
import "../../Assets/css/auth.css";

export interface ChooseCompanyProps {}

export default function ChooseCompany() {
  return (
    <section className="auth-main">
      <div className="container">
        <div className="auth-form">
          <img src={images.logoSvg} alt="logo" className="logo" />
          <ProjectNotAssociated />
        </div>
      </div>
    </section>
  );
}
