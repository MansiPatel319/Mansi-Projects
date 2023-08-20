/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import AuthLeftBannerComponent from './AuthLeftBannerComponent';
import AuthRightFormComponent from './AuthRightFormComponent';

function AuthComponent(props) {
  return (
    <div className="main-middle-area pt-custom-0">
      <section className="auth-section" id="login-section">
        <div className="auth-div">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 p-0">
                <div className="auth-root-div">
                  <AuthLeftBannerComponent />
                  <AuthRightFormComponent {...props} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AuthComponent;
