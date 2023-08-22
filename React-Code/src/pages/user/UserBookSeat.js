import React from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/custom-forms-style.css';
import '../../assets/css/user/book-a-seat-style.css';
import '../../assets/css/style.css';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import UserBookaSeatComponent from '../../components/Users/UserBookaSeatComponent/UserBookaSeatComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import { isAuthenticated } from "../../services/auth";
import Header from "../../components/Header/HeaderComponent";

function UserBookSeat() {
  const sidebar = useSelector((state) => state.AddDetails.visible);

  return (
    <React.Fragment>
      <div
        id="wrapper"
        className={sidebar ? 'wrapper home-wrapper position-fixed-custom' : 'wrapper home-wrapper'}
      >
         {isAuthenticated() ? <UserHomeHeaderComponent
          activeTab="Home"
          headerClass="header-div header-div2 clearfix"
        /> : <Header headerLoginClass="nav-link login-in-btn" />}
        <div className="main-middle-area user-main-middle-area main-bg-color">
          <div className="header-footer-with-min-height02">
            <div className="pattern-inner-div pattern-upricing-inner-div mxh-100">
              <section className="general-book-new-section general-book-a-seat-new-section">
                <UserBookaSeatComponent />
              </section>
            </div>
          </div>
        </div>
        { isAuthenticated() ? <FooterComponent auth/>:<FooterComponent/>}
      </div>
    </React.Fragment>
  );
}

export default UserBookSeat;
