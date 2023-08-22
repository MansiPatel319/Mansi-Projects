import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUrl } from '../../network/url';
import { get, post, remove } from '../../network/requests';
import Logo from '../../assets/images/white-icon-logo.svg';
import '../../assets/css/header.css';
import useOutsideClick from '../OutSideClick/ManageOutsideClickClose';
import CreatorHeaderNotificationComponent from '../Creator/CreatorHomeComponent/CreatorHeaderNotificationComponent';
import UserProfileDropdownComponent from '../Users/UserHomeHeaderComponent/UserProfileDropdownComponent';
import { toast } from 'react-toastify';
import Loader from '../UI/Loader/Loader';
import { setCreatorData } from '../../actions/usersAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { tokenExpire } from "../../services/auth";
toast.configure();
const CreatorHeader = ({ activeTab }) => {
  const dispatch = useDispatch();
  const refOutside = useRef(null)
  const history = useHistory();
  const creatorData = useSelector((state) => state.authUser.creatoruser);
  const [isOpen, setIsOpen] = useState(false);
  const [animatedHeader, setAnimatedHeader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotificationModal, setisNotificationModal] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const handleOpenNavbar = () => {
    setIsOpen(true);
  };
  const handleCloseNavbar = () => {
    setIsOpen(false);
  };
  const listenScrollEvent = () => {
    if (window.scrollY > 180) {
      setAnimatedHeader(true);
    } else {
      setAnimatedHeader(false);
    }
  };
  useEffect(() => {
    document.addEventListener('scroll', listenScrollEvent);
    return () => {
      document.removeEventListener('scroll', listenScrollEvent);
    };
  }, []);

  const getProfileData = () => {
    setIsLoading(true);
    const url = getUrl('creator_profile');
    get(url, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              dispatch(setCreatorData(data));
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        tokenExpire(error.response, history);
      });
  };
  const getNotificationDetails = () => {
    setIsLoading(true);
    const url = getUrl('get_creator_notifiction');
    get(url, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setNotificationList(data.notifications);
              setUnreadNotificationCount(data.unread_count);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        tokenExpire(error.response, history);
      });
  };
  useEffect(() => {
    getProfileData();
    getNotificationDetails();
  }, []);
  const handleNotificationClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = getUrl('get_read_creator_notifiction');
    post(url, {}, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setisNotificationModal(!isNotificationModal);
              getNotificationDetails();
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        tokenExpire(error.response, history);
      });
  };
  const handleRemoveAllNotification = () => {
    setIsLoading(true);
    const url = getUrl('remove_creator_notifiction');
    remove(url, true)
      .then((res) => {
        const {
          data: { code, status, message },
        } = res;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              getNotificationDetails();
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        tokenExpire(error.response, history);
      });
  };
  useOutsideClick(refOutside, () => {
    if (isNotificationModal) {
      setisNotificationModal(false);
    }
  });
  const handleNotificationClose = () => {
    setisNotificationModal(false);
  };
  return (
    <header>
      {isLoading && <Loader />}
      <div className="header-div header-div2 clearfix">
        <div
          className={
            animatedHeader
              ? 'header-div header-div2 clearfix header-bgcolor slideInDown animated'
              : "inner-top-header-div clearfix"
          }
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="header-container">
                  <div className="logo-div">
                    <Link className="logo_link clearfix" to="#">
                      <img src={Logo} className="img-fluid logo_img main-logo-icon" alt="logo" />
                      <h1 className="text-logo"> <span className="text-logo-span1">Creator</span> <span className="text-logo-span2">classes</span></h1>
                    </Link>
                  </div>

                  <nav className="nav-center-div">
                    <div className="top-nav1">
                      <div
                        className={isOpen ? 'cd-shadow-layer displayblock' : 'cd-shadow-layer'}
                      ></div>
                      <div className="nav-m-bar">
                        <Link onClick={handleOpenNavbar} className="opennav" to="#">
                          <i className="menu-bars menu-icon"></i>
                        </Link>
                      </div>

                      <div
                        className={isOpen ? 'nav-div clearfix width80' : 'nav-div clearfix'}
                        id="mySidenav"
                      >
                        <Link to="#" className="closebtn" onClick={handleCloseNavbar}>
                          &times;
                        </Link>

                        <div className="row-nav-div">
                          <div className="left-side">
                            <ul
                              className={
                                isOpen ? 'nav ullist-inline opacityon' : 'nav ullist-inline'
                              }
                              id="nav-res"
                            >
                              <li className={`${activeTab === 'Home' ? 'active' : ''}`}>
                                <Link to="/creator-home" className="nav-link">
                                  Home
                                </Link>
                              </li>
                              <li className={`${activeTab === 'My Uploads' ? 'active' : ''}`}>
                                <Link to="/creator-my-uploads/classes" className="nav-link">
                                  My Uploads
                                </Link>
                              </li>
                              <li className={`${activeTab === 'My Earnings' ? 'active' : ''}`}>
                                <Link to="/creator-my-earnings" className="nav-link">
                                  My Earnings
                                </Link>
                              </li>
                              <li className={`${activeTab === 'Transfer funds' ? 'active' : ''}`}>
                                <Link to="/creator-transfer-funds" className="nav-link">
                                  Transfer funds
                                </Link>
                              </li>
                              {/* <li className={`${activeTab === 'Affilliate' ? 'active' : ''}`}>
                                <Link to="/creator-affilliate/users" className="nav-link">
                                  Affilliate
                                </Link>
                              </li> */}
                            </ul>
                          </div>

                          <div className="right-side creator-right-side">
                            {/*  */}
                            <div className="right-nf-icon-div">
                              <div className="icon-row-nf">
                                <div className="icon-box-nf">
                                  <div ref={refOutside} className={`dropdown dropdown dropdown-notification-div ${isNotificationModal ? 'show' : ''}`}>
                                    <Link className="btn btn-default dropdown-toggle link" to="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded={`${isNotificationModal ? 'true' : 'false'}`} onClick={handleNotificationClick}>
                                      <i className="bg-custom-icon notifications-icon"></i> {unreadNotificationCount === 0 ? (
                                        ''
                                      ) : (
                                        <span className="text-count-n">
                                          {unreadNotificationCount}
                                        </span>
                                      )}
                                    </Link>
                                    {isNotificationModal && (
                                      <CreatorHeaderNotificationComponent
                                        handleModalClose={handleNotificationClose}
                                        notificationList={notificationList}
                                        handleRemoveAllNotification={handleRemoveAllNotification}
                                      />
                                    )}
                                  </div>
                                  {/* <Link to="#" className="link" onClick={handleNotificationClick}>
                                    <span className="material-icons">notifications</span>
                                    {unreadNotificationCount === 0 ? (
                                      ''
                                    ) : (
                                      <span className="text-count-n">
                                        {unreadNotificationCount}
                                      </span>
                                    )}
                                  </Link> */}
                                </div>
                              </div>
                            </div>
                            <UserProfileDropdownComponent
                              profileLink="/creator-profile-setting"
                              userData={creatorData}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CreatorHeader;

CreatorHeader.propTypes = {
  activeTab: PropTypes.string,
};
