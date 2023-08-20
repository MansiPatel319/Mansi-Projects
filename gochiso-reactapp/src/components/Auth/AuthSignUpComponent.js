/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { post } from '../../network/requests';
import { getUrl } from '../../network/urls';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import InputElement from '../../UI/InputElement';
import { validateEmail } from '../../utils/functions';
import AuthSocialLoginComponent from './AuthSocialLoginComponent';
import AuthSubmitButtonComponent from './AuthSubmitButtonComponent';
import Loader from '../../UI/Loader/Loader';

toast.configure();

function AuthSignUpComponent() {
  const history = useHistory();
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const [firstName, setfirstName] = useState('');
  const [firstNameErr, setfirstNameErr] = useState('');
  const [lastName, setlastName] = useState('');
  const [lastNameErr, setlastNameErr] = useState('');
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
      case 'input-firstname':
        if (e.target.value === '') {
          setfirstNameErr(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
          setfirstName('');
        } else {
          setfirstNameErr('');
          setfirstName(e.target.value);
        }
        break;
      case 'input-lastname':
        if (e.target.value === '') {
          setlastNameErr(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
          setlastName('');
        } else {
          setlastNameErr('');
          setlastName(e.target.value);
        }
        break;
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
    if (firstName === '') {
      setfirstNameErr(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      isValid = false;
    }
    if (lastName === '') {
      setlastNameErr(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      isValid = false;
    }
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
      const url = getUrl('sign-up');
      const registerData = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        lang,
        device_type: 'web',
      });
      post(`${url}`, registerData, false)
        .then((response) => {
          const {
            data: { messages, success, code, data },
          } = response;
          setisLoading(false);
          switch (code) {
            case 200:
              if (success === true) {
                localStorage.setItem('token', data.user.api_token);
                toast.success(messages, {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
                // history.push('/login');
                // history.push(`/${lang}/login`);
                history.push(`/${lang}/`);
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
          const {
            data: { messages, code },
          } = error.response;
          setisLoading(false);
          switch (code) {
            case 400:
              toast.error(messages, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              break;
            case 403:
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
        });
    }
  };

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
                    inputName="input-firstname"
                    placeholder={getLangValue(strings.FIRST_NAME, lang)}
                    className="form-control"
                    inputValue={firstName}
                    valueOnChange={handleInputChange}
                  />
                  <span className="custom-icon">
                    <i className="fe fe-user" />
                  </span>
                  {firstNameErr !== '' ? (
                    <div className="invalid-feedback d-block">
                      {firstNameErr}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group-custom form-group-icon">
                  <InputElement
                    divClassName="form-group-control"
                    type="text"
                    inputName="input-lastname"
                    placeholder={getLangValue(strings.LAST_NAME, lang)}
                    className="form-control"
                    inputValue={lastName}
                    valueOnChange={handleInputChange}
                  />
                  <span className="custom-icon">
                    <i className="fe fe-user" />
                  </span>
                  {lastNameErr !== '' ? (
                    <div className="invalid-feedback d-block">
                      {lastNameErr}
                    </div>
                  ) : null}
                </div>
              </div>

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
                    inputName="input-password"
                    type={passwordFieldType}
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

              <AuthSubmitButtonComponent
                buttonText={getLangValue(strings.SIGN_UP_1, lang)}
                onSubmitClick={handleFormSubmit}
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

export default AuthSignUpComponent;
