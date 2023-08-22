import * as React from "react";

// Components
import AccountCompleteComponent from "../../Components/Core/AccountCompletePage";

// images
import images from "../../Assets/images";

// css
import "../../Assets/css/style.css";
import "../../Assets/css/auth.css";

export interface SetProfileProps {}

export default function SetProfile() {
  return (
    <section className="auth-main">
      <div className="container">
        <div className="auth-form">
          <img src={images.logoSvg} alt="logo" className="logo" />
          <AccountCompleteComponent />
        </div>
      </div>
    </section>
  );
}
