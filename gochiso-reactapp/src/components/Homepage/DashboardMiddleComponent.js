/* eslint-disable no-undef */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLocationLatitude,
  setLocationLongitude,
  setSearchPinLatitude,
  setSearchPinLongitude,
} from '../../actions/setLocationData';
import DashboardBannerComponent from './DashboardBannerComponent';
import DashboardChangeLocationComponent from './DashboardChangeLocationComponent';
import DashboardExploreByCategoryComponent from './DashboardExploreByCategoryComponent';

function DashboardMiddleComponent() {
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const dispatch = useDispatch();
  const lat = useSelector((state) => state.locationLatitude.locationLatitude);
  const lng = useSelector((state) => state.locationLongitude.locationLongitude);
  const lang = useSelector((state) => state.defaultLanguage.lang);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      if (!lat || !lng) {
        dispatch(setLocationLatitude(position.coords.latitude));
        dispatch(setLocationLongitude(position.coords.longitude));
        dispatch(setSearchPinLatitude(position.coords.latitude));
        dispatch(setSearchPinLongitude(position.coords.longitude));
      }
    });
  }, []);

  return (
    <>
      {lang === 'en' ? (
        <Helmet>
          <title>mamoru | sustainable living app</title>
          <meta
            name="description"
            content="mamoru is a map-based app that connects you to sustainability-focused businesses, products, and experiences to live a more sustainable life. The sustainable living app is available on iOs, Android, and Web."
          />
        </Helmet>
      ) : (
        <Helmet>
          <title>地図で探すサステナビリティアプリ | mamoru</title>
          <meta
            name="description"
            content="mamoru （まもる）は人や地球に優しいお店と出会い、よりサステナブルな生活をサポートする無料の地図アプリです。"
          />
        </Helmet>
      )}
      <DashboardBannerComponent />
      <DashboardChangeLocationComponent lat={latitude} lng={longitude} />
      <DashboardExploreByCategoryComponent />
    </>
  );
}

export default DashboardMiddleComponent;
