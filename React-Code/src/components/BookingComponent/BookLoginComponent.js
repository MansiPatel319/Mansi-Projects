import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputComponent from '../UI/InputComponent/InputComponent';
import PropTypes from 'prop-types';
import { post } from "../../network/requests";
import { getUrl } from "../../network/url";
import { toast } from 'react-toastify';
toast.configure();
const BookLoginComponent = ({ handleSubmitLogin, handleForgotPasswordOpen }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userNameErr, setUserNameErr] = useState('');
  const [loginPassword, setloginPassword] = useState('');
  const [loginPasswordErr, setloginPasswordErr] = useState('');

  const handleInpChange = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case 'userName':
        if (e.target.value === '') {
          setUserNameErr('Username is required');
          setUserName('');
        }
        else {
          setUserNameErr('');
          setUserName(e.target.value);
        }
        break;
      case 'loginPassword':
        if (e.target.value === '') {
          setloginPasswordErr('Password is required');
          setloginPassword('');
        }
        else {
          setloginPasswordErr('');
          setloginPassword(e.target.value);
        }
        break;
      default:
        break;
    }
  };
  const isFormValid = () => {
    let isValid = true;
    if (userName === '') {
      setUserNameErr('Username is required');
      isValid = false;
    }
    if (loginPassword === '' || loginPassword.length < 8) {
      setloginPasswordErr('The password is too short it must be 8 letters long !');
      isValid = false;
    }
    return isValid;
  };
  const handleLoginPasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onHandleLoginForm = async (e) => {
    e.preventDefault();
    const isValid = isFormValid();
    if (isValid) {
      const loginData = {
        email_or_username: userName,
        password: loginPassword,
      };
      const url = getUrl('user_login');
      post(`${url}`, loginData)
        .then((response) => {
          const {
            data: { code, data, status, message },
          } = response;
          switch (code) {
            case 200:
              if (status === true) {
                toast.success(message, {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_LEFT,
                });
                handleSubmitLogin();
                localStorage.setItem('token', data.token);
                localStorage.setItem('is_creator', 'false');
                localStorage.setItem('username', userName);
                localStorage.setItem('password', loginPassword);
              }
              break;
            case 400:
              toast.error(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_LEFT,
              });
              break;
            default:
              toast.error(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_LEFT,

              });
          }
        })
        .catch(() => {
          toast.error('Something went wrong', {
            pauseOnHover: false,
            position: toast.POSITION.TOP_LEFT,
          });
        });
    }
  }
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
                    inpValue={userName}
                    inputName="userName"
                    inpMaxlength={40}
                    onInputChange={handleInpChange}
                  />
                </div>
                {userNameErr !== '' ? (
                  <div style={{ color: 'red', fontSize: '18px', margin: '5px 0px 0 10px' }}>
                    {userNameErr}
                  </div>
                ) : null}
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group-custom form-group-icon">
                  <InputComponent
                    icon="pass-key-icon"
                    iconName="vpn_key"
                    inputType={passwordVisible ? 'text' : 'password'}
                    inputPlaceholder="Password"
                    inputID="password01"
                    inputClassName="form-control"
                    inpValue={loginPassword}
                    inputName="loginPassword"
                    onInputChange={handleInpChange}
                  />
                  <span className="icon-group">
                    <button
                      type="button"
                      id="show_password01"
                      name="show_password"
                      className="pass-hide password-view-click"
                      onClick={handleLoginPasswordVisiblity}
                    >
                      <span
                        className={`pass-custom-icon material-icons ${passwordVisible ? 'password-hide' : 'password-view'
                          }`}
                      >
                        {`${passwordVisible ? 'visibility_off' : 'visibility'}`}
                      </span>
                    </button>
                  </span>
                  {loginPasswordErr !== '' ? (
                    <div style={{ color: 'red', fontSize: '18px', margin: '5px 0px 0 10px' }}>
                      {loginPasswordErr}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <Link to="#" className="btn btn-common-primary btn-signup" onClick={(e) => { onHandleLoginForm(e); }}>Login</Link>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="bottom-row">
                  <div className="link-box text-center-reg-side">
                    {/* <p>
                      Don’t have an account?
                      <Link className="btn btn-link btn-red-link" to="#" onClick={handleChangeTab}>
                        Register now
                      </Link>
                    </p> */}
                  </div>
                  <div className="link-box text-right-side" onClick={() => { handleForgotPasswordOpen(true) }}>
                    <Link to="#" className="btn btn-link btn-forgot">
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <div className="next-box-row">
                  <div className="link-box text-center-side">
                    <Link to="#" className="btn btn-link btn-next-link" onClick={(e) => { onHandleLoginForm(e); }}>
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

export default BookLoginComponent;
BookLoginComponent.propTypes = {
  handleSubmitLogin: PropTypes.func,
  handleChangeTab: PropTypes.func,
  handleForgotPasswordOpen: PropTypes.func
};
