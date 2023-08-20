import React, { Component } from "react";
import Spinner from "../../../../Spinner/Spinner";

class VerifiedEducator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      BecomeASchoolAdminModal: false,
      isMailSent: false,
      isOpenEditSchoolDetailModal: false,
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
                          onClick={this.handleOpenBecomeASchoolAdminModal}
                        >
                          Become a school admin &nbsp;
                        </span>
                        <button
                          className="tooltip-link"
                          id="tooltip-school-admin-01"
                          data-toggle="tooltip"
                          title="<div className='text'> Becoming a school admin gives you the following:<div className='ul-list'> <ul> <li>Point of contact with the YouHue team to manage payments</li> <li>Verify educators requesting to join your school</li> <li>Edit school information</li> </ul> </div> </div>"
                        >
                          <span className="custom-icon info-new-icon"></span>{" "}
                        </button>
                      </h2>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default VerifiedEducator;
