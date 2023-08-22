import React from 'react';
import '../assets/images/favicon.png';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import SignupBannerComponent from '../components/SignupBannerComponent/SignupBannerComponent';
import SignupComponent from '../components/SignupComponent/SignupComponent';
import { useParams, useHistory } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

function Signup() {
  const { name } = useParams();
  const history = useHistory();
  const checkCreator = localStorage.getItem('is_creator');
  if (isAuthenticated()) {
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {
      history.push('/user-home');
    }
  }
  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper login-wrapper">
        <div className="main-middle-area pt-custom-0">
          <SignupBannerComponent
            heading="Sign Up to Creator Classes"
            linkName={`/${name}/login`}
            linkTextName="Logn"
            linkText="Already have an account?"
            component={<SignupComponent />}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;
