/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import shopFilterOptions from '../../constants/shopFilterOptions';
import useOutsideClick from '../Common/HandleOutSideClickClose';
import CategoryListingComponent from '../Common/CategoryListingComponent';
import DropdownElement from '../../UI/DropdownElement';
import { getUrl } from '../../network/urls';
import { get } from '../../network/requests';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import Loader from '../../UI/Loader/Loader';
// import ButtonElement from '../../UI/ButtonElement';
// import filterMenu from '../../assets/images/icons/filter-menu.png';

toast.configure();
const defaultLatitude = process.env.REACT_APP_DEFAULT_LATITUDE;
const defaultLongitude = process.env.REACT_APP_DEFAULT_LONGITUDE;

function ShopsListingComponent({
  words,
  searchInput,
  location,
  shopData,
  lat,
  lng,
  setshopData,
  sustainKeywords,
  sethoverMarker }) {
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const radius = useSelector((state) => state.radiusLevel.radiusLevel);
  const searchPinLat = useSelector((state) => state.searchPinLatitude);
  const searchPinLng = useSelector((state) => state.searchPinLongitude);
  const [filterplace, setfilterplace] = useState('NA');
  const placetype = useSelector((state) => state.placeKeyword);
  const [dropdownToggle, setdropdownToggle] = useState(false);
  const [selectedOption, setselectedOption] = useState(
    lang === 'en' ? 'Nearest' : '最寄',
  );
  const [page, setpage] = useState(1);
  const [recommended, setrecommended] = useState(0);
  const [newest, setnewest] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const refOutside = useRef(null);
  const getFilteredRestaurantsData = (pageNum, flag) => {
    setisLoading(true);
    const csv1 = words.join(',');
    const csv2 = sustainKeywords.join(',');
    const url = getUrl('restaurant-list');
    return get(
      lat && lng
        ? `${url}lang=${lang}&actionkeywords=${csv1}&shopkeywords=${csv2}&recommended=${recommended}&newest=${newest}&search=${
          searchInput.query === undefined ? '' : searchInput.query
        }&latitude=${searchPinLat.searchPinLatitude}&longitude=${
          searchPinLng.searchPinLongitude
        }&latitude1=${lat}&longitude1=${
          lng
        }&radius=${radius}&pagination=0&storetypes=${filterplace}`
        : `${url}lang=${lang}&actionkeywords=${csv1}&shopkeywords=${csv2}&recommended=${recommended}&newest=${newest}&search=${
          searchInput.query === undefined ? '' : searchInput.query
        }&latitude=${
          searchPinLat.searchPinLatitude === undefined
            ? ''
            : searchPinLat.searchPinLatitude
        }&longitude=${
          searchPinLng.searchPinLongitude === undefined
            ? ''
            : searchPinLng.searchPinLongitude
        }&latitude1=${defaultLatitude}&longitude1=${defaultLongitude}&radius=${radius}&pagination=0&storetypes=${filterplace}`,
      false,
    )
      .then((response) => {
        const {
          data: { messages, data, status, code },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === 'true') {
              if (shopData !== undefined && flag) {
                const arr = [...shopData];
                data.restaurants.data.map((obj) => arr.push(obj));
                setshopData(arr);
              } else {
                setshopData(data.restaurants);
              }
            }
            break;
          case 400:
            toast.error(messages, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(
              lang === 'en'
                ? process.env.REACT_APP_DEFAULT_ERROR_MESSAGE_EN
                : process.env.REACT_APP_DEFAULT_ERROR_MESSAGE_JP,
              {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              },
            );
        }
      })
      .catch((error) => {
        setisLoading(false);
        const { message } = error;
        toast.error(message, {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useOutsideClick(refOutside, () => {
    if (dropdownToggle) {
      setdropdownToggle(false);
    }
  });

  const handleDropdownToggle = () => {
    setdropdownToggle(!dropdownToggle);
  };

  const onLoadMore = () => {
    setpage(page + 1);
  };

  useEffect(() => {
    if (placetype.placeTypekeyword && placetype.placeTypekeyword.length > 0) {
      const data = placetype.placeTypekeyword.filter(
        (item) => item.is_selected,
      );
      if (data) {
        if (data.length === 2) {
          getFilteredRestaurantsData(1);
          setfilterplace('both');
        } else if (data.length === 1) {
          setfilterplace(data[0].lable);
        } else {
          setfilterplace('NA');
        }
      }
    }
  }, [placetype]);
  useEffect(() => {
    getFilteredRestaurantsData(1);
  }, [
    words,
    sustainKeywords,
    selectedOption,
    searchInput.query,
    lng,
    lang,
    recommended,
    newest,
    radius,
    searchPinLng,
    filterplace,
  ]);

  useEffect(() => {
    if (lang === 'en') {
      switch (selectedOption) {
        case 'Recommended':
          setselectedOption('Recommended');
          break;
        case 'Newest':
          setselectedOption('Newest');
          break;
        case 'Nearest':
          setselectedOption('Nearest');
          break;
        case 'おすすめ':
          setselectedOption('Recommended');
          break;
        case '最新':
          setselectedOption('Newest');
          break;
        case '最寄':
          setselectedOption('Nearest');
          break;
        default:
          break;
      }
    }
    if (lang === 'jp') {
      switch (selectedOption) {
        case 'Recommended':
          setselectedOption('おすすめ');
          break;
        case 'Newest':
          setselectedOption('最新');
          break;
        case 'Nearest':
          setselectedOption('最寄');
          break;
        case 'おすすめ':
          setselectedOption('おすすめ');
          break;
        case '最新':
          setselectedOption('最新');
          break;
        case '最寄':
          setselectedOption('最寄');
          break;
        default:
          break;
      }
    }
  }, [lang]);
  return (
    <>
      {isLoading && <Loader />}
      <div className="col-bx shop-product-listing-col">
        <div className="shop-product-listing-div">
          <div className="shop-pro-listing-inner-div wow fadeInUp">
            <div className="shop-pro-list-header-div">
              <div className="shop-pro-list-header-row">
                <div className="shop-pro-list-header-left">
                  <p>
                    {location
                      ? lang === 'en'
                        ? `${getLangValue(
                          strings.MAP_RESTAURANTS_LOCATION,
                          lang,
                        )} ${location}.`
                        : `${location} ${getLangValue(
                          strings.MAP_RESTAURANTS_LOCATION,
                          lang,
                        )}.`
                      : `${getLangValue(strings.MAP_RESTAURANTS_NEAR, lang)}`}
                  </p>
                </div>

                <div className="shop-pro-list-header-right">
                  <DropdownElement
                    refOutside={refOutside}
                    divId="sorting-select"
                    dropdownToggle={dropdownToggle}
                    toggle={handleDropdownToggle}
                    shopFilterOptions={shopFilterOptions}
                    selectedOption={selectedOption}
                    setselectedOption={(s) => setselectedOption(s)}
                    setrecommended={(r) => setrecommended(r)}
                    setnewest={(n) => setnewest(n)}
                  />
                </div>
                {/* <div className="filter-menu-button-div">
                  <button className="filter-menu-button" type="button">
                    <img className="img-fluid" src={filterMenu} />
                  </button>

                </div> */}
              </div>
            </div>

            <div className="shop-pro-list-body-div">
              <div className="shop-pro-list-body-row">
                <div className="shop-listing-box-root">
                  {shopData && shopData.length > 0 ? (
                    <InfiniteScroll
                      dataLength={shopData.length}
                      next={onLoadMore}
                      hasMore
                    >
                      {shopData.map((obj) => (
                        <div
                          className="shop-listing-box wow fadeInUp"
                          data-wow-duration="2s"
                          key={obj.id}
                          onMouseOver={() => sethoverMarker(obj)}
                          onMouseOut={() => sethoverMarker({})}
                        >
                          <div className="shop-listing-row">
                            <CategoryListingComponent
                              shopId={obj.id}
                              imgSrc={obj.cover_image_thumb}
                              catTitle={obj.name}
                              rating={obj.google_ratings}
                              sust_keywords={obj.keywords}
                              shop_keywords={obj.shopkeywords}
                              withDistance
                              distance={obj.distance_k}
                              walk_time={obj.walking_min}
                              cycle_time={obj.bicycle_min}
                              filterplace={obj.storetypes}
                            />
                          </div>
                        </div>
                      ))}
                    </InfiniteScroll>
                  ) : (
                    <>
                      <div className="empty-state-main-div">
                        <div className="empty-state-root-div">
                          <p>
                            <span className="block">
                              {`${getLangValue(
                                strings.NO_RESULTS_FOUND,
                                lang,
                              )}`}
                            </span>
                            <span className="block">
                              {`${getLangValue(
                                strings.PLEASE_MOVE_THE_PIN,
                                lang,
                              )}`}
                            </span>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopsListingComponent;
