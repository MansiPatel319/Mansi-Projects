import React from 'react';
// import { useSelector } from 'react-redux';
import AuthComponent from '../components/Auth/AuthComponent';
import '../assets/css/auth-style.css';
// import getLangValue from '../resources/language';
// import strings from '../resources/strings';
import AuthForgotPasswordComponent from '../components/Auth/AuthForgotPasswordComponent';

function ForgotPassword() {
  // const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <>
      <div id="wrapper" className="wrapper shop-wrapper w-100">
        <AuthComponent
          // headingText2={getLangValue(strings.FORGOT_PASSWORD_1, lang)}
          mainFormComponent={<AuthForgotPasswordComponent />}
          termsLink={false}
        />
      </div>
    </>
  );
}

export default ForgotPassword;
