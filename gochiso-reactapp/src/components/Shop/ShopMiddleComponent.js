/* eslint-disable react/prop-types */
import React from 'react';
import ShopAddressMapComponent from './ShopAddressMapComponent';
import ShopButtonComponent from './ShopButtonComponent';
import ShopCategoryKeywordComponent from './ShopCategoryKeywordComponent';
import ShopOpenHourReviewComponent from './ShopOpenHourReviewComponent';
import ShopPhotosComponent from './ShopPhotosComponent';
import ShopRecommendationComponent from './ShopRecommendationComponent';
import ShopSummaryComponent from './ShopSummaryComponent';

function ShopMiddleComponent({ shopDetails, getShopDetailsData, setisLoading }) {
  return (
    <div className="shop-content-middle-root">
      <ShopCategoryKeywordComponent shopDetails={shopDetails} />
      <ShopButtonComponent
        shopDetails={shopDetails}
        getShopDetailsData={getShopDetailsData}
        setisLoading={setisLoading}
      />
      <ShopSummaryComponent shopDetails={shopDetails} />
      <ShopOpenHourReviewComponent shopDetails={shopDetails} />
      <ShopPhotosComponent shopDetails={shopDetails} />
      <ShopAddressMapComponent
        shopDetails={shopDetails}
        google="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      />
      <ShopRecommendationComponent
        shopDetails={shopDetails}
        getShopDetailsData={getShopDetailsData}
      />
    </div>
  );
}

export default ShopMiddleComponent;
