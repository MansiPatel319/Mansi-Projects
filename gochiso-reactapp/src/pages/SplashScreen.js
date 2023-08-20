import React from 'react';
import images from '../resources/images';
import ImageElement from '../UI/ImageElement';

const SplashScreen = () => (
  <div className="splash-screen-div">
    <div className="splash-inner-screen-div">
      <ImageElement src={images.SplashImage} className="img-fluid" alt="splash-screen-image" />
    </div>
  </div>
);

export default SplashScreen;
