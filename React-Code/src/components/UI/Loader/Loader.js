import React from 'react';
import '../../../assets/css/loader.css';
import image from '../../../assets/images/white-logo-1.png';

const Loader = () => (
  <div className="o-page-loader">
    <div className="o-page-loader--content">
    {/* <div className="o-page-loader--spinner">

      
    </div> */}
    <div className="loader-logo-div">
    <img src={image} className="img-fluid" />
    </div>
    </div>
  </div>
);
export default Loader;
