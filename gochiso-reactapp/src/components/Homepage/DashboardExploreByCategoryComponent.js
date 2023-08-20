/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import ShopCarouselComponent from '../Common/ShopCarouselComponent';
import { getUrl } from '../../network/urls';
import { get } from '../../network/requests';
import setFilterCategoryData from '../../actions/setFilterCategoryData';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import Loader from '../../UI/Loader/Loader';

toast.configure();

const defaultLatitude = process.env.REACT_APP_DEFAULT_LATITUDE;
const defaultLongitude = process.env.REACT_APP_DEFAULT_LONGITUDE;

function CategorySlider({
  splideKey,
  splideClassName,
  divClassName,
  buttonClassName,
  buttonOnClick,
  buttonValue,
  spanIcon,
  showSpanTag,
  spanValue }) {
  return (
    <SplideSlide key={splideKey} className={splideClassName}>
      <div className={divClassName}>
        <button
          type="button"
          className={buttonClassName}
          onClick={buttonOnClick}
        >
          { showSpanTag ? (
            <>
              <span className="icon-img-span">
                <span className={`bg-custom-icon ${spanIcon}-icon`} />
              </span>
              <span className="span-text">{ spanValue}</span>
            </>
          ) : (
            buttonValue
          )}
        </button>
      </div>
    </SplideSlide>
  );
}

function DashboardExploreByCategoryComponent() {
  const dispatch = useDispatch();
  const words = useSelector((state) => state.filterCategory.activeKeywords);
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const searchInput = useSelector((state) => state.search.query);
  const lat = useSelector((state) => state.locationLatitude.locationLatitude);
  const lng = useSelector((state) => state.locationLongitude.locationLongitude);
  const radius = useSelector((state) => state.radiusLevel.radiusLevel);
  const [categoryData, setcategoryData] = useState(undefined);
  const [carouselData, setcarouselData] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);

  const getFilterCategoryData = () => {
    setisLoading(true);
    const url = getUrl('filter-category-list');
    return get(`${url}lang=${lang}&page_id=add-place`, false)
      .then((response) => {
        const {
          data: { messages, data, status, code },
        } = response;
        setisLoading(false);

        switch (code) {
          case 200:
            if (status === 'true') {
              setcategoryData(data.actionkeywords);
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

  const getFilteredRestaurantsData = () => {
    setisLoading(true);
    const csv = words.join(',');
    const url = getUrl('restaurant-list');
    return get(
      lat && lng
        ? `${url}lang=${lang}&actionkeywords=${csv}&search=${
          searchInput.query === undefined ? '' : searchInput.query
        }&latitude=${lat}&longitude=${lng}&radius=${radius}&page_id=home`
        : `${url}lang=${lang}&actionkeywords=${csv}&search=${
          searchInput.query === undefined ? '' : searchInput.query
        }&latitude=${defaultLatitude}&longitude=${defaultLongitude}&radius=${radius}&page_id=home`,
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
              setcarouselData(data.restaurants.data);
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

  const handleCategorySelect = (id) => {
    const updateKeyword = [...words];
    if (!updateKeyword.includes(id)) {
      if (updateKeyword.indexOf(id) === -1) {
        updateKeyword.length = 0;
        updateKeyword.push(id);
      }
    } else {
      const index = updateKeyword.indexOf(id);
      updateKeyword.splice(index, 1);
    }
    dispatch(setFilterCategoryData(updateKeyword));
  };

  useEffect(() => {
    getFilterCategoryData();
  }, [lang]);

  useEffect(() => {
    getFilteredRestaurantsData();
  }, [words, searchInput, lng, lang, radius]);

  return (
    <>
      {isLoading && <Loader />}
      <section className="shops-categories-section">
        <div className="shops-categories-div">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="header-title-div">
                  <div className="row">
                    <div className="col-lg-9 col-md-8">
                      <div className="text-div">
                        <h1>{getLangValue(strings.FEATURE_PLACES, lang)}</h1>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                      <div className="link-div">
                        <Link to={`/${lang}/map`} className="link">
                          {getLangValue(strings.VIEW_ALL, lang)}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="filter-category-root-div">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div
                        className="filter-category-inner"
                        id="filter-category-list"
                      >
                        <Splide
                          className="filter-category-owl"
                          options={{
                            arrows: false,
                            pagination: false,
                            autoWidth: true,
                            autoplay: false,
                          }}
                        >
                          <CategorySlider
                            splideClassName="splide__slide"
                            divClassName={
                              words.length === 0
                                ? 'filter-item active'
                                : 'filter-item'
                            }
                            buttonClassName="filter-link"
                            buttonOnClick={() => dispatch(setFilterCategoryData([]))}
                            buttonValue={getLangValue(strings.ALL, lang)}
                          />

                          {categoryData
                            && categoryData.map((obj) => (
                              <CategorySlider
                                key={obj.id}
                                splideKey={obj.id}
                                splideClassName="splide__slide"
                                divClassName={
                                  words.includes(obj.id)
                                    ? 'filter-item active'
                                    : 'filter-item'
                                }
                                buttonClassName="filter-link"
                                buttonOnClick={() => handleCategorySelect(obj.id)}
                                showSpanTag
                                spanIcon={obj.lable_icon}
                                spanValue={obj.name}
                              />
                            ))}
                        </Splide>
                      </div>
                    </div>
                  </div>
                </div>

                {carouselData && carouselData.length > 0 ? (
                  <div className="category-slider-div">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="category-slider-inner-div">
                          <ShopCarouselComponent
                            className="owl-carousel owl-theme our-classes-owl"
                            id="category-slider-owl"
                            carouselKey={`carousel_${Math.random()}`}
                            items={4}
                            margin={20}
                            smartSpeed={1000}
                            navText={[
                              '<span class="span-roundcircle left-roundcircle"><span class="bg-custom-icon arrow-left-icon"> </span></span>',
                              '<span class="span-roundcircle right-roundcircle"><span class="bg-custom-icon arrow-right-icon"> </span></span>',
                            ]}
                            responsive={{
                              0: {
                                items: 1,
                                slideBy: 1,
                              },
                              600: {
                                items: 2,
                                slideBy: 2,
                              },
                              1200: {
                                items: 3,
                                slideBy: 3,
                              },
                              1600: {
                                items: 4,
                                slideBy: 4,
                              },
                            }}
                            dashboardCarouselData={carouselData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="empty-state-main-div empty-state-home-main-div">
                      <div className="empty-state-root-div">
                        <p>
                          <span className="block">
                            {`${getLangValue(strings.NO_RESULTS_FOUND, lang)}`}
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
      </section>
    </>
  );
}

export default DashboardExploreByCategoryComponent;
