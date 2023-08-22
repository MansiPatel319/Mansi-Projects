import React, { useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import '../../../assets/css/all.min.css';
// import GoogleLogin from 'react-google-login';
import { facebookInitialization } from '../../../utils/socialMediaInitialization';
import { toast } from 'react-toastify';
// import { getUrl } from '../../../network/url';
// import { post } from '../../../network/requests';
toast.configure();
const SocialMediaButtonComponent = () => {
  // const history = useHistory();
  // const responseGoogle = (response) => {
  //   if (response && response.accessToken) {
  //     const url = getUrl('user_google_login');
  //     const formData = new FormData();
  //     formData.append('access_token', response.accessToken);
  //     post(`${url}`, formData)
  //       .then((response) => {
  //         const {
  //           data: { key },
  //         } = response;
  //         const Token = `Token ${key}`;
  //         localStorage.setItem('token', Token);
  //         localStorage.setItem('is_creator', 'false');
  //         if (localStorage.getItem('keywordData') === null) {
  //           history.push('/select-category-question');
  //         } else {
  //           history.push('/user-home');
  //         }
  //       })
  //       .catch(() => {
  //         toast.error('Something went wrong', {
  //           pauseOnHover: false,
  //           position: toast.POSITION.TOP_RIGHT,
  //         });
  //       });
  //   }
  // };
  // const responseErrorGoogle = () => {
    // toast.error(err.error, {
    //   pauseOnHover: false,
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  // };
  // const twitterInitialization = () => {
  // eslint-disable-next-line no-undef
  // window.OAuth.initialize(process.env.REACT_APP_TWITTER_APP_ID);
  // window.OAuth.popup('twitter').then((response) => {
  //   console.log('twitter', response);
  // });
  // };
  // const handleFacebookLogin = (e) => {
  //   e.preventDefault();
  //   window.FB.login(
  //     function (resp) {
  //       statusChangeCallback(resp);
  //     },
  //     {
  //       scope: 'email,',
  //     },
  //   );
  // };
  // const statusChangeCallback = (response) => {
  //   if (response.status === 'connected') {
  //     const url = getUrl('user_facebook_login');
  //     const formData = new FormData();
  //     formData.append('access_token', response.authResponse.accessToken);
  //     post(`${url}`, formData)
  //       .then((response) => {
  //         const {
  //           data: { key },
  //         } = response;
  //         const Token = `Token ${key}`;
  //         localStorage.setItem('token', Token);
  //         localStorage.setItem('is_creator', 'false');
  //         if (localStorage.getItem('keywordData') === null) {
  //           history.push('/select-category-question');
  //         } else {
  //           history.push('/user-home');
  //         }
  //       })
  //       .catch(() => {
  //         toast.error('Something went wrong', {
  //           pauseOnHover: false,
  //           position: toast.POSITION.TOP_RIGHT,
  //         });
  //       });
  //   } else if (response.status === 'not_authorized') {
  //     toast.error('Your account is not authorized', {
  //       pauseOnHover: false,
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   } else {
  //     toast.error('Your account is not authorized', {
  //       pauseOnHover: false,
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };
  useEffect(() => {
    facebookInitialization();
  }, []);
  return (
    <React.Fragment>
      <div className="social-button-div">
        <div className="sb-div-row">
          <div className="sb-div">
            {/* <GoogleLogin
              // eslint-disable-next-line no-undef
              clientId={process.env.REACT_APP_GOOGLE_APP_ID}
              render={(renderProps) => (
                <Link
                  to="#"
                  className="btn btn-blck-sb btn-blck-sb-full google-btn"
                  onClick={renderProps.onClick}
                >
                  <span className="img-icon">
                    {' '}
                    <span className="bg-custom-icon google-icon"></span>{' '}
                  </span>
                  <span className="text-div"> {props.socialBtnName} </span>
                </Link>
              )}
              buttonText="Log In"
              onSuccess={responseGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={'single_host_origin'}
            /> */}
          </div>
          <div className="sb-div">
            {/* <Link
              to="#"
              className="btn btn-blck-sb btn-blck-sb-full facebook-btn"
              onClick={handleFacebookLogin}
            >
              <span className="img-icon">
                {' '}
                <span className="bg-custom-icon facebook-icon"></span>{' '}
              </span>
              <span className="text-div">{props.socialbtnFacebookName}</span>
            </Link> */}
          </div>
          {/* <div className="sb-div">
            <Link to="#" className="btn btn-blck-sb btn-blck-sb-full twitter-btn" onClick={twitterInitialization}>
              <span className="img-icon"> <span className="bg-custom-icon twitter-icon"></span> </span>
              <span className="text-div"> Twitter </span>
            </Link>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SocialMediaButtonComponent;

SocialMediaButtonComponent.propTypes = {
  socialBtnName: PropTypes.string,
  socialbtnFacebookName: PropTypes.string,
};
