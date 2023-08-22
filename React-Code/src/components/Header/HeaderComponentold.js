import React, { useState, useEffect } from 'react';
import '../../assets/css/header.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../assets/images/logo.png';

const HeaderComponent = ({ headerLoginClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animatedHeader, setAnimatedHeader] = useState(false);
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
  return (
    <React.Fragment>
      <header>
        <div
          className={
            animatedHeader
              ? 'header-div clearfix header-bgcolor slideInDown animated'
              : 'header-div clearfix'
          }
        >
          <div className="inner-top-header-div clearfix">
            <div className="container container-1000">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="header-container">
                    <div className="logo-div">
                      <Link className="logo_link clearfix" to="/user-home">
                        <img src={Logo} className="img-fluid logo_img main-logo" alt="logo" />
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
                          <Link
                            to="#"
                            className="closebtn"
                            onClick={handleCloseNavbar}
                          >
                            &times;
                          </Link>
                          <div className="right-side">
                            <ul
                              className={
                                isOpen ? 'nav ullist-inline opacityon' : 'nav ullist-inline'
                              }
                              id="nav-res"
                            >
                              <li>
                                <Link to="/creator/signup" className={headerLoginClass}>
                                  Signup For creator
                                </Link>
                              </li>
                              <li>
                                <Link to="/user/login" className={headerLoginClass}>
                                  Log In
                                </Link>
                              </li>
                            </ul>
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
        {/* <!--  End of header with navigation div  --> */}
      </header>
    </React.Fragment>
  );
};

export default HeaderComponent;

HeaderComponent.propTypes = {
  headerLoginClass: PropTypes.string,
};
