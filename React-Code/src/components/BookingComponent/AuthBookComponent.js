import React from 'react';
import { Link } from 'react-router-dom';
import BookLoginComponent from './BookLoginComponent';
import BookSignupComponent from './BookSignupComponent';
import PropTypes from 'prop-types';

const AuthBookComponent = ({ handleSubmitLogin, handleSubmitSignup, handleChangeAuthTab, authTabActive, handleForgotPasswordOpen }) => {
  return (
    <div className="common-body-inner-div">
      <div className="tabs-root-custom">
        <div className="tabs-header">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                onClick={(e) => handleChangeAuthTab(e, 'login')}
                className={authTabActive === 'login' ? 'nav-link active show' : 'nav-link'}
                to="#"
              >
                Log In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={authTabActive === 'signup' ? 'nav-link active show' : 'nav-link'}
                onClick={(e) => handleChangeAuthTab(e, 'signup')}
                to="#"
              >
                SignUp
              </Link>
            </li>
          </ul>
        </div>

        <div className="tabs-body">
          <div className="tab-content">
            <div
              id="login-tab-01"
              className={authTabActive === 'login' ? 'tab-pane fade active show' : 'tab-pane fade'}
            >
              {authTabActive === 'login' && (
                <BookLoginComponent
                  handleSubmitLogin={handleSubmitLogin}
                  handleForgotPasswordOpen={handleForgotPasswordOpen}
                  handleChangeTab={(e) => handleChangeAuthTab(e, 'signup')}
                />
              )}
            </div>
            <div
              id="signup-tab-02"
              className={authTabActive === 'signup' ? 'tab-pane fade active show' : 'tab-pane fade'}
            >
              {authTabActive === 'signup' && (
                <BookSignupComponent
                  handleSubmitSignup={handleSubmitSignup}
                  handleChangeTab={(e) => handleChangeAuthTab(e, 'login')}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBookComponent;
AuthBookComponent.propTypes = {
  handleChangeTabHeader: PropTypes.func,
  handleSubmitLogin: PropTypes.func,
  handleSubmitSignup: PropTypes.func,
  handleChangeAuthTab: PropTypes.func,
  authTabActive: PropTypes.string,
  handleForgotPasswordOpen: PropTypes.func
};
