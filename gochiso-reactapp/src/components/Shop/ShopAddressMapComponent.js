/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, Marker } from '@react-google-maps/api';
import images from '../../resources/images';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';

const containerStyle = {
  padding: '0px',
  margin: '0px',
  left: '0px',
  top: '0px',
};

function ShopAddressMapComponent({ shopDetails: { restaurant } }) {
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
  + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
  + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
  + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
  + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
  + '(\\#[-a-z\\d_]*)?$', 'i');
  const [businessLink, setBusinessLink] = useState('');
  const position = restaurant && {
    lat: parseFloat(restaurant.lat),
    lng: parseFloat(restaurant.lng),
  };
  useEffect(() => {
    if (restaurant.business_link === '') {
      setBusinessLink('');
    } else if (pattern.test(restaurant.business_link)) {
      setBusinessLink(restaurant.business_link);
    } else {
      setBusinessLink(`http://maps.google.com/?q=${position.lat},${position.lng}`);
    }
  }, [restaurant]);
  return (
    <>
      {restaurant && (
        <div className="desc-div address-desc-div">
          <h2>{getLangValue(strings.ADDRESS, lang)}</h2>

          <div className="prag-div">
            <p className="mb-3">
              {restaurant.address_address1}
              <span className="block">
                {restaurant.address_city}
              </span>
            </p>
          </div>

          <div className="community-button-card-root view-gm-btn-root">
            <div className="row mlr-10">
              <div className="col-lg-4 col-md-6 plr-10">
                <div className="community-button-div">
                  {businessLink === '' ? (
                    <button type="button" style={{ cursor: 'not-allowed' }} className="btn btn-community-button" disabled>
                      {getLangValue(strings.VIEW_ON_GOOGLE_MAPS, lang)}
                    </button>

                  ) : (
                    <a className="btn btn-community-button" target="_blank" href={businessLink} rel="noreferrer">
                      {getLangValue(strings.VIEW_ON_GOOGLE_MAPS, lang)}
                    </a>

                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="custom-outside-map">
            <div className="post-map custom-map-canvas">
              <GoogleMap
                mapContainerStyle={containerStyle}
                mapContainerClassName="map"
                center={position}
                className="map"
                id="map-post-canvas"
                zoom={14}
              >
                <Marker
                  title={restaurant.name}
                  position={position}
                  icon={{
                    url: images.SearchLocationIcon,
                  }}
                />
              </GoogleMap>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShopAddressMapComponent;
