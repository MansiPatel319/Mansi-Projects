/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../assets/css/header.css';
import '../../assets/css/header-update-style.css';
import images from '../../resources/images';
import ImageElement from '../../UI/ImageElement';
import useOutsideClick from '../Common/HandleOutSideClickClose';
import SearchComponent from '../Common/SearchComponent';
import setLanguage from '../../actions/setLanguage';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import { getUrl } from '../../network/urls';
import { get } from '../../network/requests';
import setFilterCategoryData from '../../actions/setFilterCategoryData';
import {
  SetPlaceTypeKyword } from '../../actions/SetPlaceTypeKyword';
import setSustainKeyword from '../../actions/setSustainKeyword';
import CheckboxElement from '../../UI/CheckboxElement';
import { isToken } from '../../utils/functions';
import { tokenExpire } from '../../services/Auth';
import useCheckScreen from '../Common/useCheckScreen';
import Loader from '../../UI/Loader/Loader';
import setUserProfile from '../../actions/setUserData';
import setRedirectPath from '../../actions/addRedirection';

toast.configure();

const LanguageComponent = ({ languageChangeHandler, withMap, lang }) => (
  <div
    className={
      withMap
        ? 'language-mm-inner-div search-category-div'
        : 'language-mm-inner-div'
    }
  >
    <button
      className="btn btn-transparent btn-language-change"
      type="button"
      id="select-language-btn"
      data-toggle="dropdown"
      aria-expanded="true"
      onClick={languageChangeHandler}
    >
      <span className="dropdown-label">
        {lang === 'en' ? '日本語' : 'English'}
      </span>
    </button>
  </div>
);

