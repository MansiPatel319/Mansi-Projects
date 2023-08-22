import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { post } from '../../network/requests';
import { getUrl } from '../../network/url';
import { validateEmail } from '../../utils/functions';
import SocialMediaButtonComponent from '../UI/SocialMediaButtonComponent/SocialMediaButtonComponent';
import ButtonComponent from '../UI/ButtonComponent/ButtonComponent';
import InputComponent from '../UI/InputComponent/InputComponent';
import '../../assets/css/custom-forms-style.css';
import '../../assets/css/auth-style.css';
import { Link } from 'react-router-dom';

toast.configure();
function SignupFormComponent() {
  const history = useHistory();
  const { name } = useParams();
  const { uuid } = useParams();

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
  const [stayLoginCheck, setStayLoginCheck] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameErr, setFirstNameErr] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameErr, setLastNameErr] = useState('');
  const [termsAgreeCheck, setTermsAgreeCheck] = useState(true);
  const [termsAgreeErr, setTermsAgreeErr] = useState('');

  const handlePasswordVisiblity = () => {
    setPwdVisible(!isPwdVisible);
  };
  const handleConfirmPasswordVisiblity = () => {
    setConfirmPwdVisible(!isConfirmPwdVisible);
  };
  // const setCookie = (cname, cvalue, exdays) => {
  //   var d = new Date();
  //   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  //   var expires = 'expires=' + d.toUTCString();
  //   document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  // };
  useEffect(() => {
    if (uuid !== undefined) {
      // setCookie('proCode', uuid, 1);
      localStorage.setItem('proCode', uuid);
    }
  }, []);
  // const getCookie = (cname) => {
  //   var name = cname + '=';
  //   var decodedCookie = decodeURIComponent(document.cookie);
  //   var ca = decodedCookie.split(';');
  //   for (var i = 0; i < ca.length; i++) {
  //     var c = ca[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return '';
  // };
  // const deleteCookie = (name) => {
  //   document.cookie = name + '=;expires=';
  // };
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
          setEmail(e.target.value);
          setEmailErr('Enter valid email');
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
      case 'firstName':
        if (e.target.value === '') {
          setFirstNameErr('First name is required');
          setFirstName('');
        } else {
          setFirstNameErr('');
          setFirstName(e.target.value);
        }
        break;
      case 'lastName':
        if (e.target.value === '') {
          setLastNameErr('Last name is required');
          setLastName('');
        } else {
          setLastNameErr('');
          setLastName(e.target.value);
        }
        break;
      default:
        break;
    }
  };
  const isFormValidation = () => {
    const passwordRegx = new RegExp(/^[0-9]+$/);
    let isValid = true;
    if (username === '') {
      setUserNameErr('This field is required');
      isValid = false;
    }
    if (name === 'creator' && lastName === '') {
      isValid = false;
      setLastNameErr('This field is required');
    }
    if (name === 'creator' && firstName === '') {
      isValid = false;
      setFirstNameErr('This field is required');
    }
    if (userMail === '') {
      setEmailErr('This field is required');
      isValid = false;
    }
    if (!validateEmail(userMail)) {
      setEmailErr('Enter valid e-mail');
      isValid = false;
    }
    if (userPassword === '') {
      setPasswordErr('This field is required');
      isValid = false;
    }
    if (userConfirmPwd === '') {
      setConfirmPwdErr('This field is required');
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
    if (!termsAgreeCheck) {
      isValid = false;
    }
    return isValid;
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    // var affiliationCode = getCookie('proCode');
    let affiliationCode = localStorage.getItem('proCode');
    console.log('affiliationCode', affiliationCode);
    const isValid = isFormValidation();
    if (isValid) {
      if (name === 'user') {
        console.log('affiliationCode', affiliationCode);
        const registerData = new FormData();
        registerData.append('username', username);
        registerData.append('email', userMail);
        registerData.append('password', userPassword);
        registerData.append('confirm_password', userConfirmPwd);
        registerData.append('affiliation_code', affiliationCode);
        // const registerData = JSON.stringify({
        //   username: username,
        //   email: userMail,
        //   password: userPassword,
        //   confirm_password: userConfirmPwd,
        //   affiliation_code: affiliationCode === "" ? null : affiliationCode,
        // });
        const url = getUrl('user_signup');
        signUpAPICall(url, registerData);
      } else {
        const url = getUrl('creator_signup');
        const registerData = JSON.stringify({
          username: username,
          email: userMail,
          password: userPassword,
          confirm_password: userConfirmPwd,
          first_name: firstName,
          last_name: lastName,
        });
        signUpAPICall(url, registerData);
      }
    }
  };

  const signUpAPICall = (url, registerData) => {
    console.log('url', url);
    console.log('registerData', registerData);
    post(`${url}`, registerData)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 201:
            if (status === true) {
              toast.success(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              localStorage.removeItem('proCode');
              localStorage.setItem('stayloginSignup', stayLoginCheck);
              localStorage.setItem('username', username);
              localStorage.setItem('password', userPassword);
              if (!data.is_creator) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', userPassword);
                localStorage.setItem('stayloginUser', stayLoginCheck);
              }
              if (data.is_creator === undefined) {
                localStorage.setItem('creator_username', username);
                localStorage.setItem('creator_password', userPassword);
                localStorage.setItem('stayloginCreator', stayLoginCheck);
              }
              history.push(`/${name}/login`);
              // deleteCookie('proCode');
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

  const handlePageRedirection = (url) => {
    window.open(url);
  };

  const handleOnCheckChange = (e) => {
    if (e.target.checked) {
      setStayLoginCheck(e.target.checked);
    } else {
      setStayLoginCheck(false);
    }
  };

  const handleOnTermsCheckChange = () => {
    if (termsAgreeCheck) {
      setTermsAgreeCheck(false);
      setTermsAgreeErr('Please agree to the terms & condition');
    } else {
      setTermsAgreeCheck(true);
      setTermsAgreeErr('');
    }
  };

  useEffect(() => {
    const stayLogin = localStorage.getItem('stayloginSignup');
    const stayloginCreator = localStorage.getItem('stayloginCreator');
    const stayloginUser = localStorage.getItem('stayloginUser');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const creatorUsername = localStorage.getItem('creator_username');
    const creatorPassword = localStorage.getItem('creator_password');
    if (stayLogin) {
      if (name === 'creator') {
        if (stayloginCreator !== null && creatorUsername !== null && creatorPassword !== null) {
          if (stayloginCreator === 'true') {
            setStayLoginCheck(stayloginCreator === 'true');
            setUserName(creatorUsername);
            setPassword(creatorPassword);
          } else {
            localStorage.removeItem('stayloginCreator');
            setUserName('');
            setPassword('');
          }
        } else {
          setUserName('');
          setPassword('');
          setStayLoginCheck(false);
          localStorage.removeItem('creator_username');
          localStorage.removeItem('creator_password');
        }
      } else {
        if (stayloginUser !== null && username !== null && password !== null) {
          if (stayloginUser === 'true') {
            setStayLoginCheck(stayloginUser === 'true');
            setUserName(username);
            setPassword(password);
          } else {
            localStorage.removeItem('stayloginUser');

            // localStorage.clear();
            setUserName('');
            setPassword('');
          }
        } else {
          setUserName('');
          setPassword('');
          setStayLoginCheck(false);
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }
      }
    } else {
      setUserName('');
      setPassword('');
      setStayLoginCheck(false);
    }
  }, []);
  return (
    <React.Fragment>
      <div className="form-auth-root form-general-root">
        <div className="form-root-main">
          <form className="form-root common-form-div">
            <div className="row mlr-8">
              {name !== 'creator' ? (
                <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                  <SocialMediaButtonComponent
                    socialBtnName="Sign up with Google"
                    socialbtnFacebookName=" Sign up with Facebook"
                  />
                </div>
              ) : (
                ''
              )}
              {name !== 'creator' ? (
                <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                  <div className="or-separator-div">
                    <p>or</p>
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group mb-30">
                  <label className="label-text" style={{ color: '#fff' }}>
                    Full name
                  </label>
                  <div className="form-group-control">
                    <InputComponent
                      inputType="text"
                      inputClassName="form-control"
                      inpRequired
                      inpValue={username}
                      inpMaxlength={40}
                      onInputChange={handleInpChange}
                      inputName="username"
                    />
                  </div>
                  {usernameErr !== '' ? (
                    <div className="invalid-feedback d-block">{usernameErr}</div>
                  ) : null}
                </div>
              </div>
              {name === 'creator' ? (
                <>
                  <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                    <div className="form-group mb-30">
                      <label className="label-text" style={{ color: '#fff' }}>
                        First Name
                      </label>
                      <div className="form-group-control">
                        <InputComponent
                          inputType="text"
                          inputClassName="form-control"
                          inpRequired
                          inpMaxlength={40}
                          inpValue={firstName}
                          onInputChange={handleInpChange}
                          inputName="firstName"
                        />
                      </div>
                      {firstNameErr !== '' ? (
                        <div className="invalid-feedback d-block">{firstNameErr}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                    <div className="form-group mb-30">
                      <label className="label-text" style={{ color: '#fff' }}>
                        Last Name
                      </label>
                      <div className="form-group-control">
                        <InputComponent
                          inpMaxlength={40}
                          inputType="text"
                          inputClassName="form-control"
                          inpRequired
                          inpValue={lastName}
                          onInputChange={handleInpChange}
                          inputName="lastName"
                        />
                      </div>
                      {lastNameErr !== '' ? (
                        <div className="invalid-feedback d-block">{lastNameErr}</div>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : null}
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group mb-30">
                  <label className="label-text" style={{ color: '#fff' }}>
                    Email
                  </label>
                  <div className="form-group-control">
                    <InputComponent
                      inputType="email"
                      inputClassName="form-control"
                      inpValue={userMail}
                      onInputChange={handleInpChange}
                      inputName="userMail"
                    />
                  </div>
                  {userMailErr !== '' ? (
                    <div className="invalid-feedback d-block">{userMailErr}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group mb-30">
                  <label className="label-text" style={{ color: '#fff' }}>
                    Password
                  </label>
                  <div className="form-group-control pass-form-group-control">
                    <InputComponent
                      inputType={isPwdVisible ? 'html' : 'password'}
                      inputID="password02"
                      inputClassName="form-control"
                      inpValue={userPassword}
                      onInputChange={handleInpChange}
                      inputName="userPassword"
                    />
                    <span className="icon-group pass-icon-group">
                      <button
                        type="button"
                        id="show_password02"
                        name="show_password"
                        className="pass-hide password-view-click"
                        onClick={handlePasswordVisiblity}
                      >
                        <span
                          className={`pass-custom-icon material-icons ${
                            isPwdVisible ? 'password-hide' : 'password-view'
                          }`}
                        >
                          {`${isPwdVisible ? 'visibility_off' : 'visibility'}`}
                        </span>
                      </button>
                    </span>
                  </div>

                  {userPasswordErr !== '' ? (
                    <div className="invalid-feedback d-block">{userPasswordErr}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="form-group mb-30">
                  <label className="label-text" style={{ color: '#fff' }}>
                    Confirm Password
                  </label>
                  <div className="form-group-control pass-form-group-control">
                    <InputComponent
                      inputType={isConfirmPwdVisible ? 'html' : 'password'}
                      inputID="password03"
                      inputClassName="form-control"
                      inpValue={userConfirmPwd}
                      onInputChange={handleInpChange}
                      inputName="userConfirmPwd"
                    />
                    <span className="icon-group pass-icon-group">
                      <button
                        type="button"
                        id="show_password03"
                        name="show_password"
                        className="pass-hide password-view-click"
                        onClick={handleConfirmPasswordVisiblity}
                      >
                        <span
                          className={`pass-custom-icon material-icons ${
                            isConfirmPwdVisible ? 'password-hide' : 'password-view'
                          }`}
                        >
                          {`${isConfirmPwdVisible ? 'visibility_off' : 'visibility'}`}
                        </span>
                      </button>
                    </span>
                  </div>
                  {userConfirmPwdErr !== '' ? (
                    <div className="invalid-feedback d-block">{userConfirmPwdErr}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="custom-control custom-checkbox mb-45">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="remember-me-card"
                    name="example1"
                    checked={stayLoginCheck}
                    onChange={handleOnCheckChange}
                  />
                  <label className="custom-control-label" htmlFor="remember-me-card">
                    Remember me
                  </label>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8" style={{ marginBottom: '15px' }}>
                <div className="terms-link">
                  <p>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="agree-terms-card"
                        name="example2"
                        checked={termsAgreeCheck}
                        onChange={handleOnTermsCheckChange}
                      />
                      <label className="custom-control-label" htmlFor="agree-terms-card"></label>
                      <Link className="btn-red">
                        {'By signing up, you agree to Creator Classes’'}
                      </Link>
                      <Link
                        to="#"
                        className="btn-red-link"
                        onClick={() => {
                          name === 'user'
                            ? handlePageRedirection(
                                'http://ccmike.creatorclasses.co/user-terms-of-service',
                              )
                            : handlePageRedirection(
                                'http://ccmike.creatorclasses.co/instructor-terms-of-service',
                              );
                        }}
                      >
                        Terms of Use
                      </Link>
                      <Link className="btn-red">and </Link>
                      <Link
                        to="#"
                        className="btn-red-link"
                        onClick={() => {
                          handlePageRedirection('http://ccmike.creatorclasses.co/privacy-policy');
                        }}
                      >
                        Privacy Policy
                      </Link>
                      {/* <Link className="btn-red">Apply</Link> */}
                    </div>
                  </p>
                  {termsAgreeErr !== '' ? (
                    <div className="invalid-feedback d-block">{termsAgreeErr}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                <div className="general-form-btn">
                  <div className="general-form-left-btn">
                    <ButtonComponent
                      btnName="Sign Up"
                      nameOfClass="btn btn-common-primary mh-btn55 btn-signup"
                      type="submit"
                      handleOnclick={(e) => {
                        handleSubmitForm(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignupFormComponent;
