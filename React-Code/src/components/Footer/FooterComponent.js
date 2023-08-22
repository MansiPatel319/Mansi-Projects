/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import '../../assets/css/footer.css';
import { setSignupData } from '../../actions/usersAction';
import { setPreviousPath } from '../../actions/HandlePreviousRoutes';
import { logout } from '../../services/auth';
import { useDispatch } from 'react-redux';

const FooterComponent = ({ auth }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const handleLogoutClick = () => {
    dispatch(setSignupData(null));
    dispatch(setPreviousPath(""));
    logout();
    localStorage.clear();
    history.push("/");
  };
  return (
    <footer>
      <div className="footer-div">
        <div className="container container-1200">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="footer-content-row">
                <div className="row">
                  <div className="col-lg-3 col-md-3">
                    <div className="content-footer-div">
                      <div className="logo-footer">
                        <img src={Logo} className="img-fluid logo-img" alt="logo" />
                      </div>
                      <div className="social-icon-div-root">
                        <ul className="footer-social-ul">
                          <li>
                            <a href="https://www.facebook.com/Creator-Classes-111230130580970/" target='_blank' rel="noreferrer" className="social-link">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="https://www.instagram.com/creatorclasses/" target='_blank' rel="noreferrer" className="social-link">
                              <i className="fab fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-3 col-6">
                    <div className="footer-nav-list-inner">
                      <div className="footer-title-div">
                        <h3>Creator Classes </h3>
                      </div>
                      <ul className="footer-list-ul">
                        {auth ? (
                           <li>
                           <Link onClick={handleLogoutClick} className="link">
                             Log Out
                           </Link>
                         </li>
                        ):(
                        <li>
                          <Link to="/user/login" className="link">
                            Log In
                          </Link>
                        </li>
                        )}
                        
                        <li>
                          {window.location.pathname === '/' ? 
                            (
                              <a href="#our-pricing-plan-section" className="link">
                                Pricing
                              </a>
                            ) : (
                              <Link to="/pricing" className="link">
                                Pricing
                              </Link>
                            )}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-2 col-6">
                    <div className="footer-nav-list-inner">
                      <div className="footer-title-div">
                        <h3>Quick Links </h3>
                      </div>
                      <ul className="footer-list-ul">
                        <li>
                          <Link to="#" className="link">
                            FAQs
                          </Link>
                        </li>
                        <li>
                          <Link to="/privacy-policy" target='_blank' className="link">
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link to="/user-terms-of-service" target='_blank' className="link">
                            Terms of Use
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-4">
                    <div className="footer-nav-list-inner">
                      <div className="footer-title-div">
                        <h3>Keep up to date with our latest news </h3>
                      </div>

                      <div className="mail-bx-div">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Email address" />
                          <div className="abs-bn-right-send">
                            <button className="btn btn-arrow-send">
                              <span className="material-icons"> keyboard_arrow_right </span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="es-box-div">
                        <div className="e-div">
                          <a className="link link-icon-a" href="mailto:Team@creatorclasses.co">
                            <span className="icon-span">
                              <span className="material-icons"> mail_outline </span>
                            </span>
                            <span className="text">team@creatorclasses.co</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="footer-copyright-div">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="footer-copyright-box-root">
                      <p>
                        All rights reserved by {' '}
                        <Link to="#" className="link">
                          CreatorClasses
                        </Link>
                        {' '}&copy; {new Date().getFullYear()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
