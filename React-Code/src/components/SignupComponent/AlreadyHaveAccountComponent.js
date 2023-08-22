import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/auth-style.css';

function AlreadyHaveAccountComponent() {
  return (
    <div className="auth-bottom-area-div">
      <div className="row mlr-8">
        <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
          <div className="bottom-row">
            <div className="link-box text-center-reg-side">
              <p>
                Already have an account?
                <Link to="/login" className="btn btn-link btn-red-link">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlreadyHaveAccountComponent;
