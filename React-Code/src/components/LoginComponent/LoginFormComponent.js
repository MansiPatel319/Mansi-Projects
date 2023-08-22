import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SocialMediaButtonComponent from '../UI/SocialMediaButtonComponent/SocialMediaButtonComponent';
import InputComponent from '../UI/InputComponent/InputComponent';
import CheckboxComponent from '../UI/CheckboxComponent/CheckboxComponent';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { post } from '../../network/requests';
import { getUrl } from '../../network/url';
import { setPreviousPath } from "../../actions/HandlePreviousRoutes.js";
// import DropDownList from '../UI/DropDownList/DropDownList';
toast.configure();
const LoginFormComponent = ({ isSignup }) => {
  const { slag } = useParams();
  const dispatch = useDispatch();

  let url;
  const history = useHistory();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userNameErr, setUserNameErr] = useState('');
  const [loginPassword, setloginPassword] = useState('');
  const [loginPasswordErr, setloginPasswordErr] = useState('');
  const [stayLoginCheck, setStayLoginCheck] = useState(false);

  const previousRoutes = useSelector((state) => state.PreviousRoutes.previousRoute);
  const handleLoginPasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleInpChange = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case 'userName':
        if (e.target.value === '') {
          setUserNameErr('This field is required');
          setUserName('');
        } else {
          setUserNameErr('');
          setUserName(e.target.value);
        }
        break;
      case 'loginPassword':
        if (e.target.value === '') {
          setloginPasswordErr('This field is required');
          setloginPassword('');
        } else {
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
      setUserNameErr('This field is required');
      isValid = false;
    }
    if (loginPassword === '' || loginPassword.length < 8) {
      setloginPasswordErr('The password is too short it must be 8 character long !');
      isValid = false;
    }
    return isValid;
  };
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = isFormValid();

    if (isValid) {
      const userLoginData = {
        email_or_username: userName,
        password: loginPassword,
      };
      const creatorLoginData = {
        email_or_username: userName,
        password: loginPassword,
      };
      const loginData = slag === 'creator' ? creatorLoginData : userLoginData;
      if (slag === 'creator') {
        url = getUrl('creator_login');
      } else {
        url = getUrl('user_login');
      }
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
                  position: toast.POSITION.TOP_RIGHT,
                });
                localStorage.setItem('token', data.token);
                localStorage.setItem('is_creator', data.is_creator);
                localStorage.setItem('staylogin', stayLoginCheck);
                if (data.is_creator) {
                  localStorage.setItem('creator_username', userName);
                  localStorage.setItem('creator_password', loginPassword);
                  localStorage.setItem('stayloginCreator', stayLoginCheck);
                } else {
                  localStorage.setItem('username', userName);
                  localStorage.setItem('password', loginPassword);
                  localStorage.setItem('stayloginUser', stayLoginCheck);
                }
                localStorage.setItem('userCreatorData', JSON.stringify(data));
                if (data.is_creator) {
                  history.push('/creator-home');
                } else {
                  if (previousRoutes !== "") {
                    history.push(`${previousRoutes}`);
                    dispatch(setPreviousPath(""));
                  }
                  else {
                    if (data.flag_login) {
                      history.push('/select-category-question');
                    } else {
                      history.push('/user-home');
                    }
                  }
                }
              }
              break;
            case 400:
              if (slag === 'creator') {
                toast.error('Invalid Creator Credential', {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
              } else {
                toast.error(message, {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
              }

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
    }
  };
  const handleOnCheckChange = (e) => {
    if (e.target.checked) {
      setStayLoginCheck(e.target.checked);
    } else {
      setStayLoginCheck(false);
    }
  };
  useEffect(() => {
    const stayLogin = localStorage.getItem('stayloginSignup');
    const stayLoginFromLogin = localStorage.getItem('staylogin');
    const stayloginCreator = localStorage.getItem('stayloginCreator');
    const stayloginUser = localStorage.getItem('stayloginUser');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const creatorUsername = localStorage.getItem('creator_username');
    const creatorPassword = localStorage.getItem('creator_password');

    if (stayLogin || stayLoginFromLogin) {
      if (slag === 'creator') {
        if (stayloginCreator !== null && creatorUsername !== null && creatorPassword !== null) {
          if (stayloginCreator === 'true') {
            setStayLoginCheck(stayloginCreator === 'true');
            setUserName(creatorUsername);
            setloginPassword(creatorPassword);
          } else {
            localStorage.removeItem('stayloginCreator');
            setUserName('');
            setloginPassword('');
          }
        } else {
          setUserName('');
          setloginPassword('');
          setStayLoginCheck(false);
          localStorage.removeItem('creator_username');
          localStorage.removeItem('creator_password');
        }
      } else {
        if (stayloginUser !== null && username !== null && password !== null) {
          if (stayloginUser === 'true') {
            setStayLoginCheck(stayloginUser === 'true');
            setUserName(username);
            setloginPassword(password);
          } else {
            localStorage.removeItem('stayloginUser');

            // localStorage.clear();
            setUserName('');
            setloginPassword('');
          }
        } else {
          setUserName('');
          setloginPassword('');
          setStayLoginCheck(false);
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }
      }
    }
    else {
      setUserName('');
      setloginPassword('');
      setStayLoginCheck(false);
    }
  }, [slag]);

  return (
    <>
      <div className="form-auth-root form-general-root">
        <div className="form-root-main">
          <form className="form-root common-form-div">
            <div className="row mlr-8">
              {slag !== 'creator' ? <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <SocialMediaButtonComponent socialBtnName="Log in with Google" socialbtnFacebookName="Log in with Facebook" />
              </div> : ''}
              {slag !== 'creator' ? <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="or-separator-div">
                  {/* <p>or</p> */}
                </div>
              </div> : ''}

              {/* <div className="col-xl-12 col-lg-12 col-md-12 plr-8 mb-3">
                <DropDownList
                  value={selectedLoginOption}
                  onChange={handleLoginOption}
                  options={loginOption}
                  placeholder="Please select Login Option"
                />
              </div> */}
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group mb-30">
                  <label className="label-text" style={{ color: '#fff' }}>
                    Username or email
                  </label>
                  <div className="form-group-control">
                    <InputComponent
                      inputType="text"
                      inputClassName="form-control"
                      inpValue={userName}
                      inputName="userName"
                      inpMaxlength={40}
                      onInputChange={handleInpChange}
                    />
                  </div>
                  <div className={`invalid-feedback ${userNameErr !== '' ? 'd-block' : ''}`}>
                    {userNameErr}
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group mb-30">
                  <label className="label-text" style={{ color: '#fff' }}>
                    Password
                  </label>
                  <div className="form-group-control pass-form-group-control">
                    <InputComponent
                      inputType={passwordVisible ? 'text' : 'password'}
                      inputID="password01"
                      inputClassName="form-control"
                      inpValue={loginPassword}
                      inputName="loginPassword"
                      onInputChange={handleInpChange}
                    />
                    <span className="icon-group pass-icon-group">
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
                  </div>
                  <div className={`invalid-feedback ${loginPasswordErr !== '' ? 'd-block' : ''}`}>
                    {loginPasswordErr}
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <CheckboxComponent
                  checkbocClassName="custom-control-input"
                  checkboxId="remember-me-card"
                  checkboxName="example1"
                  checkbocLabel="Remember me"
                  handleOnChange={handleOnCheckChange}
                  checked={stayLoginCheck}
                />
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="general-form-btn">
                  <div className="general-form-left-btn">
                    <button
                      type="submit"
                      className="btn btn-common-primary mh-btn55 btn-login"
                      onClick={(e) => {
                        handleLoginFormSubmit(e);
                      }}
                    >
                      Log In
                    </button>
                  </div>
                  {isSignup === 'Sign Up' && (
                    <div className="general-form-right-btn">
                      <Link to={`/${slag}/forgot-password`} className="link link-primary-auth">
                        Forgot your password?
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginFormComponent;

LoginFormComponent.propTypes = {
  isSignup: PropTypes.string,
};
