import React from 'react';
import images from '../../resources/images';
import ImageElement from '../../UI/ImageElement';

const AddPlaceRightImageComponent = () => (
  <>
    <div className="add-place-right-root">
      <div className="banner-right-div">
        <ImageElement src={images.PlaceImage} className="img-fluid" alt="img" />
      </div>
    </div>
  </>
);

export default AddPlaceRightImageComponent;
