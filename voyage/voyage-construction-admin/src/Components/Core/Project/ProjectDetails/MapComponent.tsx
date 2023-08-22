import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

interface mapProps {
  latitude: any;
  longitude: any;
}
const MyMapComponent = ({ latitude, longitude }: mapProps) => {
  const API_KEY: any = process.env.REACT_APP_GOOGLE_API_KEY;
  const [data, setData] = useState({
    lat: 23.022505,
    lng: 72.5713621,
  });
  const renderMarkers = (map: any, maps: any) => {
    const marker = new maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      map,
      title: "Hello World!",
    });
    return marker;
  };
  useEffect(() => {
    if (latitude && longitude)
    {
      
      setData({
        lat: latitude,
        lng: longitude,
      });
    }
  }, [latitude, longitude]);
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: API_KEY }}
      defaultZoom={11}
      center={data}
      onGoogleApiLoaded={({ map, maps }: any) => renderMarkers(map, maps)}
    />
  );
};

export default MyMapComponent;
