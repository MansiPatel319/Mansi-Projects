/* eslint-disable react/jsx-fragments */
import React from 'react';
import { useSelector } from 'react-redux';
import '../assets/css/auth-style.css';
import AuthComponent from '../components/Auth/AuthComponent';
import AuthSignUpComponent from '../components/Auth/AuthSignUpComponent';
import getLangValue from '../resources/language';
import strings from '../resources/strings';

function Signup() {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper login-wrapper w-100">
        <AuthComponent
          headingText1={getLangValue(strings.SIGN_UP_1, lang)}
          mainFormComponent={<AuthSignUpComponent />}
          bottomHelpText={getLangValue(strings.HAVE_AN_ACCOUNT, lang)}
          bottomButtonText={getLangValue(strings.SIGN_IN, lang)}
          bottomButtonLink={`/${lang}/login`}
          termsLink
        />
      </div>
    </React.Fragment>
  );
}

export default Signup;
