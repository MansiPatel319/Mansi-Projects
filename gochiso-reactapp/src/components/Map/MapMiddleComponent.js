import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CategoryFiltersComponent from './CategoryFiltersComponent';
import MapMarkerComponent from './MapMarkerComponent';
import ShopsListingComponent from './ShopsListingComponent';

function MapMiddleComponent() {
  const words = useSelector((state) => state.filterCategory.activeKeywords);
  const sustainKeyword = useSelector(
    (state) => state.sustainKeyword.sustainKeyword,
  );
  const searchInput = useSelector((state) => state.search.query);
  const location = useSelector((state) => state.formattedAddress);
  const lat = useSelector((state) => state.locationLatitude);
  const lng = useSelector((state) => state.locationLongitude);
  const zoom = useSelector((state) => state.zoomLevel.zoomLevel);
  const [showFullMap, setshowFullMap] = useState(false);
  const [categoryData, setcategoryData] = useState(undefined);
  const [sustainData, setsustainData] = useState(undefined);
  const [shopData, setshopData] = useState(undefined);
  const [hoverMarker, sethoverMarker] = useState({});

  const handleMapToggle = () => {
    setshowFullMap(!showFullMap);
  };

  return (
    <div className="main-middle-inner-area">
      <section className="main-map-page-section">
        <div
          className={
            showFullMap ? 'main-map-page-div active' : 'main-map-page-div'
          }
          id="main-map-div"
        >
          <div className="container-fluid p-0">
            <div className="main-map-row">
              <CategoryFiltersComponent
                words={words}
                searchInput={searchInput}
                categoryData={categoryData}
                setcategoryData={(c) => setcategoryData(c)}
                sustainData={sustainData}
                setsustainData={(s) => setsustainData(s)}
                // sustainKeywords={sustainKeywords}
                // setsustainKeywords={(k) => setsustainKeywords(k)}
                sustainKeyword={sustainKeyword}
              />
              <ShopsListingComponent
                words={words}
                searchInput={searchInput}
                shopData={shopData}
                setshopData={(s) => setshopData(s)}
                sustainKeywords={sustainKeyword}
                location={location.formattedAddress}
                lat={lat.locationLatitude}
                lng={lng.locationLongitude}
                zoom={zoom}
                hoverMarker={hoverMarker}
                sethoverMarker={(h) => sethoverMarker(h)}
              />
              <MapMarkerComponent
                shopData={shopData}
                toggle={handleMapToggle}
                zoom={zoom}
                google="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                hoverMarker={hoverMarker}
                sethoverMarker={(s) => sethoverMarker(s)}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MapMiddleComponent;
