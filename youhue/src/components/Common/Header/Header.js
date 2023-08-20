import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";

import Logo from "../../../assets/images/logo.svg";
import DownloadReport from "../../../containers/Common/Models/DownloadReport";

import "./Header.scss";
import NotificationComponent from "../Notification/NotificationComponent";
import EducatorResponseView from "../../../containers/Educator/Modal/EducatorResponse";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectClassOpen: false,
      isSelectStudentOpen: false,
      isDownloadReportModelOpen: false,
      showNotification: false,
      showNotificationDetailView: false,
      selectedNotificationId: undefined,
    };
    this.wrapperRef = React.createRef();
    this.wrappermenuRef = React.createRef();
  }

  componentDidMount() {
    localStorage.setItem("const_url", "");
    window.addEventListener("scroll", this.handleScroll);
    const token = localStorage.getItem("token");
    if (token) {
      this.props.getAccountDetails();
      this.props.getNotification();
    }
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("mousedown", this.handleClickOutsidemenu);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("mousedown", this.handleClickOutsidemenu);
  }
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef?.current?.contains(event.target)) {
      this.setState({ showNotification: false });
    }
  };
  handleClickOutsidemenu = (event) => {
    if (
      this.wrappermenuRef &&
      !this.wrappermenuRef?.current?.contains(event.target)
    ) {
      this.setState({ isMenuOpen: false });
    }
  };
  markAllAsRead = () => {
    this.props
      .handleMarkAllReadNotification()
      .then((res) => {
        if (res.status) {
          this.props.getNotification();
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleReadNotification = (
    isRead,
    notificationId,
    statusid,
    classid,
    Adminid,
    is_negative,
    id
  ) => {
    if (!isRead) {
      
      this.props
        .handleReadNotification(notificationId)
        .then((res) => {
          if (res.status) {
            if (classid) {
              this.props.getClassDetails(id);
              this.props.selectedClassId(id);
              this.props.history.push("/educator");
            }
            if (Adminid === true) {
              this.props.history.push(`/educator/account`);
            }
            if (is_negative === true) {
              this.props.history.push(`/educator/insight-dashboard`);
            }
            this.props.getNotification();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.setState({
      showNotificationDetailView: true,
      selectedNotificationId: statusid,
      showNotification: false,
    });
  };
  closedDetailView = () => {
    this.setState({
      showNotificationDetailView: false,
    });
  };

  handleScroll = () => {
    $(window).scroll(function () {
      let window_top = $(window).scrollTop() + 1;
      if (window_top > 100) {
        $("#sticky-header").addClass("header-sticky");
      } else {
        $("#sticky-header").removeClass("header-sticky");
      }
    });
  };

  showMenuBar = () => {
    // this.setState({ showNotification: false });
    if (!this.state.isMenuOpen) {
      this.setState({ isMenuOpen: true });
    } else {
      this.setState({ isMenuOpen: false });
    }
  };

  hideMenuBar = () => {
    this.setState({ isMenuOpen: false });
  };

  showReportDownloadModel = () => {
    this.setState({ isDownloadReportModelOpen: true });
    this.setState({ isMenuOpen: false });
    document.body.className += " download-report-body";
  };

  hideReportDownloadModel = () => {
    this.setState({ isDownloadReportModelOpen: false });
    document.body.className = document.body.className.replace(
      "download-report-body",
      ""
    );
  };

  logout = () => {
    const { history } = this.props;
    this.props.setClassDetailData({});
    this.props.setClassList([]);
    this.props.setClassListAdmin([]);
    this.props.setRemoveSelectedClass(new Date().getTime() / 1000);
    localStorage.removeItem("token");
    localStorage.removeItem("educatorId");
    localStorage.removeItem("isShowNotificationBanner");
    history.push("/");
  };
  toggleNotification = () => {
    this.setState({
      showNotification: !this.state.showNotification,
    });
  };

  render() {
    const { educator, notification } = this.props;
    const notificationresult =
      notification &&
      notification.length > 0 &&
      notification?.filter((notification) => notification.is_read === false);
    return (
      <header>
        {this.props.isLoggedIn ? (
          <div className="general-dashboard-header-div" id="sticky-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="general-header-row">
                    <div className="logo-thumb">
                      <Link to="/educator/home">
                        <img
                          src={Logo}
                          className="img-fluid img-logo"
                          alt="logo"
                        />
                      </Link>
                    </div>

                    <div className="header-center-div">
                      <div
                        className="center-heading-title"
                        ref={this.wrapperRef}>
                        <button
                          className="btn-common btn-custom-class"
                          onClick={() => this.toggleNotification()}>
                          <p>
                            {educator.educatorData
                              ? educator.educatorData["professor_name"]
                              : ""}
                          </p>
                          {notificationresult &&
                            notificationresult.length !== 0 && (
                              <span>{notificationresult.length}</span>
                            )}
                        </button>
                        {this.state.showNotification && (
                          <NotificationComponent
                            notification={notificationresult}
                            handleReadNotification={this.handleReadNotification}
                            markAllAsRead={this.markAllAsRead}
                          />
                        )}
                      </div>
                    </div>

                    <div className="nav-right-div">
                      <div className="nav-row-div">
                        <div
                          className={
                            this.state.isMenuOpen
                              ? "menu-icon-div active"
                              : "menu-icon-div"
                          }>
                          <button
                            className="menu-button"
                            id="menu-button"
                            onClick={this.showMenuBar}>
                            <span className="menu-bar-icon"></span>
                          </button>
                        </div>
                        <div
                          className={
                            this.state.isMenuOpen
                              ? "nav-menu-div active"
                              : "nav-menu-div"
                          }
                          id="nav-menu-toggle">
                          <div
                            className="backdrop-overlay"
                            onClick={this.hideMenuBar}></div>
                          <div
                            ref={this.wrappermenuRef}
                            className="nav-menu-box">
                            <ul className="nav-menu-list">
                              {/* {!educator.educatorData.is_locked && */}
                              <>
                                <li>
                                  <Link
                                    to="/educator/account"
                                    className="menu-item">
                                    <span className="icon-span-box">
                                      <span className="custom-menu-icon setting-icon"></span>
                                    </span>
                                    <span className="menu-text">
                                      My Account
                                    </span>
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    to="#"
                                    onClick={() => {
                                      this.showReportDownloadModel();
                                    }}
                                    className="menu-item">
                                    <span className="icon-span-box">
                                      <span className="custom-menu-icon download-new-icon"></span>
                                    </span>
                                    <span className="menu-text">
                                      Download Reports
                                    </span>
                                  </Link>
                                </li>
                              </>
                              {/* } */}
                              <li>
                                <a
                                  href="https://youhue.com/help/"
                                  target="_blank"
                                  className="menu-item">
                                  <span className="icon-span-box">
                                    <span className="custom-menu-icon question-icon"></span>
                                  </span>
                                  <span className="menu-text">Help</span>
                                </a>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="menu-item"
                                  onClick={this.logout}>
                                  <span className="icon-span-box">
                                    <span className="custom-menu-icon logout-icon"></span>
                                  </span>
                                  <span className="menu-text">Log out</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="general-header-div general-header-left-div">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="general-header-row">
                    <div className="logo-thumb">
                      <Link to="/login">
                        <img
                          src={Logo}
                          className="img-fluid img-logo"
                          alt="logo"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.isDownloadReportModelOpen ? (
          <DownloadReport
            show={this.state.isDownloadReportModelOpen}
            onClose={this.hideReportDownloadModel}
          />
        ) : null}
        {this.state.showNotificationDetailView &&
        this.state.selectedNotificationId ? (
          <EducatorResponseView
            show={this.state.showNotificationDetailView}
            onClose={this.closedDetailView}
            selectedStatus={this.state.selectedNotificationId}
          />
        ) : (
          ""
        )}
      </header>
    );
  }
}

export default Header;
