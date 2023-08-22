import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/style.css';
import '../../assets/css/user/user-materials-details-style.css';
import Header from "../../components/Header/HeaderComponent";
import { isAuthenticated } from "../../services/auth";
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import UserMaterialsDetailsComponent from '../../components/Users/UserMaterialsDetailsComponent/UserMaterialsDetailsComponent';
import { useParams, useHistory } from 'react-router-dom';
import FooterComponent from "../../components/Footer/FooterComponent";

function UserMaterialsDetails() {
  let params = useParams();
  const sidebar = useSelector((state) => state.AddDetails.visible);
  const history = useHistory();
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {
      history.push(`/user-materials-details/${params.id}`);
    }
  }, []);
  return (
    <React.Fragment>
      <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper"}>
        {isAuthenticated() ? <UserHomeHeaderComponent
          activeTab="Materials"
          headerClass="header-div header-div2 clearfix"
        /> : <Header headerLoginClass="nav-link login-in-btn"/>}
        <div className="main-middle-area user-main-middle-area main-bg-color">
          <div className="header-footer-with-min-height02">
            <div className="pattern-inner-div pattern-upricing-inner-div">
              <section className="materials-details-section" id="materials-details-section">
                <UserMaterialsDetailsComponent />
              </section>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </React.Fragment>
  );
}

export default UserMaterialsDetails;
