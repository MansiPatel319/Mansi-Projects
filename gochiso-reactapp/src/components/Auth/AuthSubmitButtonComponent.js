/* eslint-disable react/prop-types */
import React from 'react';

function AuthSubmitButtonComponent({ lowercase, onSubmitClick, buttonText }) {
  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
        <div className="general-form-btn">
          <button
            type="button"
            className={lowercase ? 'btn btn-common-primary btn-login' : 'btn btn-common-primary btn-login'}
            onClick={onSubmitClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
}

export default AuthSubmitButtonComponent;
