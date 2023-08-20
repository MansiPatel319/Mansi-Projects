import React from 'react';
import '../../assets/css/map-style.css';
import HeaderComponent from '../Header/HeaderComponent';
import MapMiddleComponent from './MapMiddleComponent';

function MainMapComponent() {
  return (
    <div id="wrapper" className="wrapper map-wrapper w-100">
      <HeaderComponent withSearch withMap />
      <MapMiddleComponent />
    </div>
  );
}

export default MainMapComponent;
