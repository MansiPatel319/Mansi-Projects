/* eslint-disable react/prop-types */
import React from 'react';
import AuthBottomFormComponent from './AuthBottomFormComponent';
import AuthFormHeadingComponent from './AuthFormHeadingComponent';
import AuthLogoComponent from './AuthLogoComponent';

function AuthRightFormComponent({
  headingText1,
  headingText2,
  mainFormComponent,
  bottomHelpText,
  bottomButtonText,
  bottomButtonLink,
  termsLink }) {
  return (
    <>
      <div className="auth-right-side">
        <div className="auth-content-div">
          <div className="auth-top-area-div">
            <AuthLogoComponent />

            <AuthFormHeadingComponent
              headingText1={headingText1}
              headingText2={headingText2}
            />
            {mainFormComponent}
          </div>
          <AuthBottomFormComponent
            bottomHelpText={bottomHelpText}
            bottomButtonText={bottomButtonText}
            bottomButtonLink={bottomButtonLink}
            termsLink={termsLink}
          />
        </div>
      </div>
    </>
  );
}

export default AuthRightFormComponent;
