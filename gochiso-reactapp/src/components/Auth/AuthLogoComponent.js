import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../resources/images';
import ImageElement from '../../UI/ImageElement';

function AuthLogoComponent() {
  return (
    <>
      <div className="auth-logo-div">
        <Link to="/" className="img-logo-link">
          <ImageElement
            src={images.Logo}
            className="img-fluid img-responsive"
            alt="logo"
          />
        </Link>
      </div>
    </>
  );
}

export default AuthLogoComponent;
