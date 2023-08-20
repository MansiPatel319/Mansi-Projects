/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { post } from '../../network/requests';
import { getUrl } from '../../network/urls';
import InputElement from '../../UI/InputElement';
import AuthSubmitButtonComponent from './AuthSubmitButtonComponent';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import { validateEmail } from '../../utils/functions';
import Loader from '../../UI/Loader/Loader';
import { tokenExpire } from '../../services/Auth';

toast.configure();

function AuthResetPasswordComponent() {
  const history = useHistory();
  const { token } = useParams();
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const [email, setemail] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErr, setpasswordErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
  const [passwordFieldType, setpasswordFieldType] = useState('password');
  const [confirmPasswordFieldType, setConfirmPasswordFieldType] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const handlePasswordShowClick = () => {
    if (passwordFieldType === 'password') {
      setpasswordFieldType('html');
    } else {
      setpasswordFieldType('password');
    }
  };
  const handleConfirmPasswordShowClick = () => {
    if (confirmPasswordFieldType === 'password') {
      setConfirmPasswordFieldType('html');
    } else {
      setConfirmPasswordFieldType('password');
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
      case 'input-confirmpassword':
        if (e.target.value === '') {
          setConfirmPasswordErr(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
          setConfirmPassword('');
        } else {
          setConfirmPasswordErr('');
          setConfirmPassword(e.target.value);
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
    if (confirmPassword === '') {
      setConfirmPasswordErr(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      isValid = false;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordErr('password and confirm password must be same', lang);
      isValid = false;
    }
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = isFormValidation();
    if (isValid) {
      setIsLoading(true);
      const url = getUrl('reset-password');
      const resetPasswordData = JSON.stringify({
        email,
        password,
        otp: token,
        lang,
      });
      post(`${url}`, resetPasswordData, false)
        .then((response) => {
          const {
            data: { messages, status, code },
          } = response;
          setIsLoading(false);
          switch (code) {
            case 200:
              if (status === 'true') {
                toast.success(getLangValue(strings.PASSWORD_RESET_SUCCESS, lang), {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
                history.push(`/${lang}/login`);
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
          setIsLoading(false);
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
                <div className="form-group-custom form-group-icon">
                  <InputElement
                    divClassName="form-group-control"
                    id="password01"
                    type={confirmPasswordFieldType}
                    inputName="input-confirmpassword"
                    placeholder={getLangValue(strings.CONFIRM_PASSSWORD, lang)}
                    className="form-control"
                    inputValue={confirmPassword}
                    valueOnChange={handleInputChange}
                  />
                  <span className="custom-icon">
                    <button
                      type="button"
                      id="show_password01"
                      name="show_password"
                      className="pass-hide password-view-click"
                      onClick={handleConfirmPasswordShowClick}
                    >
                      <i
                        className={
                          confirmPasswordFieldType === 'password'
                            ? 'fe fe-eye password-hide'
                            : 'fe fe-eye-off password-view'
                        }
                      />
                    </button>
                  </span>
                  {confirmPasswordErr !== '' ? (
                    <div className="invalid-feedback d-block">
                      {confirmPasswordErr}
                    </div>
                  ) : null}
                </div>
              </div>

              <AuthSubmitButtonComponent
                buttonText={getLangValue(strings.RESET_PASSWORD_1, lang)}
                onSubmitClick={handleFormSubmit}
              />

            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthResetPasswordComponent;
