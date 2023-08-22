import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../../assets/css/header.css';
import Logo from '../../../assets/images/white-icon-logo.svg';
import UserNotificationModalComponent from './UserNotificationModalComponent';
import UserProfileDropdownComponent from './UserProfileDropdownComponent';
import { getUrl } from '../../../network/url';
import { get, post, remove } from '../../../network/requests';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../UI/Loader/Loader';
import { setSignupData } from '../../../actions/usersAction';
import { isAuthenticated } from '../../../services/auth';
import { useHistory } from 'react-router-dom';
import { tokenExpire } from '../../../services/auth';
import { openUserNavbar, setCreatorClassId } from '../../../actions/addDetails';
import useOutsideClick from '../../OutSideClick/ManageOutsideClickClose';
toast.configure();
function UserHomeHeaderComponent({ activeTab, headerClass }) {
  const refOutside = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  // let location = useLocation();
  var favLink="";
  const userData = useSelector((state) => state.authUser.signupData);
  const [isOpen, setIsOpen] = useState(false);
  // const [isPlanPurchased, setisPlanPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animatedHeader, setAnimatedHeader] = useState(false);
  const [isNotificationModal, setisNotificationModal] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  // if(isPlanPurchased){
    favLink="/user-favourites";
  // }
  // else{
  //   favLink=location.pathname;
  // }
  useOutsideClick(refOutside, () => {
    if (isNotificationModal) {
      setisNotificationModal(false);
    }
  });
  const handleOpenNavbar = () => {
    setIsOpen(true);
    dispatch(openUserNavbar(true));
  };
  const handleCloseNavbar = () => {
    setIsOpen(false);
    dispatch(openUserNavbar(false));
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
  // const getPurchasedPlanDetails = () => {
  //   const url = getUrl('user-plan');
  //   get(url, true)
  //     .then((response) => {
  //       const {
  //         data: { code, status, message },
  //       } = response;
  //       switch (code) {
  //         case 200:
  //           if (status === true) {
  //             setisPlanPurchased(true);
  //           }
  //           break;
  //         case 400:
  //           if (message === 'You dont have any active plan!') {
  //             setisPlanPurchased(false);
  //           }
  //           break;
  //         default:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //       }
  //     })
  //     .catch(() => {
  //       // toast.error('Something went wrong', {
  //       //   pauseOnHover: false,
  //       //   position: toast.POSITION.TOP_RIGHT,
  //       // });
  //     });
  // };
  const getUserProfileData = () => {
    const url = getUrl('getUserProfileData');
    return get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;

        switch (code) {
          case 200:
            if (status === true) {
              dispatch(setSignupData(data));
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
        tokenExpire(error.response, history);
      });
  };

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
              getUserNotification();
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

  const getUserNotification = () => {
    const url = getUrl('user-notification');
    get(url, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
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
              getUserNotification();
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

  const handleNotificationClose = () => {
    setisNotificationModal(false);
  };
  const redirectToCreatorClasses = () =>{
    dispatch(setCreatorClassId(null))
    history.push("/user-classes")
  }


  useEffect(() => {
    if (isAuthenticated()) {
      getUserProfileData();
      getUserNotification();
      // getPurchasedPlanDetails();
    }
  }, []);
  return (
    <div>
      <header>
        {isLoading && <Loader />}
        {/* {isNotificationModal && (
          <UserNotificationModalComponent
            handleModalClose={handleNotificationClose}
            notificationData={notificationList}
            handleRemoveAllNotification={handleRemoveAllNotification}
          />
        )} */}
        <div
          className={
            animatedHeader
              ? 'header-div header-div2 clearfix header-bgcolor slideInDown animated'
              : headerClass
          }
        >
          <div className="inner-top-header-div clearfix">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="header-container">
                    <div className="logo-div">
                      <Link className="logo_link clearfix" to="/user-home">
                        <img src={Logo} className="img-fluid logo_img main-logo-icon" alt="logo" />
                        <h1 className="text-logo">
                          {' '}
                          <span className="text-logo-span1">Creator</span>{' '}
                          <span className="text-logo-span2">classes</span>
                        </h1>
                      </Link>
                    </div>

                    <nav className="nav-center-div">
                      <div className="top-nav1">
                        <div
                          className={isOpen ? 'cd-shadow-layer displayblock' : 'cd-shadow-layer'}
                        ></div>
                        <div className="nav-m-bar">
                          <Link
                            to="#"
                            onClick={handleOpenNavbar}
                            className="opennav"
                            data-placement="bottom"
                            title=""
                            data-original-title="Menu"
                          >
                            <i className="menu-bars menu-icon"></i>
                          </Link>
                        </div>

                        <div
                          className={isOpen ? 'nav-div clearfix width80' : 'nav-div clearfix'}
                          id="mySidenav"
                        >
                          <Link className="closebtn" onClick={handleCloseNavbar} to="#">
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
                                <li
                                  className={`${activeTab === 'Home' ? 'active' : ''}`}
                                  style={{ margin: '0 23px 0 0' }}
                                >
                                  <Link to="/user-home" className="nav-link">
                                    Home
                                  </Link>
                                </li>
                                <li
                                  className={`${activeTab === 'Live Streams' ? 'active' : ''}`}
                                  style={{ margin: '0 23px 0 0' }}
                                >
                                  <Link to="/user-live-stream" className="nav-link">
                                    Live
                                  </Link>
                                </li>
                                <li
                                  className={`${activeTab === 'Classes' ? 'active' : ''}`}
                                  style={{ margin: '0 23px 0 0' }}
                                >
                                  <Link onClick={()=>redirectToCreatorClasses()} className="nav-link">
                                    Classes
                                  </Link>
                                </li>
                                <li
                                  className={`${activeTab === 'Instructors' ? 'active' : ''}`}
                                  style={{ margin: '0 23px 0 0' }}
                                >
                                  <Link to="/user-creators" className="nav-link">
                                    Instructors
                                  </Link>
                                </li>
                                <li
                                  className={`${activeTab === 'Materials' ? 'active' : ''}`}
                                  style={{ margin: '0 23px 0 0' }}
                                >
                                  <Link to="/user-material" className="nav-link">
                                    Materials
                                  </Link>
                                </li>
                                {isAuthenticated() && (
                                  <li
                                    className={`header-nav-link ${
                                      activeTab === 'My Purchase' ? 'active' : ''
                                    }`}
                                  >
                                    <Link to="/user-purchase" className="nav-link">
                                      My Purchases
                                    </Link>
                                  </li>
                                )}
                              </ul>
                            </div>

                            {isAuthenticated() ? (
                              <div className="right-side">
                                <div className="right-nf-icon-div">
                                  <div className="icon-row-nf">
                                    <div className="icon-box-nf">
                                      
                                      <Link to={favLink} className="link">
                                        <span className="material-icons material-icons-outlined">
                                          favorite_border
                                        </span>
                                      </Link>
                                    </div>
                                    <div className="icon-box-nf">
                                      <div
                                        ref={refOutside}
                                        className={
                                          isNotificationModal
                                            ? 'dropdown dropdown dropdown-notification-div show'
                                            : 'dropdown dropdown dropdown-notification-div'
                                        }
                                      >
                                        <Link
                                          to="#"
                                          className="btn btn-default dropdown-toggle link"
                                          role="button"
                                          onClick={handleNotificationClick}
                                        >
                                          <i className="bg-custom-icon notifications-icon"></i>
                                          {unreadNotificationCount === 0 ? (
                                            ''
                                          ) : (
                                            <span className="text-count-n">
                                              {unreadNotificationCount}
                                            </span>
                                          )}
                                        </Link>
                                        {isNotificationModal && (
                                          <UserNotificationModalComponent
                                            handleModalClose={handleNotificationClose}
                                            notificationData={notificationList}
                                            handleRemoveAllNotification={
                                              handleRemoveAllNotification
                                            }
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <UserProfileDropdownComponent
                                  userData={userData}
                                  profileLink="/user-profile-setting"
                                />
                              </div>
                            ) : (
                              <div className="right-side">
                                <ul
                                  className={
                                    isOpen ? 'nav ullist-inline opacityon' : 'nav ullist-inline'
                                  }
                                  id="nav-res"
                                  style={{ position: 'absolute' }}
                                >
                                  <li>
                                    <Link
                                      to="/user/login"
                                      className="nav-link login-in-btn login-color2"
                                    >
                                      Log In
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/creator/signup"
                                      className="nav-link login-in-btn login-color2"
                                    >
                                      Signup For creator
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            )}
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
    </div>
  );
}

export default UserHomeHeaderComponent;

UserHomeHeaderComponent.propTypes = {
  activeTab: PropTypes.string,
  headerClass: PropTypes.string,
};
