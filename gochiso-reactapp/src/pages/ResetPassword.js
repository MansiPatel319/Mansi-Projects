/* eslint-disable react/jsx-fragments */
import React from 'react';
import { useSelector } from 'react-redux';
import AuthComponent from '../components/Auth/AuthComponent';
import '../assets/css/auth-style.css';
import getLangValue from '../resources/language';
import strings from '../resources/strings';
import AuthResetPasswordComponent from '../components/Auth/AuthResetPasswordComponent';

function Login() {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper login-wrapper w-100">
        <AuthComponent
          headingText2={getLangValue(strings.RESET_PASSWORD, lang)}
          mainFormComponent={<AuthResetPasswordComponent />}
          termsLink
        />
      </div>
    </React.Fragment>
  );
}

export default Login;
