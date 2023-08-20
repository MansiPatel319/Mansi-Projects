import React from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";
import MyAccountLeftMenu from "../MyAccountLeftMenu";
import Spinner from "../../../Spinner/Spinner";
import {
  createTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

import "./MySchool.scss";
import "../MyAccount.scss";
import VerifiedAdminContainer from "../../../../containers/Educator/MyAccount/MySchoolContainers/VerifiedAdmin";
import EditSchoolDetails from "../../Modal/EditSchoolDetails/EditSchoolDetails";
import StudentData from "../../../../containers/Educator/MyAccount/MySchoolContainers/StudentData";
import VerifiedEducatorPaidSchool from "../../../../containers/Educator/MyAccount/MySchoolContainers/VerifiedEducatorPaidSchool";
import UnVerifiedEducatorFreeSchool from "../../../../containers/Educator/MyAccount/MySchoolContainers/UnVerifiedEducatorFreeSchool";
import UnVerifiedEducatorPaidSchool from "../../../../containers/Educator/MyAccount/MySchoolContainers/UnVerifiedEducatorPaidSchool";
import NoSchoolAssociated from "./MySchoolComponents/NoSchoolAssociated";
import NotificationBannerComponent from "../../../Common/NotificationBannerComponent/NotificationBannerComponent";
import SelectSchoolModal from "../../Modal/SelectSchoolModal/SelectSchoolModal";

class MySchool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      BecomeASchoolAdminModal: false,
      isMailSent: false,
      isOpenEditSchoolDetailModal: false,
      isbannerShoe: true,
      noSchoolAssociated: false,
      isToolTipOpen: false,
      loading: false,
      isSelectedSchoolModalClicked: false
    };
    this.tooltipRef = React.createRef();
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
  componentDidMount() {
    localStorage.setItem("const_url","")
   
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
   
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside = (event) => {
    if (this.tooltipRef && !this.tooltipRef?.current?.contains(event.target)) {
      this.setState({ isToolTipOpen: false });
    }
  };

  handleclosebanner = () => {
    this.setState({ isbannerShoe: false });
    localStorage.setItem("isShowNotificationBanner", false);
  }

  handleToolTipOpen = () => {
    if (this.state.isToolTipOpen) {
      this.setState({ isToolTipOpen: false });
    } else {
      this.setState({ isToolTipOpen: true });
    }
  };
  handleOpenBecomeASchoolAdminModal = () => {
    this.setState({ isOpenBecomeASchoolAdminModal: true });
  };
  isOpenBecomeASchoolAdminModal = () => {
    this.setState({ isOpenBecomeASchoolAdminModal: false });
  };
  async componentDidMount() {
    localStorage.setItem("const_url","")
    await this.getSchoolData();
    await this.getAccountDetails();
  }

  getSchoolData = () => {
this.setState({loading:true})
    this.props
      .getSchoolData()
      .then((res) => {
        if (res.status) {
          this.setState({loading:false})
          if (res.code === 202) {
            this.setState({ noSchoolAssociated: true });
          } else if (res.data.join_request === "declined") {
            this.setState({ noSchoolAssociated: true });
          }
          this.setState({ data: res.data });
        } else {
          // this.props.addToast(res.message, {
          //   appearance: "error",
          //   autoDismiss: true,
          // });
        }
      })
      .catch((err) => {
        this.setState({loading:false})
        console.log(err);
      });
  };

  getAccountDetails = () => {
    this.props.getAccountDetails();
  };

  becomeSchoolAdmin = () => {
    this.props
      .becomeSchoolAdmin()
      .then((res) => {
        if (res.status) {
          // this.props.addToast(res.message, {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
          this.setState({
            isMailSent: true,
            isOpenBecomeASchoolAdminModal: false,
          });
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

  becomeASchoolAdmin = () => {
    this.becomeSchoolAdmin();
  };

  handleOpenEditSchoolDetailModal = () => {
    this.setState({ isOpenEditSchoolDetailModal: true });
  };
  handleEditSchool = (formData) => {
    var id = this.state.data.id;
    this.props
      .editSchoolDetails(formData, id)
      .then((res) => {
        if (res.status) {
          // this.props.addToast(res.message, {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
          this.setState({ isOpenEditSchoolDetailModal: false });
          this.getSchoolData();
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

  isOpenEditSchoolDetailModal = () => {
    this.setState({ isOpenEditSchoolDetailModal: false });
  };

  selectSchoolModal = () => {
    this.setState({isSelectedSchoolModalClicked:true})
  }

  SelectSchoolModal = () => {
    this.setState({isSelectedSchoolModalClicked:false},()=>{
      this.getSchoolData()
    })
  }

  render() {
    const details = this.state.data;
    const { educatorData } = this.props.educator;
    return (
      <div id="wrapper" className="wrapper">
        {this.props.authenticate.loading ? <Spinner /> : null}
        {this.state.loading ? <Spinner /> : null}
        <div className="main-middle-area dashboard-middle-area">
          <section className="general-dashboard-section bg-image-common">
            <div className="general-dashboard-div background-color-main">
              <HeaderContainer isLoggedIn={true} />
              <div className="body-main-new my-account-main-div">
                <div className="container-main-root">
                  <div className="container-inner-root">
                    {/* Cannot use account */}
                    { localStorage.getItem("isShowNotificationBanner")!=="false"
                    &&
                    !educatorData.verifiy_educator &&
                    educatorData.role === "Educator" &&
                    this.state.noSchoolAssociated === false &&                   
                    this.props.educator.isShowNotification ? (
                      <NotificationBannerComponent
                        date={educatorData.end_date}
                      />
                    ) : null}
                     {localStorage.getItem("isShowNotificationBanner")!=="false" && 
                                        <>
                    {!educatorData.is_verified_admin &&
                    educatorData.role === "Admin" &&
                    this.state.noSchoolAssociated === false ? (
                      <div
                        className="message-text-dark-div"
                        id="message-text-dark01"
                      >
                        <div className="message-text-dark-row">
                          <div className="text-div">
                            <p>
                              You can continue using YouHue in your class until{" "}
                              {educatorData.end_date} after which your account
                              will become inactive unless you are verified.
                            </p>
                          </div>
                          <div className="cancel-div">
                            <div className="cancel-icon-div">
                              <button
                                className="btn-cancel-icon"
                                id="cancel-message-row"
                                onClick={this.handleclosebanner}
                              >
                                <span className="custom-icon cancel-new-icon"></span>
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
                    {/* Cannot use account */}
                    {localStorage.getItem("isShowNotificationBanner")!=="false"&&
                    this.state.isbannerShoe && 
                                        <>
                    {this.state.noSchoolAssociated ? (
                      <div
                        className="message-text-dark-div"
                        id="message-text-dark01"
                      >
                        <div className="message-text-dark-row">
                          <div className="text-div">
                            <p>
                              You are not associated with any school. Please
                              join another school to continue using YouHue.
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
                    <div className="my-account-text-div">
                      <div className="my-account-text-row">
                        <div className="text-div">
                          <h4>My Account</h4>
                        </div>
                        <div className="cancel-div">
                          <div className="cancel-icon-div">
                            <Link
                              to="/educator/home"
                              className="btn-cancel-icon"
                            >
                              <span className="custom-icon cancel-round-icon"></span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="main-my-tab-area-div">
                      <div className="main-my-tab-area-row">
                        <MyAccountLeftMenu />
                        {!this.state.noSchoolAssociated ? (
                          <div className="main-my-tab-right-div">
                            <div className="main-my-tab-right-inner">
                              <div className="form-custom-div custom-school-div">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group form-group-custom">
                                      <div className="form-group-row" ref={this.tooltipRef}>
                                        <div className="label-div">
                                          <label>School</label>
                                        </div>
                                        <div className="input-div">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            value={details.school_name}
                                            disabled
                                          />

                                          {/* Edit school verified educator and free school */}
                                          {(educatorData.role==="Educator" && educatorData.verifiy_educator &&  details.paid) ||(educatorData.role==="admin" && educatorData.verifiy_educator && educatorData.is_verified_admin) 
 ? (
                                            <div className="btn-edit-div">
                                              <button
                                                className="btn btn-edit-btn"
                                                onClick={
                                                  this
                                                    .handleOpenEditSchoolDetailModal
                                                }
                                              >
                                                {" "}
                                                <span className="custom-icon edit-icon"></span>{" "}
                                              </button>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                          {/* Edit school verified educator and free school */}

                                          {/* Edit school verified admin and paid school */}
                                          {educatorData.is_verified_admin &&
                                          details.paid ? (
                                            <div className="btn-edit-div">
                                              <button
                                                className="btn btn-edit-btn"
                                                onClick={
                                                  this
                                                    .handleOpenEditSchoolDetailModal
                                                }
                                              >
                                                {" "}
                                                <span className="custom-icon edit-icon"></span>{" "}
                                              </button>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                          {/* Edit school verified admin and paid school */}
                                        </div>

                                        {/* School paid and admin verified and role admn */}
                                        {educatorData.is_verified_admin &&
                                        details.role === "Admin" ? (
                                          <div
                                            className={`info-right-div ${
                                              details.paid ? "d-flex" : ""
                                            }`}
                                            style={{"marginBottom":"0"}}
                                          >
                                            {details.paid ? (
                                              <div className="verified-div">
                                                <span className="custom-icon verified-new-icon"></span>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                            {this.props?.educator?.educatorData?.district_admin ?
                                              <div className="new-school-name new-school-drop-down">
                                                <span className="custom-icon dropdown-new-icon"
                                                onClick={this.selectSchoolModal} 
                                                  style={{"height":"26px", "width":"26px"}}></span> 
                                              </div> :
                                            ""
                                            }
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {/* School paid and admin verified and role admn */}

                                        {!educatorData.verifiy_educator &&
                                        details.role === "Educator" &&
                                        !details.paid ? (
                                          <>
                                          {educatorData.is_locked ? (
                                            <div className="link-div">
                                              <Link to={`/find-school/${educatorData.email}`} className="link btn-link">Change School</Link>
                                            </div>
                                          ):(

                                          <div
                                            className={`info-right-div d-flex`}
                                            
                                          >
                                          
                                            <MuiThemeProvider
                                              theme={this.defaultTheme}
                                            >
                                              <this.TextOnlyTooltip
                                                placement="right"
                                                open={this.state.isToolTipOpen}
                                                title='If you would like to change your school, please email us at support@youhue.com'
                                              >
                                                <div className="tooltip-div">
                                                  <Link
                                                    to="#"
                                                    className="tooltip-link"
                                                    data-toggle="tooltip"
                                                    id="tooltip-access-code"
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
                                            </MuiThemeProvider>
                                          </div>
                                          )
                                          }
                                          </>
                                        ) : (
                                          ""
                                        )}

                                        {/* School paid and educator verified and role educator */}
                                        {educatorData.verifiy_educator &&
                                        details.role === "Educator" ? (
                                          <div
                                            className={`info-right-div ${
                                              details.paid ? "d-flex" : ""
                                            }`}
                                            style={{"marginBottom":"0"}}
                                          >
                                            {details.paid &&
                                            details.role === "Educator" ? (
                                              <div className="verified-div">
                                                <span className="custom-icon verified-new-icon"></span>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        ) : (
                                          <div
                                            className={`info-right-div ${
                                              details.paid ? "d-flex" : ""
                                            }`}
                                            style={{"marginBottom":"0"}}
                                          >
                                            {/* School paid and educator unverified and role educator */}
                                            {details.paid &&
                                            details.role === "Educator" ? (
                                              <>
                                              <>
                                          {educatorData.is_locked ? (
                                            <div className="link-div">
                                              <Link to={`/find-school/${educatorData.email}`} className="link btn-link">Change School</Link>
                                            </div>
                                          ):(
                                            <>
                                                <div className="verified-div">
                                                  <span className="custom-icon verified-new-icon"></span>
                                                </div>
                                                <MuiThemeProvider
                                                  theme={this.defaultTheme}
                                                >
                                                  <this.TextOnlyTooltip
                                                    placement="right"
                                                    open={
                                                      this.state.isToolTipOpen
                                                    }
                                                    title="If you would like to change your school, please email us at support@youhue.com"
                                                  >
                                                    <div className="tooltip-div">
                                                      <Link
                                                        to="#"
                                                        className="tooltip-link"
                                                        data-toggle="tooltip"
                                                        id="tooltip-access-code"
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
                                                </MuiThemeProvider>
                                                </>
                                          )}
                                          </>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                            {/* School paid and educator unverified and role educator */}
                                          </div>
                                        )}
                                        {/* School paid and educator verified and role educator */}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Role and its conditions  */}
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <p
                                      className={`custom-prag-text ${
                                        educatorData.verifiy_educator ||
                                        educatorData.is_verified_admin
                                          ? "custom-prag-verified-text"
                                          : ""
                                      }`}
                                    >
                                      <span className="txt-span">
                                        Role: &nbsp;
                                      </span>
                                      <span
                                        className={`ans-span ${
                                          educatorData.verifiy_educator ||
                                          educatorData.is_verified_admin
                                            ? "ans-verified-span"
                                            : ""
                                        }`}
                                      >
                                        {details.role}
                                        {educatorData.is_verified_admin &&
                                        details.role === "Admin" ? (
                                          <span className="custom-icon verified-new-icon"></span>
                                        ) : (
                                          ""
                                        )}
                                        {educatorData.verifiy_educator &&
                                        details.role === "Educator" ? (
                                          <span className="custom-icon verified-new-icon"></span>
                                        ) : (
                                          ""
                                        )}
                                      </span>
                                    </p>

                                    <hr className="hr-custom-row01" />
                                  </div>
                                </div>
                                {/* Role and its conditions  */}

                                {/* Role Admin and Unvierified Admin */}
                                {details.role === "Admin" &&
                                educatorData.is_verified_admin === false ? (
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                      <div className="custom-text-div">
                                        <p className="prag-text">
                                          <span className="block">
                                            You are unverified at{" "}
                                            {details.school_name}.{" "}
                                          </span>
                                          <span className="block">
                                            Thank you for sending us your school
                                            ID! We will review it and verify you
                                            within 48 hours.{" "}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {/* Role Admin and Unvierified Admin */}
                              </div>

                              {/* Role Admin and Verified Admin */}
                              {details.role === "Admin" &&
                              educatorData.is_verified_admin ? (
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <StudentData />
                                    <VerifiedAdminContainer />
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {/* Role Admin and Verified Admin */}

                              {/* Role Educator, Verified edcuator Paid School, VerifiedEducatorPaidSchool */}
                              {educatorData.verifiy_educator &&
                              details.role === "Educator" &&
                              details.paid ? (
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <StudentData />
                                    <VerifiedEducatorPaidSchool />
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {/* Role Educator, Verified edcuato Paid School */}

                              {/* Role educator and unverified, UnVerifiedEducatorFreeSchool */}
                              {!educatorData.verifiy_educator &&
                              details.role === "Educator" &&
                              !details.paid ? (
                                <UnVerifiedEducatorFreeSchool
                                  educatorData={educatorData}
                                />
                              ) : (
                                ""
                              )}
                              {/* Role educator and unverified */}

                              {/* Role educator and verified , free school VerifiedEducatorFreeSchool */}
                              {educatorData.verifiy_educator &&
                              details.role === "Educator" &&
                              !details.paid ? (
                                <StudentData />
                              ) : (
                                ""
                              )}
                              {/* Role educator and unverified, free school */}

                              {/* Role educator and unverified , paid school, UnVerifiedEducatorPaidSchool */}
                              {!educatorData.verifiy_educator &&
                              details.role === "Educator" &&
                              details.paid ? (
                                <UnVerifiedEducatorPaidSchool
                                  educatorData={educatorData}
                                />
                              ) : (
                                ""
                              )}
                              {/* Role educator and unverified, paid school */}
                            </div>
                          </div>
                        ) : (
                          <NoSchoolAssociated email={educatorData.email} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <FooterContainer isLoggedIn={true} />
            </div>
          </section>
        </div>

        {this.state.isOpenEditSchoolDetailModal ? (
          <EditSchoolDetails
            show={this.state.isOpenEditSchoolDetailModal}
            onClose={this.isOpenEditSchoolDetailModal}
            EditSchool={this.handleEditSchool}
            schoolDetails={details}
          />
        ) : (
          ""
        )}
        {this.state.isSelectedSchoolModalClicked ? (
          <SelectSchoolModal
            show={this.state.isSelectedSchoolModalClicked}
            onClose={this.SelectSchoolModal}
            props={this.props}
            switchSchoolData={this.props?.educator?.switchSchoolData}
          />
        ) : null}
      </div>
    );
  }
}

export default MySchool;
