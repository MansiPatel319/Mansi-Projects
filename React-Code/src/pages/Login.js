import React from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/bootstrap.min.css';
import '../assets/css/all.min.css';
import '../assets/css/style.css';
import '../assets/css/auth-style.css';
import '../assets/css/custom-forms-style.css';
import '../assets/css/feather.min.css';
import SignupBannerComponent from '../components/SignupBannerComponent/SignupBannerComponent';
import LoginComponent from '../components/LoginComponent/LoginComponent';

const Login = () => {
  const { slag } = useParams();

  return (
    <React.Fragment>
     
      <div id="wrapper" className="wrapper login-wrapper">
        <div className="main-middle-area pt-custom-0">
          <SignupBannerComponent
            heading="Log In to Creator Classes"
            linkName={`/${slag}/signup`}
             linkTextName="Sign Up"
            //  linkText="Don’t have an account?"
            component={<LoginComponent linkTextName="Sign Up" />}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
