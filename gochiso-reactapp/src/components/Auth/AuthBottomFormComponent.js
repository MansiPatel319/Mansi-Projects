/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import AuthPrivacyTermsComponent from './AuthPrivacyTermsComponent';

function AuthBottomFormComponent({
  bottomHelpText,
  bottomButtonLink,
  bottomButtonText,
  termsLink }) {
  return (
    <>
      <div className="auth-bottom-area-div">
        <div className="row mlr-8">
          <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
            <div className="bottom-row">
              <div className="link-box text-center-reg-side">
                <p>
                  {bottomHelpText}
                  <Link
                    to={bottomButtonLink}
                    className="btn btn-link btn-red-link"
                  >
                    {bottomButtonText}
                  </Link>
                </p>
                {termsLink && (
                  <AuthPrivacyTermsComponent />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthBottomFormComponent;
