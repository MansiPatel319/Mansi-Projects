/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import ImageElement from '../../UI/ImageElement';
import ShopAddRecommandation from './ShopAddRecommandation';

function ShopRecommendationComponent({ shopDetails, getShopDetailsData }) {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <>
      <div className="recommendations-div">
        <div className="recommendations-inner-div">
          <div className="recommendations-header-div">
            <h2>
              {getLangValue(strings.RECOMMENDATIONS, lang)}
              {' '}
              (
              {shopDetails.reviews.length}
              )
            </h2>
          </div>
          <ShopAddRecommandation
            restaurantId={shopDetails.restaurant.id}
            getShopDetailsData={getShopDetailsData}
          />
          {shopDetails.reviews && shopDetails.reviews.length > 0 && (
            <div className="recommendations-body-div">
              {shopDetails.reviews.map((obj) => (
                <div key={obj.id} className="recm-card-bx">
                  <div className="recm-card-bx-row">
                    <div className="recm-card-bx-left-bx">
                      <div className="img-thumb">
                        <ImageElement
                          src={obj.userData.user_image}
                          className="img-fluid"
                          alt="img"
                        />
                      </div>
                    </div>

                    <div className="recm-card-bx-right-bx">
                      <div className="text-div">
                        <h4>{obj.userData.user_name}</h4>
                        <p>
                          &ldquo;
                          {obj.review}
                          &rdquo;
                        </p>
                      </div>

                      {obj.imagesData && (
                        <div className="image-root">
                          <div className="row">
                            {obj.imagesData.map((img) => (
                              <div key={img.id} className="col-lg-6 col-md-6">
                                <div className="image-bx">
                                  <div className="image-bx-inner">
                                    <ImageElement
                                      src={img.url}
                                      className="img-fluid img-object-cover"
                                      alt="img"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ShopRecommendationComponent;
