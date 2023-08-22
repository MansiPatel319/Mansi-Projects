import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';
import { get } from '../../network/requests';
import { getUrl } from '../../network/url';
import { tokenExpire } from '../../services/auth';
import '../../assets/css/auth-style.css';
import '../../assets/css/custom-forms-style.css';
import '../../assets/css/feather.min.css';
import bannerImg from '../../assets/images/banner-new-update2x.png';
import siteLogoImg from '../../assets/images/white-icon-logo.svg';
import { useLocation } from 'react-router-dom'

const SignupBannerComponent = (props) => {
  let location = useLocation();
  var eventname="";
  var eventid=""
  if(location.pathname==="/user/signup"){
    eventname="AddToCart";
    eventid="addtocart.13";
  }
  else if(location.pathname==="/creator/signup"){
    eventname="CompleteRegistration";
    eventid="completeregistration.14";
  }

  const userPixelPageviedataAddcart = () => {
    const url = getUrl('PageView');

    var encodeurl=encodeURI(`${url}?eventName=AddToCart&eventUrl=/user/signup`);
    return get(encodeurl, true)
      .then((response) => {
        const {
          data: { code },
        } = response;
        switch (code) {
          case 201:
         
            break;
          case 400:
          
            break;
          default:
           
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };
  const userPixelPageviedataCmpltRegistration = () => {
    const url = getUrl('PageView');
    var encodeurl=encodeURI(`${url}?eventName=CompleteRegistration&eventUrl=/creator/signup`);

    return get(encodeurl, true)
      .then((response) => {
        const {
          data: { code },
        } = response;
        switch (code) {
          case 201:
         
            break;
          case 400:
          
            break;
          default:
           
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };
  useEffect(() => {
    if(location.pathname==="/user/signup"){
      userPixelPageviedataAddcart();
    }
    else if(location.pathname==="/creator/signup")
    userPixelPageviedataCmpltRegistration();
   
  }, []);
  return (
    <>
    <Helmet>
    <script>
   {
     ` !(function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '599100727404477');
    fbq('track', '${eventname}', {eventID: '${eventid}'});`


   }
    </script>
    </Helmet>
    <section className="auth-section" id="login-section">
      <div className="auth-div">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 p-0">
              <div className="auth-root-div">
                <div className="auth-left-side">
                  <div className="auth-banner-div" >
                    <div className="img-thumb">
                      <div className="logo-auth-div" >
                        <div className="logo-div">
                          <Link className="logo_link clearfix" to="/">
                            <img
                              src={siteLogoImg}
                              className="img-fluid logo_img main-logo"
                              alt="logo"
                            />
                            <h1 className="text-logo">
                              <span className="text-logo-span1">Creator </span>
                              <span className="text-logo-span2">classes</span>
                            </h1>
                          </Link>
                        </div>
                      </div>
                      <img src={bannerImg}  className="img-fluid" alt="img" />
                    </div>
                  </div>
               
                </div>
                <div className="auth-right-side">
                  <div className="auth-content-broot-div">
                    <div className="auth-content-div">
                      <div className="auth-top-area-div">
                        <div className="heading-div">
                          <h2>{props.heading}</h2>
                        </div>
                        {props.component}
                      </div>

                      <div className="auth-bottom-area-div">
                        <div className="row mlr-8">
                          <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                            <div className="bottom-row">
                              <div className="bottom-left-bx">
                                {props.linkName !== '/creator/signup' &&
                                  props.linkName !== '/creator/login' ? (
                                  <div className="link-box text-center-reg-side">
                                    <p>
                                      Are you an instructor?
                                      <Link
                                        to="/creator/login"
                                        className="btn btn-link btn-red-link"
                                      >
                                       Log In here

                                      </Link>
                                    </p>
                                  </div>
                                ) : (
                                  <div className="link-box text-center-reg-side">
                                    <p>
                                      Are you a student?
                                      <Link to="/user/login" className="btn btn-link btn-red-link">
                                         Log In  here
                                      </Link>
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="bottom-right-bx">
                                <div className="link-box text-center-reg-side">
                                  <p>
                                  {props.linkName === '/user/signup'&& props.linkText}
                                   

                                    <Link to={props.linkName} className="btn btn-link btn-red-link">
                                      {props.linkName === '/creator/signup'? 'Sign Up' : ''}
                                      
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default SignupBannerComponent;

SignupBannerComponent.propTypes = {
  heading: PropTypes.string,
  linkTextName: PropTypes.string,
  linkName: PropTypes.string,
  linkText: PropTypes.string,
  component: PropTypes.object,
};
