import React from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/custom-forms-style.css';
import '../../assets/css/user/book-one-to-one-style.css';
import '../../assets/css/style.css';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import BookOneToOneComponent from '../../components/Users/BookOneToOneComponent/BookOneToOneComponent';
import FooterComponent from '../../components/Footer/FooterComponent';

function UserBookOneToOne() {
  const sidebar = useSelector((state) => state.AddDetails.visible);

  return (
    <div
      id="wrapper"
      className={sidebar ? 'wrapper home-wrapper position-fixed-custom' : 'wrapper home-wrapper'}
    >
      <UserHomeHeaderComponent activeTab="Home" headerClass="header-div header-div2 clearfix" />
      <div className="main-middle-area user-main-middle-area main-bg-color">
        <div className="header-footer-with-min-height02">
          <div className="pattern-inner-div pattern-upricing-inner-div mxh-100">
            <section className="general-one-to-one-new-section" id="book-one-to-one-section">
              <BookOneToOneComponent />
            </section>
          </div>
        </div>
      </div>
      <FooterComponent auth />
    </div>
  );
}

export default UserBookOneToOne;
