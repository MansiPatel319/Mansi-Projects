/* eslint-disable react/jsx-fragments */
import React from 'react';
import { useSelector } from 'react-redux';
import AuthComponent from '../components/Auth/AuthComponent';
import '../assets/css/auth-style.css';
import AuthLoginComponent from '../components/Auth/AuthLoginComponent';
import getLangValue from '../resources/language';
import strings from '../resources/strings';

function Login() {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper login-wrapper w-100">
        <AuthComponent
          // headingText1={getLangValue(strings.WELCOME_BACK, lang)}
          headingText2={getLangValue(strings.LOGIN, lang)}
          mainFormComponent={<AuthLoginComponent />}
          bottomHelpText={getLangValue(strings.DONT_HAVE_AN_ACCOUNT, lang)}
          bottomButtonText={getLangValue(strings.SIGN_UP_1, lang)}
          bottomButtonLink={`/${lang}/signup`}
          termsLink
        />
      </div>
    </React.Fragment>
  );
}

export default Login;
