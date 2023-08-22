import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/white-icon-logo.svg';
import '../../assets/css/header.css';
import {useDispatch} from 'react-redux';
import { openUserNavbar } from '../../actions/addDetails';
const HeaderComponent = ({ headerLoginClass }) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [animatedHeader, setAnimatedHeader] = useState(false);
  const handleOpenNavbar = () => {
    setIsOpen(true);
    dispatch(openUserNavbar(true))
  };
  const handleCloseNavbar = () => {
    setIsOpen(false);
    dispatch(openUserNavbar(false))
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
    <header>
      <div
        className={
          animatedHeader
            ? 'header-div clearfix header-bgcolor slideInDown animated'
            : 'header-div clearfix'
        }
      >
        <div className="inner-top-header-div clearfix">
          <div className="container container-1200">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="header-container">
                  <div className="logo-div">
                    <Link className="logo_link clearfix" to="/">
                      <img src={Logo} className="img-fluid logo_img main-logo" alt="logo" />
                      <h1 className="text-logo"> <span className="text-logo-span1">Creator</span> <span className="text-logo-span2">classes</span></h1>
                    </Link>
                  </div>

                  <nav className="nav-center-div">
                    <div className="top-nav1">
                      <div
                        className={isOpen ? 'cd-shadow-layer displayblock' : 'cd-shadow-layer'}
                      ></div>
                      <div className="nav-m-bar">
                        <Link to="#" className="opennav" onClick={handleOpenNavbar}>
                          <i className="menu-bars menu-icon"></i>
                        </Link>
                      </div>
                      <div className={isOpen ? 'nav-div clearfix width80' : 'nav-div clearfix'}>
                        <Link to="#" className="closebtn" onClick={handleCloseNavbar}>
                          &times;
                        </Link>
                        <div className="right-side">
                          <ul
                            className={isOpen ? 'nav ullist-inline opacityon' : 'nav ullist-inline'}
                          >
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
    </header>
  );
};

export default HeaderComponent;
HeaderComponent.propTypes = {
  headerLoginClass: PropTypes.string,
};
