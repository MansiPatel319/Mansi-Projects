import React from "react";
import Select2 from "react-select2-wrapper";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

import HeaderContainer from "../../containers/Common/Header";
import FooterContainer from "../../containers/Common/Footer";

import DashboardContainer from "../../containers/Educator/Dashboard";
import AddEducatorContainer from "../../containers/Educator/AddEducator";
import AddStudentContainer from "../../containers/Educator/AddStudent";
import EditStudentContainer from "../../containers/Educator/EditStudent";
import StudentLogsContainer from "../../containers/Educator/InsightDashboard/StudentLogs";

import ViewClassCode from "./Modal/ViewClassCode/ViewClassCode";

import "../../styles/style.css";
import ViewStudentLoginInstructionContainer from "../../containers/Educator/ViewStudentLoginInstruction";
import NotificationBannerComponent from "../Common/NotificationBannerComponent/NotificationBannerComponent";
import DropDownList from "../UI/DropDownList";
import imageIcon from "../../assets/images/icons/user-new-icon.svg";

class Educator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenViewClassCodeModal: false,
      selectedClass: props.educator.classDetailData
        ? props.educator.classDetailData["id"]
        : "",
      selectedClassName: props.educator.classDetailData
        ? props.educator.classDetailData["name"]
        : "",
      selectedStep: 0,
      downloadPdfLink: "http://google.com",
      toogleMultipleClassDropdown: false,
    };
    this.wrapperRef = React.createRef();
  }

  async componentDidMount() {
    await this.getAccountDetails();
    localStorage.setItem("const_url", "");
    localStorage.setItem("classid", this.state.selectedClass);
    this.setState({
      selectedStep: this.props.educator.adminDashboardStepCount,
    });
    // await this.getClassCodePdf();
    if (
      this.state.selectedClass === "" ||
      this.state.selectedClass === undefined ||
      this.state.selectedClass === null
    ) {
      await this.getAllClass();
      this.handleSteps(0);
    } else {
      await this.props.getClassDetails(this.state.selectedClass);
      this.handleSteps(0);
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.educator.educatorData !== this.props.educator.educatorData) {
      if (this.props.educator.educatorData.school_name === "") {
        this.setState({ noSchoolAssociated: true });
      }
      if (
        this.props.educator.educatorData.role === "Admin" &&
        this.props.educator.educatorData.is_verified_admin
      ) {
        this.props.getAdminClasses();
      }
      if (this.props.educator !== prevProps.educator) {
        this.setState({
          selectedStep: this.props.educator.adminDashboardStepCount,
        });
      }
      // if(prevProps.selectedClassToRemove !== this.props.selectedClassToRemove) {
      //   console.log('selectedClassToRemove', this.props.selectedClassToRemove)
      //   this.setState({selectedClassName: '', selectedClass: ''})
      // }
    }
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  handleSteps = (step) => {
    this.props.setAdminDashboardStepCount(step);
  };

  handleSelectedClass = (e) => {
    this.setState({ selectedClass: e.id, selectedClassName: e.name }, () => {
      if (e.id) {
        this.props.getClassDetails(e.id);
        this.setState({ toogleMultipleClassDropdown: false });
      }
    });
  };

  getAccountDetails = () => {
    this.props.getAccountDetails();
  };

  // getClassCodePdf = () => {
  //   if (this.state.selectedClass) {
  //     this.props
  //       .getClassCodePdf(this.state.selectedClass)
  //       .then((res) => {
  //         this.setState({ downloadPdfLink: res.data.url });
  //       })
  //   }

  // };

  getAllClass = async () => {
    // await this.props.getAllClass();
    this.setState({
      selectedClass: this.props.educator.classList[0]
        ? this.props.educator.classList[0]["id"]
        : "",
      selectedClassName: this.props.educator.classList[0]
        ? this.props.educator.classList[0]["name"]
        : "",
    }, async () => {
      await this.props.getClassDetails(this.state.selectedClass);
      this.handleSteps(0);
    });
  };

  handleOpenViewClassCodeModal = () => {
    this.setState({ isOpenViewClassCodeModal: true });
  };

  handleCloseViewClassCodeModal = () => {
    this.setState({ isOpenViewClassCodeModal: false });
  };
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current?.contains(event.target)) {
      this.setState({ toogleMultipleClassDropdown: false });
    }
  };
  getClassListOptions = () => {
    return this.props.educator.classList.map((data) => ({
      value: data.id,
      label: (
        <div className="select-card-dropdown-div">
          <div className="dd-container">
            <Link to="#" className="dd-option">
              {" "}
              <span className="span-img">
                <img className="dd-option-image" src={imageIcon} />
              </span>{" "}
              <label className="dd-option-text" style={{ textAlign: "left" }}>
                {data.name}
              </label>{" "}
            </Link>
          </div>
        </div>
      ),
    }));
  };

  handleToogleMultipleSelectClasses = (value) => {
    this.setState({ toogleMultipleClassDropdown: value });
    if (this.state.toogleMultipleClassDropdown === true) {
      this.setState({ toogleMultipleClassDropdown: false });
    }
  };
  render() {
    const { educator } = this.props;
    return (
      <>
        <div className="general-dashboard-section bg-image-common zoom">
          {this.props.authenticate.loading ? <Spinner /> : null}
          <div className="general-dashboard-div background-color-main">
            <HeaderContainer isLoggedIn={true} />
            <div className="body-main-new admin-home-view-main-div">
              <div className="container-main-root">
                <div className="container-inner-root">
                  {!educator.educatorData.verifiy_educator &&
                    educator.educatorData.role === "Educator" &&
                    localStorage.getItem("isShowNotificationBanner") &&
                    educator.isShowNotification && (
                      <NotificationBannerComponent
                        date={educator.educatorData.end_date}
                      />
                    )}
                  <div className="yh-dashboard-mian-div">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          {this.props.educator.insightDashboardStepCount ===
                          4 ? null : (
                            <div className="yh-tab-header-div">
                              <div className="yh-tab-header-center-div">
                                <div className="back-to-group-box">
                                  <Link
                                    to="#"
                                    className="back-to-link"
                                    onClick={() => {
                                      this.props.setClassDetailData({});
                                      this.props.setClassList([]);
                                      this.props.setClassListAdmin([]);
                                      this.props.setRemoveSelectedClass(
                                        new Date().getTime() / 1000
                                      );
                                      this.props.history.push("/educator/home");
                                    }}
                                  >
                                    <span className="back-icon-span">
                                      {" "}
                                      <span className="custom-icon back-icon"></span>{" "}
                                    </span>
                                  </Link>
                                </div>
                                <ul className="tab-list-ul">
                                  <li className="tab-item active">
                                    <Link
                                      to="#"
                                      className="link"
                                      onClick={() => {
                                        this.props.setClassDetailData({});
                                        this.props.setClassList([]);
                                        this.props.setClassListAdmin([]);
                                        this.props.setRemoveSelectedClass(
                                          new Date().getTime() / 1000
                                        );
                                        this.props.history.push(
                                          "/educator/home"
                                        );
                                      }}
                                    >
                                      {" "}
                                      Admin{" "}
                                    </Link>
                                  </li>
                                  <li className="tab-item">
                                    {educator.classDetailData.is_owner ===
                                    false ? (
                                      <Link
                                        to="#"
                                        onClick={() => {}}
                                        style={{ opacity: "0.5" }}
                                        className="link"
                                      >
                                        {" "}
                                        Insight{" "}
                                      </Link>
                                    ) : (
                                      <Link
                                        to="#"
                                        onClick={() => {
                                          this.props.history.push(
                                            "/educator/insight-dashboard"
                                          );
                                          this.props.setInsightDashboardStepCount(
                                            0
                                          );
                                        }}
                                        className="link"
                                      >
                                        {" "}
                                        Insight{" "}
                                      </Link>
                                    )}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}

                          <div className="yh-tab-body-div">
                            <div className="dash-class-view-main-root">
                              {this.props.educator.insightDashboardStepCount ===
                              4 ? null : (
                                <div className="top-info-header-group-div">
                                  <div className="row justify-content-between">
                                    <div className="col-lg-5 col-md-6 left-6">
                                      <div className="top-info-header-group-left">
                                        <div className="dropdown-group-div">
                                          <div
                                            ref={this.wrapperRef}
                                            className="dropdown-group-box user-dropdown-group-box"
                                          >
                                            <div
                                              className={`multiClass_select`}
                                            >
                                              <div className="dropdown">
                                                <button
                                                  onClick={() =>
                                                    this.handleToogleMultipleSelectClasses(
                                                      true
                                                    )
                                                  }
                                                  className="btn btn-secondary dropdown-toggle"
                                                  type="button"
                                                  id="dropdownMenuButton"
                                                  data-toggle="dropdown"
                                                  aria-haspopup="true"
                                                  aria-expanded="false"
                                                  style={{ color: "#3C454C" }}
                                                >
                                                  <span className="custom-icon user-icon"></span>
                                                  <div
                                                    className="dropBorder"
                                                    style={{
                                                      borderLeft:
                                                        "1px solid rgba(226, 208, 208, 0.75)",
                                                      height: "36px",
                                                      position: "absolute",
                                                      left: "9.5%",
                                                      top: "0px",
                                                    }}
                                                  ></div>
                                                  {this.state
                                                    .selectedClassName !== ""
                                                    ? this.state
                                                        .selectedClassName
                                                    : "Name Your Class"}
                                                </button>
                                                <ul
                                                  className={
                                                    this.state
                                                      .toogleMultipleClassDropdown
                                                      ? "dropdown-menu show"
                                                      : "dropdown-menu"
                                                  }
                                                  aria-labelledby="dropdownMenuButton"
                                                >
                                                  {this.props?.educator
                                                    ?.classList.length > 0 &&
                                                    this.props.educator.classList.map(
                                                      (data, index) => {
                                                        return (
                                                          <li
                                                            onClick={() =>
                                                              this.handleSelectedClass(
                                                                data
                                                              )
                                                            }
                                                            key={`index_single_${index}`}
                                                            className="dropdown-item"
                                                          >
                                                            <Link to="#">
                                                              <span className="custom-icon user-icon"></span>{" "}
                                                              {data.name}
                                                            </Link>
                                                          </li>
                                                        );
                                                      }
                                                    )}
                                                </ul>
                                              </div>
                                            </div>
                                            <div></div>
                                          </div>
                                        </div>
                                        <div className="access-code-box">
                                          <p>Your Class Access Code:</p>
                                          <h4>
                                            {educator.classDetailData
                                              ? educator.classDetailData
                                                  .identifier
                                              : ""}
                                            <Link
                                              to="#"
                                              className="arrow-link"
                                              onClick={() => {
                                                this.handleOpenViewClassCodeModal();
                                              }}
                                            >
                                              <span className="custom-icon right-rounded-arrow-icon"></span>{" "}
                                            </Link>
                                          </h4>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-5 col-md-6 left-6">
                                      <div className="top-info-header-group-right">
                                        <div className="count-view-list">
                                          <div className="count-view-box">
                                            <h2>
                                              {educator.classDetailData
                                                ? educator.classDetailData
                                                    .total_students
                                                : 0}
                                            </h2>
                                            <p>Students</p>
                                          </div>
                                          <div className="count-view-box">
                                            <h2>
                                              {educator.classDetailData &&
                                              educator.classDetailData.educator
                                                ? educator.classDetailData
                                                    .educator.length
                                                : 0}
                                            </h2>
                                            {educator.classDetailData &&
                                            educator.classDetailData.educator &&
                                            educator.classDetailData &&
                                            educator.classDetailData.educator
                                              .length === 1 ? (
                                              <p>Educator</p>
                                            ) : (
                                              <p>Educators</p>
                                            )}
                                          </div>
                                          <div className="count-view-box">
                                            <h2>
                                              {educator.classDetailData
                                                ? educator.classDetailData.logs
                                                : 0}
                                            </h2>
                                            <p>Logs</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {this.props.educator.adminDashboardStepCount ===
                              0 ? (
                                <DashboardContainer />
                              ) : null}
                              {this.props.educator.adminDashboardStepCount ===
                              1 ? (
                                <AddEducatorContainer />
                              ) : null}
                              {this.props.educator.adminDashboardStepCount ===
                              2 ? (
                                <AddStudentContainer />
                              ) : null}
                              {this.props.educator.adminDashboardStepCount ===
                              3 ? (
                                <EditStudentContainer />
                              ) : null}
                              {this.props.educator.adminDashboardStepCount ===
                              4 ? (
                                <ViewStudentLoginInstructionContainer />
                              ) : null}
                              {this.props.educator.insightDashboardStepCount ===
                              4 ? (
                                <StudentLogsContainer />
                              ) : null}
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
        </div>
        {this.state.isOpenViewClassCodeModal ? (
          <ViewClassCode
            show={this.state.isOpenViewClassCodeModal}
            pdfDownloadLink={this.state.downloadPdfLink}
            onClose={this.handleCloseViewClassCodeModal}
            classcode={
              educator.classDetailData
                ? educator.classDetailData.identifier
                : ""
            }
            classId={
              educator.classDetailData ? educator.classDetailData.id : ""
            }
            parentData={this.props}
            classQRcode={
              educator.classDetailData ? educator.classDetailData.qr_code : ""
            }
          />
        ) : null}
      </>
    );
  }
}

export default Educator;
