import { createTheme, MuiThemeProvider, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../../Spinner/Spinner";
import BecomeASchoolAdminModal from "../../../Modal/BecomeASchoolAdmin/BecomeASchoolAdmin";
import Tooltip from "@material-ui/core/Tooltip";


class VerifiedEducatorPaidSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      BecomeASchoolAdminModal: false,
      isMailSent: false,
      isOpenEditSchoolDetailModal: false,
      isToolTipOpen: false
    };
  }
  async componentDidMount() {
    localStorage.setItem("const_url","")
    await this.getSchoolData();
    await this.getAccountDetails();
  }

  getSchoolData = () => {
    this.props
      .getSchoolData()
      .then((res) => {
        if (res.status) {
          this.setState({ data: res.data });
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
  handleOpenBecomeASchoolAdminModal = () => {

    this.setState({ isOpenBecomeASchoolAdminModal: true });
  };
  isOpenBecomeASchoolAdminModal = () => {
    this.setState({ isOpenBecomeASchoolAdminModal: false });
  };
  becomeASchoolAdmin = () => {
    this.becomeSchoolAdmin();
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
  handleToolTipOpen = () => {
    if (this.state.isToolTipOpen) {
      this.setState({ isToolTipOpen: false });
    } else {
      this.setState({ isToolTipOpen: true });
    }
  };

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
  render() {
    const details = this.state.data;
    return (
      <>
        {" "}
        {this.props.authenticate.loading ? <Spinner /> : null}
        <div className="school-admin-table-dv">
          <div className="school-admin-table-row">
            <div className="heading-div">
              <h3>Your school admins</h3>
            </div>

            <div className="table-div">
              <div className="row">
                <div className="col-lg-7 col-md-12">
                  <div className="table-responsive">
                    <table className="table custom-table">
                      <thead>
                        <tr>
                          <th className="min-w120">Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {details && details.school_admin ? (
                          details.school_admin.map((data) => {
                            return (
                              <tr>
                                <td>{data.professor_name}</td>
                                <td>{data.email}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {this.state.isMailSent ? (
                  <div className="col-lg-12 col-md-12">
                    <div className="title-with-tooltip-div">
                      <p>
                        We have received your request to become a school admin.
                        You will soon receive a confirmation email.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="col-lg-12 col-md-12">
                    <div className="title-with-tooltip-div">
                      <h2 className="h2-text h2-text-flex">
                        <span
                          className="txt-span"
                          onClick={this.becomeASchoolAdmin}
                        >
                          Become a school admin &nbsp;
                        </span>
                        {/* <button
                          className="tooltip-link"
                          id="tooltip-school-admin-01"
                          data-toggle="tooltip"
                          title="<div className='text'> Becoming a school admin gives you the following: <div className='ul-list'> <ul> <li>Point of contact with the YouHue team to manage payments</li> <li>Verify educators requesting to join your school</li> <li>Edit school information</li> </ul> </div> </div>"
                        >
                          <span className="custom-icon info-new-icon"></span>{" "} */}
                       


                      <MuiThemeProvider
                    theme={this.defaultTheme}
                  >
                    <this.TextOnlyTooltip
                      placement="right"
                      open={this.state.isToolTipOpen}
                      title="Becoming a school admin gives you the following 	&#13;
                      &#8226; Point of contact with the YouHue team to manage payments 	&#13;
                      &#8226; Verify educators requesting to join your school  &#13;
                      &#8226; Edit school information"

                      // title={details.school_category.tool_tip_des}
                      // title="You can continue to use YouHue for free until the total number of students in your school does not exceed 100. Upon adding the 101st student, you will be prompted to become or assign a school admin. 
                      // To find out more about our pricing plans, please visit youhue.com/pricing. You can also email us at support@youhue.com"
                    >
                      <div className="tooltip-div">
                        <Link
                          to="#"
                          className="tooltip-link"
                          data-toggle="tooltip"
                          id="tooltip-school-category"
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
                  {/* </button> */}
                      </h2>

                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpenBecomeASchoolAdminModal ? (
          <BecomeASchoolAdminModal
            show={this.state.isOpenBecomeASchoolAdminModal}
            onClose={this.isOpenBecomeASchoolAdminModal}
            becomeAdmin={this.becomeASchoolAdmin}
            props={this.props}
          />
        ) : null}
      </>
    );
  }
}

export default VerifiedEducatorPaidSchool;
