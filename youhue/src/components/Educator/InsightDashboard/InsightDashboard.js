import React from "react";

import HeaderContainer from "../../../containers/Common/Header";
import FooterContainer from "../../../containers/Common/Footer";

import DashboardContainer from "../../../containers/Educator/InsightDashboard/Dashboard";
import AllLogsContainer from "../../../containers/Educator/InsightDashboard/AllLogs";
import PopularLogsContainer from "../../../containers/Educator/InsightDashboard/PopularLogs";
import FlaggedLogsContainer from "../../../containers/Educator/InsightDashboard/FlaggedLogs";
import StudentLogsContainer from "../../../containers/Educator/InsightDashboard/StudentLogs";

import "./InsightDashboard.scss";
import "./InsightDashboard.dev.scss";
import "../../../styles/style.css";
import "../../../styles/daterangepicker.css";
import NotificationBannerComponent from "../../Common/NotificationBannerComponent/NotificationBannerComponent";

class InsightDashboard extends React.Component {

  render() {
    // console.log('this.props.authenticate :>> ', this.props.authenticate);
    return (
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area dashboard-middle-area dashboard-new">
          <section className="general-dashboard-section bg-image-common">
            <div className="general-dashboard-div background-color-main">
              <HeaderContainer isLoggedIn={true} />
              {!this.props.educator.educatorData.verifiy_educator &&
                this.props.educator.educatorData.role === "Educator" &&
                localStorage.getItem("isShowNotificationBanner")&&
                this.props.educator.isShowNotification && (
                  <NotificationBannerComponent
                    date={this.props.educator.educatorData.end_date}
                  />
                )}

              {this.props.educator.insightDashboardStepCount === 0 ? (
                <DashboardContainer />
              ) : null}
              {this.props.educator.insightDashboardStepCount === 1 ? (
                <AllLogsContainer />
              ) : null}
              {this.props.educator.insightDashboardStepCount === 2 ? (
                <PopularLogsContainer />
              ) : null}
              {this.props.educator.insightDashboardStepCount === 3 ? (
                <FlaggedLogsContainer />
              ) : null}
              {this.props.educator.insightDashboardStepCount === 4 ? (
                <StudentLogsContainer />
              ) : null}
              <FooterContainer isLoggedIn={true} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default InsightDashboard;
