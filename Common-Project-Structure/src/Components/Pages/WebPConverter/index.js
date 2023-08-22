import React from 'react';

// UI components
import WebPConverter from '../../UI/WebPConverter';

// Css
import allImgPaths from '../../../Assets/AppImages';

// Convert any image extention convert to webp image using below step
// 1) first check image is grater than 1 MB and more
// 2) move to images folder ->src->Assets->images
// 3 ) fire this command cwebp -q 80 cereal.png -o cereal.webp
// refer this document https://www.joshwcomeau.com/performance/embracing-modern-image-formats/

const WebPConverterComponent = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
    <div
      style={{
        width: '50%',
        border: '1px solid red',
        margin: '10px 20px 10px 10px',
      }}>
      <img src={allImgPaths.demoImage} alt="" width="100%" />
    </div>
    <div
      style={{
        width: '50%',
        border: '1px solid red',
        margin: '10px 20px 10px 10px',
      }}>
      <WebPConverter
        src={allImgPaths.demoWebp}
        fallback={allImgPaths.demoImage}
        alt=""
        width="100%"
        height="100%"
      />
    </div>
  </div>
);

export default WebPConverterComponent;
