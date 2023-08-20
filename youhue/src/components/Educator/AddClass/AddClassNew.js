import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "../../../containers/Common/Header";
import FooterContainer from "../../../containers/Common/Footer";
import Spinner from "../../Spinner/Spinner";

import add_class_icon from "../../../assets/images/icons/add-plus-round-icon.svg";
import class_icon from "../../../assets/images/logo-icon.svg";
import AddClassModal from "../Modal/AddClassModal/AddClassModal";
import SelectSchoolModal from "../Modal/SelectSchoolModal/SelectSchoolModal";

import {
  createTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

import "./AddClass.scss";
import JoinRequestDeclineAccountLock from "../../../containers/Educator/JoinRequestDecline";
import BecomeASchoolAdminFirstTime from "../InviteAdmin/BecomeASchoolAdminFirstTime";
import DemoClassImage from "../../../assets/images/class-img-1.svg";
import grayclass from "../../../assets/images/plus_gray.png";
import NotificationBannerComponent from "../../Common/NotificationBannerComponent/NotificationBannerComponent";
import AccountLockNotPaid from "../Dashboard/AccountLock/AccountLockNotPaid";

class AddClassNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddClassModal: false,
      selectedClass: "",
      noSchoolAssociated: "",
      data: "",
      isToolTipOpen: false,
      isbannerShoe: true,
      msg: "",
      isOpenJoinRequestDelineModal: false,
      isDemoClass: localStorage.getItem("isDemoClass"),
      isPaid: false,
      schooldata: undefined,
      isSelectedSchoolModalClicked: false
    };
    this.isOpenAddClassModal = this.isOpenAddClassModal.bind(this);
  }

  defaultTheme = createTheme();
  TextOnlyTooltip = withStyles({
    tooltip: {
      marginLeft: "7px",
      maxWidth: "350px",
      padding: "10px 10px",
      textAlign: "left",
      backgroundColor: "#fff",
      border: "2px solid #652d90",
      boxShadow: "0 2px 4px 0 rgb(0 0 0 / 0%)",
      borderRadius: "12px",
      fontSize: "14px",
      lineHeight: "18px",
      color: "#3f3f44",
      letterSpacing: "0",
      fontFamily: "Omnes",
      fontWeight: "400",
    },
  })(Tooltip);

  handleOpenAddClassModal = () => {
    this.setState({ msg: "" });
    this.setState({ isOpenAddClassModal: true });
  };
  isOpenAddClassModal = (data) => {
    this.setState({ isOpenAddClassModal: false }, () => {
      this.props.getAdminClasses()
    });
  };
  handleclosebanner = () => {
    this.setState({ isbannerShoe: false });
    localStorage.setItem("isShowNotificationBanner", false);
  }
  async componentDidMount() {
    localStorage.setItem("const_url","")
    await this.getAccountDetails();
    this.props.getAdminClasses()
    await this.getSchoolDetails();
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.educator.educatorData !== this.props.educator.educatorData || this.state.isPaid !== this.state.isPaid) {
      if (this.props.educator.educatorData.school_name === "") {
        this.setState({ noSchoolAssociated: true });
      }
      if(this.props.educator.educatorData.role==="Admin" && this.props.educator.educatorData.is_verified_admin)
      {
        this.props.getAdminClasses()
      }

      if(this.props.educator.educatorData.is_docs_uploaded === true && !this.state.isPaid && this.props.educator.educatorData.is_locked)
      {
        this.props.history.push("/account-lock/");
      }
    }
  };

  getSchoolDetails = () => {
    this.props
      .getSchoolData()
      .then((res) => {
        if (res.status) {
          this.setState({
            isPaid: res.data.paid,
            schooldata: res.data,
          });
          if (res.code === 202) {
            this.setState({ noSchoolAssociated: true });
          }
          this.setState({ data: res.data });
          if (res.data.join_request === "declined") {
            this.setState({ isOpenJoinRequestDelineModal: true });
          }
          
        } else {
          // this.props.addToast(res.message, {
          //   appearance: "error",
          //   autoDismiss: true,
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getAccountDetails = () => {
    this.props.getAccountDetails();
  };

  getAllClass = async () => {
    await this.props.getAllClass();
  };

  async handleSelectedclass(ids) {
    const { history } = this.props;
    if (ids) {
      await this.props.getClassDetails(ids);
      this.props.selectedClassId(ids)
      history.push("/educator");
    }
  }

  handleToolTipOpen = () => {
    if (this.state.isToolTipOpen) {
      this.setState({ isToolTipOpen: false });
    } else {
      this.setState({ isToolTipOpen: true });
    }
  };

  handleClick = () => {
    this.setState({ msg: "Add class to continue." });
  };
  cancelDemoClass = () => {
    this.props
      .handleRemoveDemoClass()
      .then((res) => {
        if (res.status) {
          if (res.code === 202) {
            localStorage.removeItem("isDemoClass");
            this.setState({
              isDemoClass: false,
            });
          }
          // this.props.addToast(res.message, {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
          this.props.getNotification();
        } else {
          // this.props.addToast(res.message, {
          //   appearance: "error",
          //   autoDismiss: true,
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  selectSchoolModal = () => {
    this.setState({isSelectedSchoolModalClicked:true})
  }

  switchSchoolModalClose = () => {
    this.setState({isSelectedSchoolModalClicked:false, msg:""},
      ()=>{this.getSchoolDetails()},
      this.props.getAdminClasses().then(this.props.setClassDetailData({}))
      )
  }
  render() {
    const educator = this.props.educator;
    // console.log("edu=====",educator);
    return (
      <>
        {this.props.authenticate.loading ? <Spinner /> : null}
        {educator.educatorData.email && (
          <>
            {educator.educatorData.is_locked ? (
              (this.state.isPaid &&
                this.props.educator.educatorData.verifiy_educator) ||
              educator.educatorData.role === "admin" ? (
                <AccountLockNotPaid />
              ) : (
                <JoinRequestDeclineAccountLock
                  user_id={this.state.data.user_uuid}
                  email={educator.educatorData.email}
                  setPathForUnverifiedEducator={
                    this.props.setPathForUnverifiedEducator
                  }
                  message="You can change your school or
              upload your school ID or any form of documentation that shows your name, title,school and we will verify you"
                />
              )
            ) : (
              <>
                {!this.state.isOpenJoinRequestDelineModal ? (
                  <>
                    {educator.educatorData &&
                    educator.educatorData.role === "Admin" &&
                    educator.educatorData.is_docs_uploaded === true &&
                    !educator.educatorData.is_verified_admin &&
                    !this.state.isPaid  ? (
                      <BecomeASchoolAdminFirstTime />
                    ) : (
                      <div id="wrapper" className="wrapper">
                        <div className="main-middle-area dashboard-middle-area">
                          <section className="general-dashboard-section bg-image-common">
                            <div className="general-dashboard-div background-color-main">
                              <HeaderContainer isLoggedIn={true} />

                              <div className="body-main-new admin-home-view-main-div">
                                <div className="container-main-root">
                                  <div className="container-inner-root">
                                    {!educator.educatorData.verifiy_educator &&
                                    educator.educatorData.role === "Educator" &&
                                    !this.state.noSchoolAssociated &&
                                    localStorage.getItem("isShowNotificationBanner")!=="false"&&
                                    educator.isShowNotification ? (
                                    <NotificationBannerComponent
                                        date={educator.educatorData.end_date}
                                      />
                                    
                                    
                                    ) : null}
                                        {this.state.isbannerShoe && 
                                        <>
                                    {localStorage.getItem("isShowNotificationBanner")!=="false"&& this.state.noSchoolAssociated ? (
                                      <div
                                        className="message-text-dark-div"
                                        id="message-text-dark01"
                                      >
                                        <div className="message-text-dark-row">
                                          <div className="text-div">
                                            <p>
                                              You are not associated with any
                                              school. Please join another school
                                              to continue using YouHue.
                                            </p>
                                          </div>
                                          <div className="cancel-div">
                                            <div className="cancel-icon-div">
                                              <button
                                                className="btn-cancel-icon"
                                                id="cancel-message-row"
                                                onClick={this.handleclosebanner}
                                              >
                                                {" "}
                                                <span className="custom-icon cancel-new-icon"></span>{" "}
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    </>
                                        }
                                    <div className="yh-dashboard-mian-div">
                                      <div className="container">
                                        <div className="row">
                                          <div className="col-lg-12 col-md-12">
                                            <div className="yh-tab-header-div">
                                              <div className="yh-tab-header-center-div">
                                                <ul className="tab-list-ul">
                                                  <li className="tab-item active">
                                                    <Link
                                                      to={
                                                        educator.classList &&
                                                        educator.classList
                                                          .length === 0
                                                          ? "#"
                                                          : "/educator"
                                                      }
                                                      onClick={
                                                        educator.classList &&
                                                        educator.classList
                                                          .length === 0
                                                          ? this.handleClick
                                                          : ""
                                                      }
                                                      className="link"
                                                    >
                                                      {" "}
                                                      Admin{" "}
                                                    </Link>
                                                  </li>
                                                  <li className="tab-item">
                                                    <Link
                                                      to={
                                                        educator.classList &&
                                                        educator.classList
                                                          .length === 0
                                                          ? "#"
                                                          : "/educator/insight-dashboard"
                                                      }
                                                      className="link"
                                                      onClick={
                                                        educator.classList &&
                                                        educator.classList
                                                          .length === 0
                                                          ? this.handleClick
                                                          : ""
                                                      }
                                                    >
                                                      {" "}
                                                      Insight{" "}
                                                    </Link>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                            <span>
                                              <div className="new-school-name" style={{
                                                "display": "flex",
                                                "alignItems": "center",
                                                "justifyContent":"center"}}>
                                                {this.state.schooldata?.school_name}
                                                {this.props?.educator?.educatorData?.district_admin ? 
                                                  <span className="custom-icon dropdown-new-icon" onClick={this.selectSchoolModal}></span> : ""}
                                              </div>
                                            </span>                                            

                                            <div className="yh-tab-body-div">
                                              <div className="general-account-root">
                                                <div className="full-account-div full-account-border-div">
                                                  <div className="yh-class-list-bx-root">
                                                    <div className="yh-class-list-bx-row">
                                                      <div className="row mlr-30">
                                                        {this.state
                                                          .isDemoClass && (
                                                          <div className="col-lg-4 col-md-6 plr-30">
                                                            <div className="yh-class-list-bx-card">
                                                              <div
                                                                className="cancel-btn-div"
                                                                onClick={() =>
                                                                  this.cancelDemoClass()
                                                                }
                                                              >
                                                                <button className="cancel-btn">
                                                                  {" "}
                                                                  <span className="custom-icon cancel-new-icon-01"></span>{" "}
                                                                </button>
                                                              </div>
                                                              <Link
                                                                to="/demo-class"
                                                                className="yh-class-list-bx-card-inner"
                                                              >
                                                                <div className="yh-class-list-bx-card-thumb">
                                                                  <img
                                                                    src={
                                                                      DemoClassImage
                                                                    }
                                                                    alt="img"
                                                                    className="img-fluid img-class"
                                                                  />
                                                                </div>
                                                                <div className="bx-desc-div">
                                                                  <h4>
                                                                    Demo Class
                                                                  </h4>
                                                                  <p>
                                                                    5 students,
                                                                    2 educators
                                                                  </p>
                                                                </div>
                                                              </Link>
                                                            </div>
                                                          </div>
                                                        )}
                                                        {educator.classList &&
                                                        educator.classList
                                                          .length > 0
                                                          ? educator.classList.map(
                                                              (res) => {
                                                                return (
                                                                  <div
                                                                    className="col-lg-4 col-md-6 plr-30"
                                                                    key={res.id}
                                                                  >
                                                                    <div className="yh-class-list-bx-card">
                                                                      <Link
                                                                      to="#"
                                                                        // to="/educator"
                                                                        className="yh-class-list-bx-card-inner"
                                                                        onClick={(
                                                                          ids
                                                                        ) =>
                                                                          this.handleSelectedclass(
                                                                            res.id
                                                                          )
                                                                        }
                                                                      >
                                                                        <div className="yh-class-list-bx-card-thumb">
                                                                          <img
                                                                            src={
                                                                              class_icon
                                                                            }
                                                                            className="img-fluid img-class"
                                                                            alt="img"
                                                                          />
                                                                        </div>
                                                                        <div className="bx-desc-div">
                                                                          <h4>
                                                                            {
                                                                              res.name
                                                                            }
                                                                          </h4>
                                                                          <p>
                                                                            {res.total_students}
                                                                            &nbsp;{res.total_students === 1 ? "student" : "students"},{" "}
                                                                            {
                                                                              res.total_educator
                                                                            }
                                                                            &nbsp;
                                                                            {res.total_educator === 1 ? "educator" : "educators"}
                                                                          </p>
                                                                        </div>
                                                                      </Link>
                                                                    </div>
                                                                  </div>
                                                                );
                                                              }
                                                            )
                                                          : null}
                                                        <div className="col-lg-4 col-md-6 plr-30">
                                                          <div className="yh-class-list-bx-card add-class-bx-card">
                                                            <MuiThemeProvider
                                                              theme={
                                                                this
                                                                  .defaultTheme
                                                              }
                                                            >
                                                              {this.state
                                                                .noSchoolAssociated ? (
                                                                <this.TextOnlyTooltip
                                                                  placement="right"
                                                                  open={
                                                                    this.state
                                                                      .isToolTipOpen
                                                                  }
                                                                  title="You are not associated with any school. Please go to ‘My Account’ to join another school to continue using YouHue."
                                                                >
                                                                  <div className="tooltip-div">
                                                                    <Link
                                                                      to="#"
                                                                      className="tooltip-link"
                                                                      data-toggle="tooltip"
                                                                      title=""
                                                                      onClick={() => {
                                                                        this.handleToolTipOpen();
                                                                      }}
                                                                    >
                                                                      {" "}
                                                                      <span className="custom-icon info-new-icon"></span>{" "}
                                                                    </Link>
                                                                  </div>
                                                                </this.TextOnlyTooltip>
                                                              ) : "" ||
                                                                (educator
                                                                  .educatorData
                                                                  .role ===
                                                                  "Admin" &&
                                                                  !educator
                                                                    .educatorData
                                                                    .is_verified_admin) ? (
                                                                <this.TextOnlyTooltip
                                                                  placement="right"
                                                                  open={
                                                                    this.state
                                                                      .isToolTipOpen
                                                                  }
                                                                  title="Your verification is currently under review.
                                                            Once you have been verified, you will be able
                                                            to add classes, as well as view all the existing
                                                            classes in your school.
                                                            In the meantime, you may access the existing
                                                            5 students, 5 educators demo class to experience YouHue."
                                                                >
                                                                  <div className="tooltip-div">
                                                                    <Link
                                                                      to="#"
                                                                      className="tooltip-link"
                                                                      data-toggle="tooltip"
                                                                      title=""
                                                                      onClick={() => {
                                                                        this.handleToolTipOpen();
                                                                      }}
                                                                    >
                                                                      {" "}
                                                                      <span className="custom-icon info-new-icon"></span>{" "}
                                                                    </Link>
                                                                  </div>
                                                                </this.TextOnlyTooltip>
                                                              ) : (
                                                                ""
                                                              )}
                                                            </MuiThemeProvider>

                                                            {this.state
                                                              .noSchoolAssociated ||
                                                            (educator
                                                              .educatorData
                                                              .role ===
                                                              "Admin" &&
                                                              !educator
                                                                .educatorData
                                                                .is_verified_admin) ? (
                                                              <Link
                                                                to="#"
                                                                className={`yh-class-list-bx-card-inner disabled`}
                                                                style={{
                                                                  opacity: "1",
                                                                }}
                                                                onClick={
                                                                  this
                                                                    .handleOpenAddClassModal
                                                                }
                                                              >
                                                                <div className="yh-class-list-bx-card-thumb">
                                                                  <img
                                                                    src={
                                                                      grayclass
                                                                    }
                                                                    className="img-fluid img-plus"
                                                                    alt="img"
                                                                  />
                                                                </div>
                                                                <div className="bx-desc-div">
                                                                  <h4>
                                                                    Add a class
                                                                  </h4>
                                                                </div>
                                                              </Link>
                                                            ) : (
                                                              <Link
                                                                to="#"
                                                                className={`yh-class-list-bx-card-inner 
                                                              }`}
                                                                style={{
                                                                  opacity: "1",
                                                                }}
                                                                onClick={
                                                                  this
                                                                    .handleOpenAddClassModal
                                                                }
                                                              >
                                                                <div className="yh-class-list-bx-card-thumb">
                                                                  <img
                                                                    src={
                                                                      add_class_icon
                                                                    }
                                                                    className="img-fluid img-plus"
                                                                    alt="img"
                                                                  />
                                                                </div>
                                                                <div className="bx-desc-div">
                                                                  <h4>
                                                                    Add a class
                                                                  </h4>
                                                                </div>
                                                              </Link>
                                                            )}

                                                            <p
                                                              style={{
                                                                color: "red",
                                                                textAlign:
                                                                  "center",
                                                              }}
                                                            >
                                                              {this.state.msg}
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <FooterContainer isLoggedIn={true} />
                            </div>
                          </section>
                        </div>
                      </div>
                    )}
                  </>
                ) : (<>{!educator.educatorData.is_docs_uploaded &&
                  <JoinRequestDeclineAccountLock
                  user_id={this.state.data.user_uuid}
                  email={educator.educatorData.email}
                  setPathForUnverifiedEducator={
                    this.props.setPathForUnverifiedEducator
                  }
                />
                }
                  </>
                )}
              </>
            )}
          </>
        )}

        {this.state.isOpenAddClassModal ? (
          <AddClassModal
            show={this.state.isOpenAddClassModal}
            onClose={this.isOpenAddClassModal}
            props={this.props}
          />
        ) : null}
          {this.state.isSelectedSchoolModalClicked ? (
          <SelectSchoolModal
            show={this.state.isSelectedSchoolModalClicked}
            onClose={this.switchSchoolModalClose}
            props={this.props}
            switchSchoolData={this.props?.educator?.switchSchoolData}
          />
        ) : null}
      </>
    );
  }
}

export default AddClassNew;
