import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/custom-forms-style.css';
import '../../assets/css/user/general-card-style.css';
import '../../assets/css/style.css';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import PaymentSuccessComponent from '../../components/PaymentComponent/PaymentSuccessComponent';
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';

function UserPaymentDetailsSuccessfull() {
  const sidebar = useSelector((state) => state.AddDetails.visible);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/user/login');
    }
  }, []);
  return (
    <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper"}>
      <UserHomeHeaderComponent activeTab="Home" headerClass="header-div header-div2 clearfix" />
      <div className="main-middle-area user-main-middle-area main-bg-color">
        <div className="header-footer-with-min-height02">
          <div className="pattern-inner-div pattern-upricing-inner-div mxh-100">
            <PaymentSuccessComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPaymentDetailsSuccessfull;
