import React from 'react';
import images from '../../resources/images';
import ImageElement from '../../UI/ImageElement';

function AuthLeftBannerComponent() {
  return (
    <>
      <div className="auth-left-side">
        <div className="auth-banner-div">
          <ImageElement
            src={images.AuthBanner}
            className="img-fluid img-banner"
            alt="img"
          />
        </div>
      </div>
    </>
  );
}

export default AuthLeftBannerComponent;