const WithOutLoginComponent = ({
  languageChangeHandler,
  withMap,
  lang,
  isMobile,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickAddPlace = () => {
    dispatch(setRedirectPath('add-place'));
    history.push(`/${lang}/login`);
  };
  return (
    <ul className="nav ullist-inline" id="nav-res">
      {!isMobile && (
      <li>
        <LanguageComponent
          withMap={withMap}
          languageChangeHandler={languageChangeHandler}
          lang={lang}
        />
      </li>
      )}
      <li>
        <Link onClick={() => onClickAddPlace()} className="btn btn-transparent btn-add-place">
          {getLangValue(strings.ADD_PLACE, lang)}
        </Link>
      </li>
      <li>
        <Link to={`/${lang}/signup`} className="btn-custom-rounded btn-language-change">
          <span className="dropdown-label">
            {getLangValue(strings.SIGN_UP_1, lang)}
          </span>
        </Link>
      </li>
      <li>
        <Link to={`/${lang}/login`} className="btn-custom-rounded btn-login">
          {getLangValue(strings.LOGIN, lang)}
        </Link>
      </li>
    </ul>
  );
};
const WithLoginComponent = ({
  languageChangeHandler,
  withMap,
  lang,
  isMobile,
  profileData,
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const history = useHistory();
  const onLogoutClickHandler = () => {
    tokenExpire(400, history);
    toast.success(getLangValue(strings.SUCCESS_LOGOUT, lang), {
      pauseOnHover: false,
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div className="header-profile-div">
      <div className="user-drop-down">
        <ul className="nav ullist-inline" id="nav-res">
          <li>

            {!isMobile && (
            <LanguageComponent
              withMap={withMap}
              languageChangeHandler={languageChangeHandler}
              lang={lang}
            />
            )}
          </li>
          <li>
            <Link to={`/${lang}/add-place`} className="btn-add-place">
              {getLangValue(strings.ADD_PLACE, lang)}
            </Link>
          </li>

        </ul>

        <div
          className={
            isProfileDropdownOpen
              ? 'dropdown drop-right dropdown-custom-top show'
              : 'dropdown drop-right dropdown-custom-top'
          }
        >
          <Link
            className="btn btn-default dropdown-toggle"
            role="button"
            id="dropdownMenuLink"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div className="user-profile">
              <div className="user-img">
                <ImageElement
                  src={
                    profileData
                    && profileData.user
                    && profileData.user.image_url
                  }
                  className="user-top-image"
                />
              </div>
            </div>
          </Link>
          <div
            className={
              isProfileDropdownOpen ? 'dropdown-menu show' : 'dropdown-menu'
            }
            aria-labelledby="dropdownMenuLink"
          >
            <ul>
              <li>
                <Link className="dropdown-item" to={`/${lang}/profile`}>
                  {getLangValue(strings.MY_PAGE, lang)}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={`/${lang}/community`}>
                  {getLangValue(strings.COMMUNITY, lang)}
                </Link>
              </li>
              <li className="logout-li">
                <Link
                  className="dropdown-item"
                  onClick={() => onLogoutClickHandler()}
                >
                  {getLangValue(strings.LOG_OUT, lang)}
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

function HeaderComponent({ withSearch, withMap }) {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');
  const profileData = useSelector((state) => state.user.profileData);
  const [isLoading, setIsLoading] = useState(false);

  const [categoryData, setcategoryData] = useState(undefined);
  const [sustainData, setsustainData] = useState(undefined);
  const refOutside = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const words = useSelector((state) => state.filterCategory.activeKeywords);
  const sustainKeyword = useSelector(
    (state) => state.sustainKeyword.sustainKeyword,
  );
  const reduxstoremobileplacedata = useSelector(
    (state) => state.placeKeyword.placeTypekeyword,
  );
  // eslint-disable-next-line no-unused-vars
  const [showFilter, setShowfilter] = useState(false);
  const { isMobile } = useCheckScreen();
  const getFilterCategoryData = () => {
    setIsLoading(true);

    const url = getUrl('filter-category-list');
    return get(`${url}lang=${lang}&page_id=add-place`, false)
      .then((response) => {
        const {
          data: { messages, data, status, code },
        } = response;
        setIsLoading(false);

        switch (code) {
          case 200:
            if (status === 'true') {
              setcategoryData(data.actionkeywords);
              setsustainData(data.shopkeywords);
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
        setIsLoading(false);
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

  const handleCheckboxSelect = (id) => {
    const updateCheckKeyword = [...sustainKeyword];
    if (!updateCheckKeyword.includes(id)) {
      if (updateCheckKeyword.indexOf(id) === -1) {
        updateCheckKeyword.push(id);
      }
    } else {
      const indexCheck = updateCheckKeyword.indexOf(id);
      updateCheckKeyword.splice(indexCheck, 1);
    }
    dispatch(setSustainKeyword(updateCheckKeyword));
  };

  const languageChangeHandler = () => {
    dispatch(setLanguage(lang === 'en' ? 'jp' : 'en'));
    const pathArray = window.location.pathname.split('/');
    if (lang === 'en') {
      pathArray[1] = 'jp';
      const newURL = pathArray.join('/');
      history.push(newURL);
    } else {
      pathArray[1] = 'en';
      const newURL = pathArray.join('/');
      history.push(newURL);
    }
  };
  const getProfilePageData = () => {
    setIsLoading(true);
    const url = getUrl('profile-my-page');
    return get(`${url}?lang=${lang}&api_token=${token}`, false)
      .then((response) => {
        const {
          data: { messages, data, status, code },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === 'true') {
              dispatch(setUserProfile(data));
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
        setIsLoading(false);
        const { message } = error;
        toast.error(message, {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleCheckboxSelectPlacetype = (id) => {
    const updatePlaceCheckKeyword = [...reduxstoremobileplacedata];

    updatePlaceCheckKeyword.map((item, i) => {
      if (item.id === id) {
        // eslint-disable-next-line no-param-reassign
        item.is_selected = !item.is_selected;
        if (item.is_selected) {
          updatePlaceCheckKeyword[i] = item;
        } else {
          updatePlaceCheckKeyword[i] = item;
        }
      }

      return item;
    });
    dispatch(SetPlaceTypeKyword(updatePlaceCheckKeyword));
  };
  useEffect(() => {
    getFilterCategoryData();
    if (localStorage.getItem('token')) {
      getProfilePageData();
    }
  }, [lang]);
  useOutsideClick(refOutside, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <>
      {isLoading && <Loader />}
      <header>
        <div
          className={
           withSearch
             ? 'header-div header-full-div clearfix'
             : 'header-div clearfix'
          }
        >
          <div className="inner-top-header-div clearfix">
            <div className={withSearch ? 'container-fluid' : 'container'}>
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="header-container">
                    <div className="logo-div">
                      <Link to={`/${lang}/`} className="logo_link clearfix">
                        <ImageElement
                          src={images.Logo}
                          className="img-fluid logo_img"
                          alt="logo"
                        />
                      </Link>
                    </div>
                    {!showFilter ? (

                      <nav
                        className={
                       withSearch
                         ? 'nav-center-div search-nav-div'
                         : 'nav-center-div no-search-nav-div'
                      }
                      >
                        <div className="top-nav1">
                          <div
                            className={
                            isOpen
                              ? 'cd-shadow-layer displayblock'
                              : 'cd-shadow-layer'
                          }
                          />

                          <div className="nav-m-bar">
                            <Link
                              to="#"
                              onClick={() => setIsOpen(true)}
                              className="opennav"
                              data-placement="bottom"
                              title=""
                              data-original-title="Menu"
                            >
                              <i className="menu-bars menu-icon" />
                            </Link>
                          </div>

                          <div
                            ref={refOutside}
                            className={
                            isOpen
                              ? isToken() ? 'nav-div clearfix width80 nav-with-login-div' : 'nav-div clearfix width80 nav-without-login-div' : isToken() ? 'nav-div clearfix nav-without-login-div' : 'nav-div nav-without-login-div clearfix'
                          }
                            id="mySidenav"
                          >
                            <Link
                              to="#"
                              className="closebtn"
                              onClick={() => setIsOpen(false)}
                            >
                              &times;
                            </Link>
                            {!isToken() && !withSearch ? (
                              <WithOutLoginComponent
                                languageChangeHandler={languageChangeHandler}
                                lang={lang}
                                withMap={withMap}
                                isMobile={isMobile}
                              />
                            ) : (
                              <>
                                {!withSearch && isToken && (
                                <WithLoginComponent
                                  languageChangeHandler={languageChangeHandler}
                                  lang={lang}
                                  withMap={withMap}
                                  isMobile={isMobile}
                                  profileData={profileData}
                                />
                                )}
                              </>
                            )}

                            <div
                              className={
                             withMap
                               ? 'center-mm-div center-mm-lang-div search-category-div'
                               : 'center-mm-div center-mm-lang-div'
                            }
                            >
                              { withSearch && (
                              <>
                                <div className="center-mm-inner-div">
                                  <SearchComponent
                                    className="custom-search-div custom-search-small-div"
                                    placeholder={getLangValue(
                                      strings.HEADER_SEARCH_PLACEHOLDER,
                                      lang,
                                    )}
                                    setIsOpen={() => setIsOpen(false)}
                                  />
                                  {!isToken() ? (
                                    <div className="link-wl-nav-div">
                                      <WithOutLoginComponent
                                        languageChangeHandler={
                                          languageChangeHandler
                                        }
                                        lang={lang}
                                        withMap={withMap}
                                        isMobile={isMobile}
                                      />
                                    </div>
                                  ) : (
                                    <WithLoginComponent
                                      languageChangeHandler={
                                        languageChangeHandler
                                      }
                                      lang={lang}
                                      withMap={withMap}
                                      isMobile={isMobile}
                                      profileData={profileData}
                                    />
                                  )}
                                </div>
                              </>
                              )}
                              {!withMap && isMobile && (
                              <LanguageComponent
                                withMap={withMap}
                                languageChangeHandler={languageChangeHandler}
                                lang={lang}
                              />
                              )}
                            </div>
                            { withSearch && withMap && (
                            <div className="map-menu-custom-category desktop-hidden-mm">
                              <div className="filter-map-div">
                                <div
                                  className="filter-map-inner-div wow fadeInLeft"
                                  data-wow-duration="2s"
                                >
                                  <div className="category-filter-map-box">
                                    <div className="cf-map-box-header-div">
                                      <h2>
                                        {getLangValue(
                                          strings.MAP_CATEGORY,
                                          lang,
                                        )}
                                      </h2>
                                    </div>

                                    <div className="cf-map-box-body-div">
                                      <div className="filter-new-list-div">
                                        <ul className="filter-new-list-ul">
                                          <li
                                            className={
                                              words.length === 0 ? 'active' : ''
                                            }
                                          >
                                            <button
                                              type="button"
                                              className="filter-link"
                                              onClick={() => dispatch(
                                                setFilterCategoryData([]),
                                              )}
                                            >
                                              {getLangValue(strings.ALL, lang)}
                                            </button>
                                          </li>

                                          {categoryData
                                            && categoryData.map((obj) => (
                                              <li
                                                key={obj.id}
                                                className={
                                                  words.includes(obj.id)
                                                    ? 'active'
                                                    : ''
                                                }
                                              >
                                                <button
                                                  type="button"
                                                  className="filter-link"
                                                  onClick={() => handleCategorySelect(obj.id)}
                                                >
                                                  <span className="span-text">
                                                    {obj.name}
                                                  </span>
                                                </button>
                                              </li>
                                            ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="category-ss-map-box">
                                    <div className="cf-map-box-header-div">
                                      <h2>
                                        {getLangValue(
                                          strings.MAP_PLACETYPE,
                                          lang,
                                        )}
                                      </h2>
                                    </div>

                                    <div className="cf-map-box-body-div">
                                      <div className="custom-checkbox-root-div">
                                        {reduxstoremobileplacedata
                                          && reduxstoremobileplacedata.length > 0
                                          && reduxstoremobileplacedata.map(
                                            (obj) => (
                                              <div
                                                key={obj.id}
                                                className="custom-control custom-checkbox custom-checkbox-new"
                                              >
                                                <CheckboxElement
                                                  inputClassName="custom-control-input"
                                                  inputId={obj.id}
                                                  inputName="Placetype"
                                                  checked={obj.is_selected}
                                                  labelClassName="custom-control-label"
                                                  labelHtmlFor={obj.id}
                                                  labelText={getLangValue(obj.name, lang)}
                                                  // labelText={obj.name}
                                                  onSelect={() => handleCheckboxSelectPlacetype(
                                                    obj.id,
                                                  )}
                                                />
                                              </div>
                                            ),
                                          )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="category-ss-map-box">
                                    <div className="cf-map-box-header-div">
                                      <h2>
                                        {getLangValue(
                                          strings.MAP_SUST_CATEGORY,
                                          lang,
                                        )}
                                      </h2>
                                    </div>

                                    <div className="cf-map-box-body-div">
                                      <div className="custom-checkbox-root-div">
                                        {sustainData
                                          && sustainData.map((obj, index) => (
                                            <div
                                              key={obj.id}
                                              className="custom-control custom-checkbox custom-checkbox-new"
                                            >
                                              <CheckboxElement
                                                inputClassName="custom-control-input"
                                                inputId={`custom-checkbox-ss0${
                                                  index + 1
                                                }`}
                                                inputName="sustainability"
                                                labelClassName="custom-control-label"
                                                labelHtmlFor={`custom-checkbox-ss0${
                                                  index + 1
                                                }`}
                                                labelText={obj.name}
                                                onSelect={() => handleCheckboxSelect(obj.id)}
                                              />
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </div>

                                  <LanguageComponent
                                    languageChangeHandler={
                                      languageChangeHandler
                                    }
                                    lang={lang}
                                    withMap={withMap}
                                  />
                                </div>
                              </div>
                            </div>
                            )}
                          </div>
                        </div>
                      </nav>

                    ) : (

                      <nav
                        className={
                       withSearch
                         ? showFilter ? 'nav-center-div search-nav-div show-filter' : 'nav-center-div search-nav-div'
                         : 'nav-center-div no-search-nav-div'
                      }
                      >
                        <div className="top-nav1">
                          {/* <div
                            className={
                            isOpen
                              ? 'cd-shadow-layer displayblock'
                              : 'cd-shadow-layer'
                          }
                          /> */}

                          <div className="nav-m-bar">
                            <Link
                              to="#"
                              onClick={() => setIsOpen(true)}
                              className="opennav"
                              data-placement="bottom"
                              title=""
                              data-original-title="Menu"
                            >
                              <i className="menu-bars menu-icon" />
                            </Link>
                          </div>

                          <div
                            ref={refOutside}
                            className={
                            isOpen
                              ? isToken() ? 'nav-div clearfix width80 nav-with-login-div filter-menu' : 'nav-div clearfix width80 nav-without-login-div  filter-menu' : isToken() ? 'nav-div clearfix nav-without-login-div  filter-menu' : 'nav-div nav-without-login-div clearfix'
                          }
                            id="mySidenav"
                          >
                            <div className="filter-title">
                              <Link
                                to="#"
                                className="closebtn"
                                onClick={() => setIsOpen(false)}
                              >
                                &times;
                              </Link>
                              <h2>Filter</h2>
                            </div>

                            {!isToken() && !withSearch ? (
                              <WithOutLoginComponent
                                languageChangeHandler={languageChangeHandler}
                                lang={lang}
                                withMap={withMap}
                                isMobile={isMobile}
                              />
                            ) : (
                              <>
                                {!withSearch && isToken && (
                                <WithLoginComponent
                                  languageChangeHandler={languageChangeHandler}
                                  lang={lang}
                                  withMap={withMap}
                                  isMobile={isMobile}
                                  profileData={profileData}
                                />
                                )}
                              </>
                            )}

                            <div
                              className={
                             withMap
                               ? 'center-mm-div center-mm-lang-div search-category-div'
                               : 'center-mm-div center-mm-lang-div'
                            }
                            >
                              { withSearch && (
                              <>
                                <div className="center-mm-inner-div">
                                  <SearchComponent
                                    className="custom-search-div custom-search-small-div"
                                    placeholder={getLangValue(
                                      strings.HEADER_SEARCH_PLACEHOLDER,
                                      lang,
                                    )}
                                    setIsOpen={() => setIsOpen(false)}
                                  />
                                  {/* {!isToken() ? (
                                    <div className="link-wl-nav-div">
                                      <WithOutLoginComponent
                                        languageChangeHandler={
                                          languageChangeHandler
                                        }
                                        lang={lang}
                                        withMap={withMap}
                                        isMobile={isMobile}
                                      />
                                    </div>
                                  ) : (
                                    <WithLoginComponent
                                      languageChangeHandler={
                                        languageChangeHandler
                                      }
                                      lang={lang}
                                      withMap={withMap}
                                      isMobile={isMobile}
                                      profileData={profileData}
                                    />
                                  )} */}
                                </div>
                              </>
                              )}
                              {/* {!withMap && isMobile && (
                              <LanguageComponent
                                withMap={withMap}
                                languageChangeHandler={languageChangeHandler}
                                lang={lang}
                              />
                              )} */}
                            </div>
                            { withSearch && withMap && (
                            <div className="map-menu-custom-category desktop-hidden-mm">
                              <div className="filter-map-div">
                                <div
                                  className="filter-map-inner-div wow fadeInLeft"
                                  data-wow-duration="2s"
                                >
                                  <div className="category-filter-map-box">
                                    <div className="cf-map-box-header-div">
                                      <h2>
                                        {getLangValue(
                                          strings.MAP_CATEGORY,
                                          lang,
                                        )}
                                      </h2>
                                    </div>

                                    <div className="cf-map-box-body-div">
                                      <div className="filter-new-list-div">
                                        <ul className="filter-new-list-ul">
                                          <li
                                            className={
                                              words.length === 0 ? 'active' : ''
                                            }
                                          >
                                            <button
                                              type="button"
                                              className="filter-link"
                                              onClick={() => dispatch(
                                                setFilterCategoryData([]),
                                              )}
                                            >
                                              {getLangValue(strings.ALL, lang)}
                                            </button>
                                          </li>

                                          {categoryData
                                            && categoryData.map((obj) => (
                                              <li
                                                key={obj.id}
                                                className={
                                                  words.includes(obj.id)
                                                    ? 'active'
                                                    : ''
                                                }
                                              >
                                                <button
                                                  type="button"
                                                  className="filter-link"
                                                  onClick={() => handleCategorySelect(obj.id)}
                                                >
                                                  <span className="span-text">
                                                    {obj.name}
                                                  </span>
                                                </button>
                                              </li>
                                            ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="category-ss-map-box">
                                    <div className="cf-map-box-header-div">
                                      <h2>
                                        {getLangValue(
                                          strings.MAP_PLACETYPE,
                                          lang,
                                        )}
                                      </h2>
                                    </div>

                                    <div className="cf-map-box-body-div">
                                      <div className="custom-checkbox-root-div">
                                        {reduxstoremobileplacedata
                                          && reduxstoremobileplacedata.length > 0
                                          && reduxstoremobileplacedata.map(
                                            (obj) => (
                                              <div
                                                key={obj.id}
                                                className="custom-control custom-checkbox custom-checkbox-new"
                                              >
                                                <CheckboxElement
                                                  inputClassName="custom-control-input"
                                                  inputId={obj.id}
                                                  inputName="Placetype"
                                                  checked={obj.is_selected}
                                                  labelClassName="custom-control-label"
                                                  labelHtmlFor={obj.id}
                                                  labelText={getLangValue(obj.name, lang)}
                                                  // labelText={obj.name}
                                                  onSelect={() => handleCheckboxSelectPlacetype(
                                                    obj.id,
                                                  )}
                                                />
                                              </div>
                                            ),
                                          )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="category-ss-map-box">
                                    <div className="cf-map-box-header-div">
                                      <h2>
                                        {getLangValue(
                                          strings.MAP_SUST_CATEGORY,
                                          lang,
                                        )}
                                      </h2>
                                    </div>

                                    <div className="cf-map-box-body-div">
                                      <div className="custom-checkbox-root-div">
                                        {sustainData
                                          && sustainData.map((obj, index) => (
                                            <div
                                              key={obj.id}
                                              className="custom-control custom-checkbox custom-checkbox-new"
                                            >
                                              <CheckboxElement
                                                inputClassName="custom-control-input"
                                                inputId={`custom-checkbox-ss0${
                                                  index + 1
                                                }`}
                                                inputName="sustainability"
                                                labelClassName="custom-control-label"
                                                labelHtmlFor={`custom-checkbox-ss0${
                                                  index + 1
                                                }`}
                                                labelText={obj.name}
                                                onSelect={() => handleCheckboxSelect(obj.id)}
                                              />
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* <LanguageComponent
                                    languageChangeHandler={
                                      languageChangeHandler
                                    }
                                    lang={lang}
                                    withMap={withMap}
                                  /> */}
                                </div>
                              </div>
                            </div>
                            )}
                          </div>
                        </div>
                      </nav>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeaderComponent;
