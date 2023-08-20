/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { post } from '../../network/requests';
import { getUrl } from '../../network/urls';
import AuthSocialLoginComponent from './AuthSocialLoginComponent';
import InputElement from '../../UI/InputElement';
import AuthSubmitButtonComponent from './AuthSubmitButtonComponent';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import CheckboxElement from '../../UI/CheckboxElement';
import { validateEmail } from '../../utils/functions';
import Loader from '../../UI/Loader/Loader';
import setRedirectPath from '../../actions/addRedirection';
import { tokenExpire } from '../../services/Auth';

toast.configure();

function AuthLoginComponent() {
  const history = useHistory();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const redirectionPath = useSelector((state) => state.redirection.path);
  const [rememberMe, setrememberMe] = useState(false);
  const [email, setemail] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [password, setpassword] = useState('');
  const [passwordErr, setpasswordErr] = useState('');
  const [passwordFieldType, setpasswordFieldType] = useState('password');
  const [isLoading, setisLoading] = useState(false);
  const handlePasswordShowClick = () => {
    if (passwordFieldType === 'password') {
      setpasswordFieldType('html');
    } else {
      setpasswordFieldType('password');
    }
  };

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case 'input-email':
        if (e.target.value === '') {
          setemailErr(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
          setemail('');
        } else if (!validateEmail(e.target.value)) {
          setemail(e.target.value);
          setemailErr(getLangValue(strings.ERR_VALID_EMAIL, lang));
        } else {
          setemailErr('');
          setemail(e.target.value);
        }
        break;
      case 'input-password':
        if (e.target.value === '') {
          setpasswordErr(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
          setpassword('');
        } else {
          setpasswordErr('');
          setpassword(e.target.value);
        }
        break;
      default:
        break;
    }
  };

  const isFormValidation = () => {
    let isValid = true;
    if (email === '') {
      setemailErr(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      isValid = false;
    }
    if (!validateEmail(email)) {
      setemailErr(getLangValue(strings.ERR_VALID_EMAIL, lang));
      isValid = false;
    }
    if (password === '') {
      setpasswordErr(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      isValid = false;
    }
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = isFormValidation();
    if (isValid) {
      setisLoading(true);
      const url = getUrl('sign-in');
      const loginData = JSON.stringify({
        email,
        password,
        lang,
      });
      post(`${url}`, loginData, false)
        .then((response) => {
          const {
            data: { messages, data, status, code },
          } = response;
          setisLoading(false);
          switch (code) {
            case 200:
              if (status === 'true') {
                toast.success(messages, {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
                localStorage.setItem('token', data.user.api_token);
                if (rememberMe) {
                  localStorage.setItem('rememberMe', rememberMe);
                  localStorage.setItem('email', btoa(email));
                  localStorage.setItem('password', btoa(password));
                }
                // history.push('/');
                if (redirectionPath === null) {
                  history.push(`/${lang}/`);
                } else {
                  history.push(redirectionPath);
                  setTimeout(() => {
                    dispatch(setRedirectPath(null));
                  }, 2000);
                }
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
          setisLoading(false);
        });
    }
  };

  useEffect(() => {
    const localRememberMe = localStorage.getItem('rememberMe');
    const localEmail = localStorage.getItem('email');
    const localPassword = localStorage.getItem('password');
    if (localRememberMe === 'true') {
      setrememberMe(localRememberMe === 'true');
      setemail(atob(localEmail));
      setpassword(atob(localPassword));
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="form-auth-root">
        <div className="form-root-main">
          <form className="form-root">
            <div className="row mlr-8">
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group-custom form-group-icon">
                  <InputElement
                    divClassName="form-group-control"
                    type="text"
                    inputName="input-email"
                    placeholder={getLangValue(strings.USERNAME_OR_EMAIL, lang)}
                    className="form-control"
                    inputValue={email}
                    valueOnChange={handleInputChange}
                    showPostIcon
                    postIconParentClassName="custom-icon"
                    postIconChildClassName="material-icons-outlined user-rounded-icon"
                    postIconValue="mail_outline"
                  />
                  {emailErr !== '' ? (
                    <div className="invalid-feedback d-block">{emailErr}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group-custom form-group-icon">
                  <InputElement
                    divClassName="form-group-control"
                    id="password01"
                    type={passwordFieldType}
                    inputName="input-password"
                    placeholder={getLangValue(strings.PASSWORD, lang)}
                    className="form-control"
                    inputValue={password}
                    valueOnChange={handleInputChange}
                  />
                  <span className="custom-icon">
                    <button
                      type="button"
                      id="show_password01"
                      name="show_password"
                      className="pass-hide password-view-click"
                      onClick={handlePasswordShowClick}
                    >
                      <i
                        className={
                          passwordFieldType === 'password'
                            ? 'fe fe-eye password-hide'
                            : 'fe fe-eye-off password-view'
                        }
                      />
                    </button>
                  </span>
                  {passwordErr !== '' ? (
                    <div className="invalid-feedback d-block">
                      {passwordErr}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-auth-forgot-div">
                  <div className="custom-control custom-checkbox">
                    <CheckboxElement
                      inputClassName="custom-control-input"
                      inputId="remember-me-su"
                      inputName="example1"
                      onSelect={() => setrememberMe(!rememberMe)}
                      labelClassName="custom-control-label"
                      labelHtmlFor="remember-me-su"
                      labelText={getLangValue(strings.REMEMBER_ME, lang)}
                    />
                  </div>

                  <div className="forgot-link-div">
                    <Link to={`/${lang}/forgot-password`} className="link">
                      {`${getLangValue(strings.FORGOT_PASSWORD, lang)}?`}
                    </Link>
                  </div>
                </div>
              </div>

              <AuthSubmitButtonComponent
                buttonText={getLangValue(strings.LOGIN, lang)}
                onSubmitClick={handleFormSubmit}
                lowercase
              />

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="or-separator-div">
                  <p>
                    <span className="txt">
                      {getLangValue(strings.OR, lang)}
                    </span>
                  </p>
                </div>
              </div>
              <AuthSocialLoginComponent />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthLoginComponent;
