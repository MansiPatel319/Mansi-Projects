import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

function AuthForgotPasswordComponent() {
  const history = useHistory();
  const lang = useSelector((state) => state.defaultLanguage.lang);

  const [email, setemail] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = isFormValidation();
    if (isValid) {
      setIsLoading(true);
      const url = getUrl('forgot-password');
      const forgotPasswordData = JSON.stringify({
        email,
        lang,
        from_app: 'web',
      });
      post(`${url}`, forgotPasswordData, false)
        .then((response) => {
          const {
            data: { messages, status, code },
          } = response;
          setIsLoading(false);
          switch (code) {
            case 200:
              if (status === 'true') {
                toast.success(messages, {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
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

              <AuthSubmitButtonComponent
                buttonText={getLangValue(strings.SEND_RESET_PASSWORD_LINK, lang)}
                onSubmitClick={handleFormSubmit}
                lowercase
              />

            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthForgotPasswordComponent;
