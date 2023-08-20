/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setFormattedAddress } from '../../actions/setLocationData';
import { get } from '../../network/requests';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import ChangeLocationModal from './ChangeLocationModal';

toast.configure();

function DashboardChangeLocationComponent({ lat, lng }) {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.formattedAddress);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [cityName, setCityName] = useState(location);
  const lang = useSelector((state) => state.defaultLanguage.lang);

  const getFilterCategoryData = () => {
    if (lat && lng) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      get(`${url}`, false)
        .then((response) => {
          response.data.results.map((obj) => {
            if (obj.types.includes('locality')) {
              setCityName(obj.formatted_address);
              dispatch(setFormattedAddress(obj.formatted_address));
            }
          });
        })
        .catch(() => {
          // console.log(error);
        });
    }
  };
  useEffect(() => {
    if (location && location.formattedAddress) {
      setCityName(location.formattedAddress);
    } else {
      setCityName('');
    }
  }, [location]);
  useEffect(() => {
    getFilterCategoryData();
  }, [lat, lng]);

  return (
    <>
      <div className="change-location-div">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="text-div">
                <h2>
                  {cityName
                    ? lang === 'en'
                      ? `${getLangValue(
                        strings.HOME_CURRENT_LOCATION_TEXT,
                        lang,
                      )} ${cityName}.`
                      : `${cityName} ${getLangValue(
                        strings.HOME_CURRENT_LOCATION_TEXT,
                        lang,
                      )}`
                    : `${getLangValue(
                      strings.HOME_CURRENT_LOCATION_UNKNOWN,
                      lang,
                    )}`}
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#change-location-popup"
                    className="link"
                    onClick={() => setShowLocationModal(!showLocationModal)}
                  >
                    {getLangValue(strings.HOME_CHANGE_LOCATION, lang)}
                  </button>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLocationModal && (
        <ChangeLocationModal
          show={showLocationModal}
          onHide={() => setShowLocationModal(false)}
          cityName={cityName}
        />
      )}
    </>
  );
}

export default DashboardChangeLocationComponent;
