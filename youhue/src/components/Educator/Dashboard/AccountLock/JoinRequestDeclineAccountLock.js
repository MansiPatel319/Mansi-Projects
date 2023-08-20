import React, { Component } from "react";

import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";
import { Link } from "react-router-dom";

import "./Lock.scss";

import character5 from "../../../../assets/images/character/character-05.svg";
import { Spinner } from "react-bootstrap";

class JoinRequestDeclineAccountLock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      email: props.email,
      loader: false
    };
  }

  handleImageChange = (event) => {
    this.setState({ issentfailed: false });
    const images = [];

    var files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      images.push(event.target.files[i]);
    }
    const updtaed_images = [...this.state.image, ...images];
    this.setState({ image: updtaed_images });
  };

  handleSendtoYouHue = () => {
    if (this.state.image.length !== 0) {
      this.setState({ issentfailed: false, loader:true });
      var { history } = this.props;
      var uuid = this.props.user_id;
      let formData = new FormData();
      formData.append("educator_id", uuid);
      var files = this.state.image;
      for (let i = 0; i < files.length; i++) {
        formData.append("document_image", files[i]);
      }
      this.props
        .uploadSchoolId(formData)
        .then((res) => {
          this.setState({loader: false})
          if (res.status) {
            history.push("/account-lock/");
          }
        })
        .catch((err) => {
          this.setState({loader: false})
          console.log(err);
        });
    }
    this.setState({ msg: "Please Choose files" });
  };
  clickOnJoinSchool = () =>{
    localStorage.setItem("isRedirected","true")
    localStorage.setItem("email", this.state.email);
    this.props.history.push(`/find-school/${this.state.email}`)
  
  }
  render() {
    return (
      <>
       {this.state.loading ? <Spinner /> : null}
        <div id="wrapper" className="wrapper">
          <div className="main-middle-area dashboard-middle-area">
            <section className="general-dashboard-section bg-image-common">
              <div className="general-dashboard-div background-color-main">
                <HeaderContainer isLoggedIn={true} />

                <div className="body-main-new admin-home-view-main-div">
                  <div className="container-main-root">
                    <div className="container-inner-root">
                      <div className="yh-dashboard-mian-div">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="yh-tab-header-div">
                                <div className="yh-tab-header-center-div">
                                  <ul className="tab-list-ul disabled">
                                    <li className="tab-item active">
                                      <Link
                                        // href="admin-dashboard.html"
                                        to="#"
                                        className="link"
                                      >
                                        {" "}
                                        Admin{" "}
                                      </Link>
                                    </li>
                                    <li className="tab-item">
                                      <Link
                                        // href="insight-admin-dashboard.html"
                                        to="#"
                                        className="link"
                                      >
                                        {" "}
                                        Insight{" "}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="yh-tab-body-div">
                                <div className="general-account-root edu-verfication-link-div admin-lock-div">
                                  <div className="full-account-div full-account-border-div">
                                    <div className="ev-join-school-flex ev-join-school-flex-height">
                                      <div className="general-title color-general-title01">
                                        <div className="center-text-block">
                                          <h3>
                                            Oops! Your account has been
                                            temporarily locked.
                                          </h3>
                                        </div>
                                      </div>

                                      <div className="form-custom-div">
                                        <div className="row">
                                          <div className="col-lg-12 col-md-12">
                                            <div className="tc-content-general-box max-width-580 mb-40">
                                              <h3>
                                                You failed to get verified as an
                                                educator for your school.
                                              </h3>
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12">
                                            <div className="yh_verify_adminIcon mb-40">
                                              <div className="yh_verify_iconBlock text-center">
                                                <img
                                                  src={character5}
                                                  className="img-fluid"
                                                  alt="img"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12">
                                            <div className="ev-join-school-div">
                                              <div className="tc-content-general-box">
                                                <h3>
                                                  {this.props.message || 
                                                 "You can change your school or upload your school ID for us to verify you."}
                                                </h3>
                                              </div>

                                              <div className="button-row pt-15">
                                                <div className="center-side-button">
                                                  <div className="custom-file custom-file-btn">
                                                    <input
                                                      type="file"
                                                      multiple={true}
                                                      className="custom-file-input d-none"
                                                      id="customFile"
                                                      accept=".jpg, .png, .jpeg, .pdf"
                                                      name={
                                                        this.state.image
                                                          ? this.state.image
                                                              .name
                                                          : "filename"
                                                      }
                                                      onChange={
                                                        this.handleImageChange
                                                      }
                                                    />
                                                    <label
                                                      className="custom-file-label"
                                                      for="customFile"
                                                    >
                                                      Upload school ID
                                                    </label>
                                                  </div>

                                                  <div className="link-div mt-5px">
                                                    {" "}
                                                    <Link
                                                      to="#"
                                                      onClick={()=>this.clickOnJoinSchool()}
                                                      className="btn btn-link"
                                                    >
                                                      Change school
                                                    </Link>{" "}
                                                  </div>
                                                  <div className="upload-file-div mt-25">
                                                    <div className="upload-file-row">
                                                      {this.state.image
                                                        .length === 0
                                                        ? ""
                                                        : this.state.image.map(
                                                            (image, index) => {
                                                              return (
                                                                <p key={index}>
                                                                  {image.name}
                                                                </p>
                                                              );
                                                            }
                                                          )}
                                                    </div>
                                                  </div>
                                                  {this.state.image.length >
                                                    0 && (
                                                    <div className="link-div">
                                                      {" "}
                                                      <Link
                                                        to="#"
                                                        className="btn btn-link"
                                                        onClick={
                                                          this
                                                            .handleSendtoYouHue
                                                        }
                                                      >
                                                        Send to YouHue
                                                      </Link>{" "}
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="ev-join-school-bottom-div ev-join-school-bottom-div02">
                                      <div className="text-end-div">
                                        <p>
                                          If you have any questions, please
                                          email us at{" "}
                                          <Link
                                            // href="mailto:help@youhue.com"
                                            to="#"
                                            className="link"
                                          >
                                            help@youhue.com
                                          </Link>
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

                <FooterContainer isLoggedIn={true} />
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default JoinRequestDeclineAccountLock;
