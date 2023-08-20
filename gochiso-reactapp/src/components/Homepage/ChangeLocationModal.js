/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { store } from '../../services/Redux';
import {
  setFormattedAddress,
  setLocationLatitude,
  setLocationLongitude,
  setSearchPinLatitude,
  setSearchPinLongitude,
} from '../../actions/setLocationData';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import InputElement from '../../UI/InputElement';

let autoComplete;

const handleScriptLoad = (updateQuery, autoCompleteModalRef) => {
  autoComplete = new google.maps.places.Autocomplete(
    autoCompleteModalRef.current,
    { types: ['(cities)'] },
  );
  autoComplete.setFields([
    'address_components',
    'formatted_address',
    'geometry',
  ]);

  autoComplete.addListener(
    'place_changed',
    // () =>
    // handlePlaceSelect(updateQuery),
  );
};

// function handlePlaceSelect(updateQuery) {
//   if (autoComplete && autoComplete.getPlace()) {
//     const addressObject = autoComplete.getPlace();
//     const address = addressObject.formatted_address;
//     updateQuery(address);
//     store.dispatch(setFormattedAddress(address));
//     store.dispatch(setLocationLatitude(addressObject.geometry.location.lat()));
//     store.dispatch(setLocationLongitude(addressObject.geometry.location.lng()));
//   }
// }

function ChangeLocationModal({ show, onHide, cityName }) {
  const location = useSelector((state) => state.formattedAddress);
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const [query, setQuery] = useState('');
  const autoCompleteModalRef = useRef();
  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    e.preventDefault();
    if (query === '') {
      dispatch(setFormattedAddress(undefined));
      dispatch(setLocationLatitude(undefined));
      dispatch(setLocationLongitude(undefined));
    } else if (autoComplete && autoComplete.getPlace()) {
      const addressObject = autoComplete.getPlace();
      const address = addressObject.formatted_address;
      setQuery(address);
      store.dispatch(setFormattedAddress(address));
      store.dispatch(
        setLocationLatitude(addressObject.geometry.location.lat()),
      );
      store.dispatch(
        setLocationLongitude(addressObject.geometry.location.lng()),
      );
      store.dispatch(
        setSearchPinLatitude(addressObject.geometry.location.lat()),
      );
      store.dispatch(
        setSearchPinLongitude(addressObject.geometry.location.lng()),
      );
    }
    onHide();
  };

  const handleQueryChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    // if (e.target.value === '') {
    // dispatch(setFormattedAddress(undefined));
    // dispatch(setLocationLatitude(undefined));
    // dispatch(setLocationLongitude(undefined));
    // }
  };

  useEffect(() => {
    if (location && location.formattedAddress) {
      setQuery(location.formattedAddress);
    }
  }, [location]);

  useEffect(() => {
    handleScriptLoad(setQuery, autoCompleteModalRef);
  }, []);

  return (
    <Modal
      className="modal modal-custom modal-small-custom fade"
      id="change-location-popup"
      role="dialog"
      show={show}
      onHide={onHide}
      centered
    >
      <div className="modal-header">
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          onClick={onHide}
        >
          <i className="fe fe-x" />
        </button>
        <h1 className="modal-title">
          {getLangValue(strings.HOME_CHANGE_LOCATION, lang)}
        </h1>
      </div>

      <div className="modal-body">
        <div className="group-root-box">
          <div className="form-div form-general-div">
            <div className="row form-row">
              <div className="location-text-div">
                <h2>
                  <span className="icon-span">
                    <span className="material-icons-outlined"> gps_fixed </span>
                  </span>
                  <span className="text-span">
                    {getLangValue(strings.HOME_CURRENT_LOCATION, lang)}: &nbsp;
                    <b>{cityName || getLangValue(strings.UNKNOWN, lang)}</b>
                  </span>
                </h2>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group mb-10">
                  <InputElement
                    inputRef={autoCompleteModalRef}
                    type="text"
                    placeholder={getLangValue(
                      strings.HOME_LOCATION_PLACEHOLDER,
                      lang,
                    )}
                    className="form-control form-search"
                    inputValue={query}
                    valueOnChange={handleQueryChange}
                    divClassName="custom-search-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <div className="modal-footer-row">
          <div className="btn-div btn-left-div">
            <Link
              to="#"
              className="btn btn-default-common btn-clear"
              onClick={() => setQuery('')}
            >
              {getLangValue(strings.CLEAR_BUTTON, lang)}
            </Link>
          </div>
          <div className="btn-div btn-right-div">
            <Link
              to="#"
              className="btn btn-primary-common btn-save"
              onClick={handleOnClick}
            >
              {getLangValue(strings.SUBMIT_BUTTON, lang)}
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ChangeLocationModal;
