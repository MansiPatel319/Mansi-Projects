import React from 'react';
import { Link } from 'react-router-dom';
import whiteLogo from '../../assets/images/white-icon-logo.svg';
import '../../assets/css/footer.css';

const FooterComponent = () => {
  return (
    <footer>
      <div className="footer-inner-div">
        <div className="container container-1200">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="footer-content-row">
                <div className="row">
                  <div className="col-lg-4 col-md-4 fn-order01">
                    <div className="content-footer-div">
                      <div className="logo-footer">
                        <Link className="logo_link clearfix" to="/">
                          <img src={whiteLogo} className="img-fluid logo_img main-logo" alt="logo" />
                          <h1 className="text-logo"> <span className="text-logo-span1">Creator</span> <span className="text-logo-span2">classes</span></h1>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 fn-order02">
                    <div className="footer-copyright-div">
                      <div className="footer-copyright-box-root">
                        <p> <Link to="#" className="link">CreatorClases</Link> &copy; {new Date().getFullYear()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 fn-order03">
                    <div className="content-footer-div">
                      <div className="social-icon-div-root">
                        <ul className="footer-social-ul">
                          <li>
                            <Link to="#" className="social-link facebook-link">
                              <i className="fab fa-facebook-f"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="social-link"><i className="fab fa-instagram"></i></Link>
                          </li>
                          <li>
                            <Link to="#" className="social-link"><i className="fab fa-twitter"></i></Link>
                          </li>
                          <li>
                            <Link to="#" className="social-link"><i className="fab fa-youtube"></i></Link>
                          </li>
                        </ul>
                      </div>
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
