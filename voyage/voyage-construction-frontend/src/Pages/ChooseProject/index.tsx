import * as React from "react";
// Components
import ChooseProjectComponent from "../../Components/Core/ChooseProject";

// images
import images from "../../Assets/images";

// css
import "../../Assets/css/style.css";
import "../../Assets/css/auth.css";

export interface ChooseProjectProps {}

export default function ChooseProject() {
  return (
    <section className="auth-main">
      <div className="container">
        <div className="auth-form">
          <img src={images.logoSvg} alt="logo" className="logo" />
          <ChooseProjectComponent />
        </div>
      </div>
    </section>
  );
}
