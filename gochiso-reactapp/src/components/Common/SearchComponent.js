/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import setSearchKeyword from '../../actions/searchKeyword';
import { store } from '../../services/Redux';
import {
  setFormattedAddress,
  setLocationLatitude,
  setLocationLongitude,
  setSearchPinLatitude,
  setSearchPinLongitude,
} from '../../actions/setLocationData';
import InputElement from '../../UI/InputElement';
import ButtonElement from '../../UI/ButtonElement';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';

let autoComplete;

// const loadScript = (url, callback) => {
//   let script = document.createElement('script');
//   script.type = 'text/javascript';

//   if (script.readyState) {
//     script.onreadystatechange = () => {
//       if (script.readyState === 'loaded' || script.readyState === 'complete') {
//         script.onreadystatechange = null;
//         callback();
//       }
//     };
//   } else {
//     script.onload = () => callback();
//   }

//   script.src = url;
//   document.getElementsByTagName('head')[0].appendChild(script);
// };

const handleScriptLoad = (updateQuery, autoCompleteRef) => {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ['(cities)'] },
  );
  autoComplete.setFields([
    'address_components',
    'formatted_address',
    'geometry',
  ]);
  autoComplete.addListener('place_changed', () =>
    handlePlaceSelect(updateQuery),
  );
};

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const address = addressObject.formatted_address;
  updateQuery(address);
  if (address && addressObject.geometry) {
    store.dispatch(setFormattedAddress(address));
    store.dispatch(setLocationLatitude(addressObject.geometry.location.lat()));
    store.dispatch(setLocationLongitude(addressObject.geometry.location.lng()));
    store.dispatch(setSearchPinLatitude(addressObject.geometry.location.lat()));
    store.dispatch(
      setSearchPinLongitude(addressObject.geometry.location.lng()),
    );
  }
}

function SearchComponent(props) {
  const search = useSelector((state) => state.search.query);
  const location = useSelector((state) => state.formattedAddress);
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const autoCompleteRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnClick = (e) => {
    e.preventDefault();
    const data = {
      query: searchInput,
    };
    dispatch(setSearchKeyword(data));
    if (props.setIsOpen) {
      props.setIsOpen();
    }
    history.push(`/${lang}/map`);
  };

  const handleQueryChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    if (e.target.value === '') {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(setLocationLatitude(position.coords.latitude));
        dispatch(setLocationLongitude(position.coords.longitude));
      });
      dispatch(setFormattedAddress(undefined));
      // dispatch(setLocationLatitude(undefined));
      // dispatch(setLocationLongitude(undefined));
    }
  };

  useEffect(() => {
    setSearchInput(search.query);
  }, [search]);

  useEffect(() => {
    if (location && location.formattedAddress) {
      setQuery(location.formattedAddress);
    } else {
      setQuery('');
    }
  }, [location]);

  useEffect(() => {
    handleScriptLoad(setQuery, autoCompleteRef);
    // loadScript(
    //   `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
    //   () => handleScriptLoad(setQuery, autoCompleteRef),
    // );
  }, []);

  return (
    <div className={props.className}>
      <div className="custom-search-row">
        <div className="custom-search-input-div">
          <div className="custom-search-input-row">
            <div className="custom-search-input-bx width-55">
              <InputElement
                type="text"
                placeholder={props.placeholder}
                className="form-control form-search"
                inputValue={searchInput}
                valueOnChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                divClassName="custom-search-input"
                showPreIcon
                preIconParentClassName="custom-search-input-icon-bx"
                preIconChildClassName="bg-custom-icon search-icon"
              />
            </div>

            <div className="custom-search-input-bx width-45 border-left-search">
              <InputElement
                inputRef={autoCompleteRef}
                type="text"
                placeholder={getLangValue(
                  strings.HOME_LOCATION_PLACEHOLDER,
                  lang,
                )}
                className="form-control form-search"
                inputValue={query}
                valueOnChange={handleQueryChange}
                divClassName="custom-search-input"
                showPreIcon
                preIconParentClassName="custom-search-input-icon-bx"
                preIconChildClassName="bg-custom-icon map-pin-icon"
              />
            </div>
          </div>
        </div>
        <div className="custom-search-button-div">
          <ButtonElement
            type="submit"
            className="btn btn-search"
            onClick={handleOnClick}
            label={<span className="bg-custom-icon search-white-icon" />}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
