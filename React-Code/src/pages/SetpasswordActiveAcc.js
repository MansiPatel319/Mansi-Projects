import React from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/all.min.css';
import '../assets/css/style.css';
import '../assets/css/auth-style.css';
import '../assets/css/custom-forms-style.css';
import '../assets/css/feather.min.css';
import SetActicveAccpassword from '../components/Main/SetActicveAccpassword';

function ResetPassword() {
    return (
        <React.Fragment>
            <div id="wrapper" className="wrapper login-wrapper">
                <div className="main-middle-area pt-custom-0">
                    <SetActicveAccpassword />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ResetPassword
