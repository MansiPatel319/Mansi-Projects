import React from 'react';
import '../../assets/css/loader.css';

const Loader = () => (
  <div className="o-page-loader">
    <div className="o-page-loader--content">
      <div className="o-page-loader--spinner" />
      <div className="o-page-loader--message">
        <span>Loading...</span>
      </div>
    </div>
  </div>
);
export default Loader;
