/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { post } from '../../network/requests';
import { getUrl } from '../../network/urls';
import { tokenExpire } from '../../services/Auth';
import { facebookInitialization } from '../../utils/socialMediaInitialization';

toast.configure();

function AuthSocialLoginComponent() {
  const history = useHistory();
  const lang = useSelector((state) => state.defaultLanguage.lang);

  const statusChangeCallback = async (response) => {
    if (response.status === 'connected') {
      const token = response.authResponse.accessToken;
      const res = await fetch(
        `https://graph.facebook.com/me?fields=cover,email,id,name,first_name,last_name,gender,picture.height(750)&access_token=${token}`,
      );
      const result = await res.json();

      const url = getUrl('sign-in');
      const loginData = JSON.stringify({
        fb_id: result.id,
        fb_name: `${result.first_name} ${result.last_name}`,
        fb_email: result.email,
        fb_image: result.picture.data.url,
        lang,

      });
      post(`${url}`, loginData, false)
        .then((response) => {
          const {
            data: { messages, data, status, code },
          } = response;
          switch (code) {
            case 200:
              if (status === 'true') {
                toast.success(messages, {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
                localStorage.setItem('token', data.user.api_token);
                history.push('/');
                // history.push(`/${lang}/`);
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
          tokenExpire(error.response, history);
        });
    } if (response.status === 'not_authorized') {
      toast.error('Your account is not authorized', {
        pauseOnHover: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error('Your account is not authorized', {
        pauseOnHover: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleFacebookLogin = (e) => {
    e.preventDefault();
    window.FB.login(
      (resp) => {
        statusChangeCallback(resp);
      },
      {
        scope: 'email,',
      },
    );
  };
  useEffect(() => {
    facebookInitialization();
  }, []);

  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
        <div className="social-login-div">
          <ul className="social-login-list">
            <li>
              <Link className="social-link" onClick={handleFacebookLogin}>
                <i className="fab fa-facebook-f" />
              </Link>
            </li>
            {/* <li>
              <Link to="#" className="social-link">
                <span className="bg-custom-icon line-social-icon" />
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AuthSocialLoginComponent;
