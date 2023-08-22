import React from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/all.min.css';
import '../assets/css/style.css';
import '../assets/css/auth-style.css';
import '../assets/css/custom-forms-style.css';
import '../assets/css/feather.min.css';
import ResetPasswordComponent from '../components/ForgotPasswordComponent/ResetPassword';

function ResetPassword() {
    return (
        <React.Fragment>
            <div id="wrapper" className="wrapper login-wrapper">
                <div className="main-middle-area pt-custom-0">
                    <ResetPasswordComponent />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ResetPassword
