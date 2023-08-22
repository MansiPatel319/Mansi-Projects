import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUrl } from '../../network/url';
import { post } from '../../network/requests';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/functions';
import InputComponent from '../UI/InputComponent/InputComponent';
toast.configure();
const BookSignupComponent = ({ handleSubmitSignup, handleChangeTab }) => {
  const [isPwdVisible, setPwdVisible] = useState(false);
  const [isConfirmPwdVisible, setConfirmPwdVisible] = useState(false);
  const [username, setUserName] = useState('');
  const [usernameErr, setUserNameErr] = useState('');
  const [userMail, setEmail] = useState('');
  const [userMailErr, setEmailErr] = useState('');
  const [userPassword, setPassword] = useState('');
  const [userPasswordErr, setPasswordErr] = useState('');
  const [userConfirmPwd, setConfirmPwd] = useState('');
  const [userConfirmPwdErr, setConfirmPwdErr] = useState('');

  const handlePasswordVisiblity = () => {
    setPwdVisible(!isPwdVisible);
  };
  const handleConfirmPasswordVisiblity = () => {
    setConfirmPwdVisible(!isConfirmPwdVisible);
  };
  const onHandleSubmitSignupForm = () => {
    const isValid = isFormValidation();
    if (isValid) {
      const registerData = JSON.stringify({
        username: username,
        email: userMail,
        password: userPassword,
        confirm_password: userConfirmPwd,
      });
      const url = getUrl('user_signup');
      signUpAPICall(url, registerData);
    }
  };
  const signUpAPICall = (url, registerData) => {
    post(`${url}`, registerData)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        switch (code) {
          case 201:
            if (status === true) {
              toast.success(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              localStorage.setItem('username', username);
              localStorage.setItem('password', userPassword);
              handleSubmitSignup();
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch(() => {
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const isFormValidation = () => {
    const passwordRegx = new RegExp(/^[0-9]+$/);
    let isValid = true;
    if (username === '') {
      setUserNameErr('Username is required');
      isValid = false;
    }
    if (userMail === '') {
      setEmailErr('E-mail is required');
      isValid = false;
    } else if (!validateEmail(userMail)) {
      setEmailErr('Enter valid e-mail');
      isValid = false;
    }
    if (userPassword === '') {
      setPasswordErr('Password is required');
      isValid = false;
    }
    if (userConfirmPwd === '') {
      setConfirmPwdErr('Confirm password is required');
      isValid = false;
    }
    if (userPassword !== '' && userPassword.length < 8) {
      isValid = false;
      setPasswordErr('The password is too short it must be 8 character long ! ');
    } else if (passwordRegx.test(userPassword)) {
      isValid = false;
      setPasswordErr('The password is entirely numeric !');
    }
    if (userConfirmPwd !== '' && userConfirmPwd.length < 8) {
      isValid = false;
      setConfirmPwdErr('The password is too short it must be 8 character long ! ');
    } else if (passwordRegx.test(userPassword)) {
      isValid = false;
      setConfirmPwdErr('The password is entirely numeric !');
    }
    if (userPassword !== '' && userConfirmPwd !== '') {
      if (userPassword !== userConfirmPwd) {
        isValid = false;
        setConfirmPwdErr("Passwords don't match");
      }
    }
    return isValid;
  };
  const handleInpChange = (e) => {
    switch (e.target.name) {
      case 'username':
        if (e.target.value === '') {
          setUserNameErr('Username is required');
          setUserName('');
        } else {
          setUserNameErr('');
          setUserName(e.target.value);
        }
        break;
      case 'userMail':
        if (e.target.value === '') {
          setEmailErr('E-mail is required');
          setEmail('');
        } else if (!validateEmail(e.target.value)) {
          setEmailErr('Enter valid e-mail');
          setEmail(e.target.value);
        } else {
          setEmailErr('');
          setEmail(e.target.value);
        }
        break;
      case 'userPassword':
        if (e.target.value === '') {
          setPasswordErr('Password is required');
          setPassword('');
        } else {
          setPasswordErr('');
          setPassword(e.target.value);
        }
        break;
      case 'userConfirmPwd':
        if (e.target.value === '') {
          setConfirmPwdErr('Confirm password is required');
          setConfirmPwd('');
        } else {
          setConfirmPwdErr('');
          setConfirmPwd(e.target.value);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="tab-pane-inner">
      <div className="form-ls-root">
        <div className="form-root-main">
          <form className="form-root">
            <div className="row mlr-8">
         

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group-custom form-group-icon">
                  <InputComponent
                    icon="user-rounded-icon"
                    iconName="account_circle"
                    inputType="text"
                    inputPlaceholder="Username or email"
                    inputClassName="form-control"
                    inpRequired
                    inpValue={username}
                    inpMaxlength={40}
                    onInputChange={handleInpChange}
                    inputName="username"
                  />
                </div>
                {usernameErr !== '' ? (
                  <div style={{ color: 'red', fontSize: '18px', margin: '5px 0px 0 10px' }}>
                    {usernameErr}
                  </div>
                ) : null}
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group-custom form-group-icon">
                  <InputComponent
                    icon="user-rounded-icon"
                    iconName="mail"
                    inputType="text"
                    inputPlaceholder="e-mail"
                    inputClassName="form-control"
                    inpValue={userMail}
                    onInputChange={handleInpChange}
                    inputName="userMail"
                  />
                </div>
                {userMailErr !== '' ? (
                  <div style={{ color: 'red', fontSize: '18px', margin: '5px 0px 0 10px' }}>
                    {userMailErr}
                  </div>
                ) : null}
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group-custom form-group-icon">
                  <InputComponent
                    icon="pass-key-icon"
                    iconName="vpn_key"
                    inputType={isPwdVisible ? 'html' : 'password'}
                    inputPlaceholder="Password"
                    inputID="password02"
                    inputClassName="form-control"
                    inpValue={userPassword}
                    onInputChange={handleInpChange}
                    inputName="userPassword"
                  />

                  <span className="icon-group">
                    <button
                      type="button"
                      id="show_password02"
                      name="show_password"
                      className="pass-hide password-view-click"
                      onClick={handlePasswordVisiblity}
                    >
                      <span
                        className={`pass-custom-icon material-icons ${isPwdVisible ? 'password-hide' : 'password-view'
                          }`}
                      >
                        {`${isPwdVisible ? 'visibility_off' : 'visibility'}`}
                      </span>
                    </button>
                  </span>
                  {userPasswordErr !== '' ? (
                    <div style={{ color: 'red', fontSize: '18px', margin: '5px 0px 0 10px' }}>
                      {userPasswordErr}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group-custom form-group-icon">
                  <InputComponent
                    icon="pass-key-icon"
                    iconName="vpn_key"
                    inputType={isConfirmPwdVisible ? 'html' : 'password'}
                    inputPlaceholder="Confirm Password"
                    inputID="password03"
                    inputClassName="form-control"
                    inpValue={userConfirmPwd}
                    onInputChange={handleInpChange}
                    inputName="userConfirmPwd"
                  />
                  <span className="icon-group">
                    <button
                      type="button"
                      id="show_password03"
                      name="show_password"
                      className="pass-hide password-view-click"
                      onClick={handleConfirmPasswordVisiblity}
                    >
                      <span
                        className={`pass-custom-icon material-icons ${isConfirmPwdVisible ? 'password-hide' : 'password-view'
                          }`}
                      >
                        {`${isConfirmPwdVisible ? 'visibility_off' : 'visibility'}`}
                      </span>
                    </button>
                  </span>
                  {userConfirmPwdErr !== '' ? (
                    <div style={{ color: 'red', fontSize: '18px', margin: '5px 0px 0 10px' }}>
                      {userConfirmPwdErr}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <Link
                  to="#"
                  className="btn btn-common-primary btn-signup"
                  onClick={onHandleSubmitSignupForm}
                >
                  Sign Up
                </Link>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="bottom-row">
                  <div className="link-box text-center-reg-side">
                    <p>
                      Have an account?
                      <Link
                        to="#login-tab-01"
                        className="btn btn-link btn-red-link"
                        onClick={handleChangeTab}
                      >
                        Log In
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="next-box-row">
                  <div className="link-box text-center-side">
                    <Link
                      to="#login-tab-01"
                      className="btn btn-link btn-next-link disable"
                      onClick={handleChangeTab}
                    >
                      {'Next>>'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookSignupComponent;
BookSignupComponent.propTypes = {
  handleSubmitSignup: PropTypes.func,
  handleChangeTab: PropTypes.func,
};
