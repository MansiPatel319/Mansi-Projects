import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/custom-forms-style.css';
import '../../assets/css/user/general-card-style.css';
import '../../assets/css/style.css';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import PaymentComponent from '../../components/PaymentComponent/PaymentComponent';
import { useHistory } from 'react-router-dom';


function UserPaymentDetails() {
  const history = useHistory();

  const sidebar = useSelector((state) => state.AddDetails.visible);

  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {     
      history.push('/user-payment-details');     
    }
  }, []);

  return (
    <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper"}>
      {/* {isLoading && <Loader />} */}
      <UserHomeHeaderComponent activeTab="Home" headerClass="header-div header-div2 clearfix" />
      <div className="main-middle-area pt-custom-default">
        <PaymentComponent />
      </div>
    </div>
  );
}

export default UserPaymentDetails;
