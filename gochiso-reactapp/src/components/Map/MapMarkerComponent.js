/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import images from '../../resources/images';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import {
  setLocationLatitude,
  setLocationLongitude,
  setRadiusLevel,
  setSearchPinLatitude,
  setSearchPinLongitude,
  setZoomLevel,
} from '../../actions/setLocationData';
import useWindowDimensions from '../../utils/dimentionHook';
import useCheckScreen from '../Common/useCheckScreen';

const containerStyle = {
  padding: '0px',
  margin: '0px',
  left: '0px',
  top: '0px',
};

function MapMarkerComponent({ sethoverMarker, zoom, shopData, hoverMarker, toggle }) {
  const lat = useSelector((state) => state.locationLatitude);
  const lng = useSelector((state) => state.locationLongitude);
  const searchPinLat = useSelector((state) => state.searchPinLatitude);
  const searchPinLng = useSelector((state) => state.searchPinLongitude);
  const lang = useSelector((state) => state.defaultLanguage.lang);

  const position = {
    lat: lat && lat.locationLatitude ? lat.locationLatitude : 34.70440749999999,
    lng:
      lng && lng.locationLongitude ? lng.locationLongitude : 135.49747990000003,
  };
  const searchPinPosition = {
    lat:
      searchPinLat && searchPinLat.searchPinLatitude
        ? searchPinLat.searchPinLatitude
        : 34.70440749999999,
    lng:
      searchPinLng && searchPinLng.searchPinLongitude
        ? searchPinLng.searchPinLongitude
        : 135.49747990000003,
  };

  const defaultIcon = images.DefaultIcon;
  const defaultIconHover = images.DefaultIconHover;
  const restaurantIcon = images.RestaurantIcon;
  const restaurantIconHover = images.RestaurantIconHover;
  const locationIcon = images.SearchLocationIcon;
  const experiencesIcon = images.ExperiencesIcon;
  const experiencesIconHover = images.ExperiencesIconHover;
  const fashionIcon = images.FashionIcon;
  const fashionIconHover = images.FashionIconHover;
  const foodIcon = images.FoodIcon;
  const foodIconHover = images.FoodIconHover;
  const generalGoodsIcon = images.GeneralGoodsIcon;
  const generalGoodsIconHover = images.GeneralGoodsIconHover;
  const threeRIcon = images.ThreeRIcon;
  const threeRIconHover = images.ThreeRIconHover;
  const { acoomodationsIcon } = images;
  const { acoomodationsIconHover } = images;
  const { servicesIcon } = images;
  const { servicesIconHover } = images;

  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);

  const { height, width } = useWindowDimensions();
  const { isMobile } = useCheckScreen();
  const ASPECT_RATIO = width / height;

  const markerLoadHandler = (marker, place) => setMarkerMap((prevState) => ({ ...prevState, [place.id]: marker }));

  const markerClickHandler = (event, place) => {
    setSelectedPlace(place);
    if (infoOpen) {
      if (selectedPlace && selectedPlace.id !== place.id) {
        setInfoOpen(true);
      } else {
        setInfoOpen(false);
      }
    } else {
      setInfoOpen(true);
    }
  };

  const mapClickHandler = () => {
    if (infoOpen) {
      setInfoOpen(false);
    }
  };

  const markerHoverIconChangeHandler = (place) => {
    sethoverMarker(place);
  };

  const handleLoad = (map) => {
    mapRef.current = map;
  };

  const handleCenterChanged = () => {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    const ne = mapRef.current.getBounds().getNorthEast();
    const sw = mapRef.current.getBounds().getSouthWest();
    const neLat = ne.lat();
    const swLat = sw.lat();
    const latDelta = neLat - swLat;
    const lngDelta = latDelta * ASPECT_RATIO;
    const newRadius = lngDelta * 69;
    dispatch(setLocationLatitude(newPos.lat));
    dispatch(setLocationLongitude(newPos.lng));
    dispatch(setZoomLevel(mapRef.current.zoom));
    dispatch(setRadiusLevel(newRadius));
  };

  const handleMovePinToCenter = () => {
    if (!mapRef.current) return;
    const myLocPos = mapRef.current.getCenter().toJSON();
    dispatch(setSearchPinLatitude(myLocPos.lat));
    dispatch(setSearchPinLongitude(myLocPos.lng));
  };

  const getMarkerPinIcon = (type) => {
    switch (type) {
      case 'experiences':
        return `${experiencesIcon}`;
      case 'fashion':
        return `${fashionIcon}`;
      case 'food':
        return `${foodIcon}`;
      case 'general-goods':
        return `${generalGoodsIcon}`;
      case 'restaurants-cafes':
        return `${restaurantIcon}`;
      case '3r':
        return `${threeRIcon}`;
      case 'accommodations':
        return `${acoomodationsIcon}`;
      case 'services':
        return `${servicesIcon}`;
      default:
        return `${defaultIcon}`;
    }
  };

  const getMarkerPinHoverIcon = (type) => {
    switch (type) {
      case 'experiences':
        return `${experiencesIconHover}`;
      case 'fashion':
        return `${fashionIconHover}`;
      case 'food':
        return `${foodIconHover}`;
      case 'general-goods':
        return `${generalGoodsIconHover}`;
      case 'restaurants-cafes':
        return `${restaurantIconHover}`;
      case '3r':
        return `${threeRIconHover}`;
      case 'accommodations':
        return `${acoomodationsIconHover}`;
      case 'services':
        return `${servicesIconHover}`;
      default:
        return `${defaultIconHover}`;
    }
  };
  return (
    <div className="col-bx custom-map-col">
      <div className="custom-map-div">
        <div className="show-map-frame">
          <div className="map-view-section">
            <div className="home-map">
              <GoogleMap
                mapContainerStyle={containerStyle}
                mapContainerClassName="map"
                center={position}
                className="map"
                id="map-canvas"
                zoom={isMobile ? 11 : zoom}
                onClick={mapClickHandler}
                options={{ streetViewControl: false }}
                onLoad={handleLoad}
                onDragEnd={handleCenterChanged}
                onZoomChanged={handleCenterChanged}
              >
                <Marker
                  title={getLangValue(strings.YOU_ARE_HERE, lang)}
                  position={searchPinPosition}
                  animation={2}
                  icon={{
                    url: locationIcon,
                  }}
                />
                {shopData
                  && shopData.map((place) => (
                    <Marker
                      key={place.id}
                      title={place.name}
                      position={{
                        lat: parseFloat(place.lat),
                        lng: parseFloat(place.lng),
                      }}
                      animation={2}
                      onLoad={(marker) => markerLoadHandler(marker, place)}
                      onClick={(event) => markerClickHandler(event, place)}
                      onMouseOver={() => markerHoverIconChangeHandler(place)}
                      onMouseOut={() => sethoverMarker({})}
                      icon={{
                        url: `${
                          hoverMarker.id === place.id
                            ? getMarkerPinHoverIcon(
                              place.actionkeywords.length > 0
                                ? place.actionkeywords[0].slug
                                : '',
                            )
                            : getMarkerPinIcon(
                              place.actionkeywords.length > 0
                                ? place.actionkeywords[0].slug
                                : '',
                            )
                        }`,
                      }}
                    >
                      {infoOpen && selectedPlace.id === place.id && (
                        <InfoWindow
                          anchor={markerMap[selectedPlace.id]}
                          onCloseClick={() => setInfoOpen(false)}
                        >
                          <div className="image-map-grid-pop-card image-round-grid-card">
                            <div className="category-slider-box">
                              <div className="category-img-thumb">
                                <div className="img-thumb">
                                  <Link
                                    to={`/${lang}/shop/${place.id}`}
                                    className="link"
                                  >
                                    <img
                                      src={place.cover_image_thumb}
                                      alt=""
                                      className="img-fluid img-responsive"
                                    />
                                  </Link>
                                </div>
                              </div>

                              <div className="category-content-div">
                                <div className="category-content-row">
                                  <div className="category-content-top-div">
                                    <div className="category-content-top-left">
                                      <h3>
                                        <Link
                                          to={`/${lang}/shop/${place.id}`}
                                          className="link"
                                        >
                                          {place.name}
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="category-content-top-right">
                                      <div className="rating-div">
                                        <span className="icon-span">
                                          {' '}
                                          <img
                                            src={images.GoogleLogo}
                                            className="img-fluid"
                                            alt="icon"
                                          />
                                        </span>
                                        <span className="text">
                                          {place.google_ratings
                                            ? parseFloat(
                                              place.google_ratings,
                                            ).toPrecision(2)
                                            : 'NA'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  ))}
              </GoogleMap>
            </div>

            <div className="close-map-div">
              <button
                className="btn btn-closemap"
                id="open-full-map"
                type="button"
                onClick={toggle}
              >
                <span className="material-icons-outlined arrow-icon">
                  navigate_before
                </span>
                <span className="map-txt-btn show-map-txt-btn">
                  {getLangValue(strings.SHOW_MAP, lang)}
                </span>
                <span className="map-txt-btn close-map-txt-btn">
                  {getLangValue(strings.CLOSE_MAP, lang)}
                </span>
              </button>
            </div>
            <div className="close-map-div center-point-div">
              <button
                className="btn btn-primary-common btn-center-btn"
                type="button"
                onClick={handleMovePinToCenter}
              >
                <span className="map-txt-btn">
                  {getLangValue(strings.MOVE_PIN_TO_CENTER, lang)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapMarkerComponent;
