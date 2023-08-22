import React, { useEffect } from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/user/flexible-plans-style.css';
import '../../assets/css/style.css';
import "../../assets/css/footer.css";
import "../../assets/css/user/user-pricing.css";
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import FlexiblePlansSectionComponent from '../../components/Users/FlexiblePlansSectionComponent/FlexiblePlansSectionComponent';
import { useHistory } from 'react-router-dom';
import FooterComponent from "../../components/Footer/FooterComponent";
import { useSelector } from 'react-redux';
function FlexiblePlans() {
  const history = useHistory();
  const sidebar = useSelector((state) => state.AddDetails.visible);
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    }
  }, []);
  return (
    <React.Fragment>
      <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper"}>
        <UserHomeHeaderComponent activeTab="Home" headerClass="header-div header-div2 clearfix" />
        <div className="main-middle-area user-main-middle-area main-bg-color">
          <div className="header-footer-with-min-height02">
            <div className="pattern-inner-div pattern-upricing-inner-div">
              <div className="user-pricing-plan-root">
                <section className="our-pricing-plan-section" id="our-pricing-plan-section">
                  <FlexiblePlansSectionComponent />
                </section>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent auth/>
      </div>
    </React.Fragment>
  );
}

export default FlexiblePlans;
