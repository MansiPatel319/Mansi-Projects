import React, { Component } from "react";

import HeaderContainer from "../../../containers/Common/Header";
import FooterContainer from "../../../containers/Common/Footer";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import verify_admin from "../../../assets/images/verify_admin.png";

import "./UploadSchoolDocs.scss";

class UploadSchoolDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      issentfailed: true,
      msg: "",
      data: {},
      loading: false
    };
  }

  componentDidMount() {
    localStorage.setItem("const_url","")
    this.props.getAccountDetails();
    this.getSchoolData();
  }

  getSchoolData = () => {
    this.props
      .getSchoolData()
      .then((res) => {
        if (res.status) {
          if (res.code === 202) {
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
        console.log(err);
      });
  };
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
      this.setState({ issentfailed: false, loading:true });
      var { history } = this.props;
      var { educatorData } = this.props.educator;
      var uuid = educatorData.user_uuid;
      let formData = new FormData();
      formData.append("educator_id", uuid);
      var files = this.state.image;
      for (let i = 0; i < files.length; i++) {
        formData.append("document_image", files[i]);
      }
      this.props
        .uploadSchoolId(formData)
        .then((res) => {
          this.setState({loading: false})
          if (res.status) {
            history.push("/id-sent/");
          }
        })
        .catch((err) => {
          this.setState({loading: false})
          console.log(err);
        });
    }
    this.setState({ msg: "Please Choose files" });
  };
  render() {
    const { data } = this.state;

    return (
      <>
      {this.state.loading ? <Spinner /> : null}
        <div id="wrapper" className="wrapper">
          <div className="main-middle-area">
            {this.props.authenticate.loading ? <Spinner /> : null}
            <section className="general-account-section">
              <div className="general-account-div bg-image-common2">
                <HeaderContainer isLoggedIn={true} />

                <div className="main-page-root">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="general-account-root edu-verfication-link-div admin-verification-div">
                          <div className="full-account-div full-account-border-div">
                            <div className="ev-join-school-flex ev-join-school-flex-height">
                              <div className="general-title color-general-title01">
                                <div className="center-text-block">
                                  <h3>Please help us verify you</h3>
                                </div>
                              </div>

                              <div className="form-custom-div form-custom-600-div">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="tc-content-general-box mb-5">
                                      <h3>
                                        We need to know you belong to{" "}
                                        {data.school_name}
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12">
                                    <div className="yh_verify_adminIcon mb-4">
                                      <div className="yh_verify_iconBlock text-center">
                                        <img
                                          src={verify_admin}
                                          alt="verify_admin"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12">
                                    <div className="ev-join-school-div">
                                      <div className="tc-content-general-box">
                                        <h3>
                                          Click the button below to upload your
                                          school ID or any form of documentation that shows your name, title and school and we will verify you.
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
                                                  ? this.state.image.name
                                                  : "filename"
                                              }
                                              onChange={this.handleImageChange}
                                            />
                                            <label
                                              className="custom-file-label"
                                              htmlFor="customFile"
                                            >
                                              Upload file
                                            </label>
                                          </div>

                                          <div className="upload-file-div mt-25">
                                            <div className="upload-file-row">
                                              {this.state.image.length === 0
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
                                            <p style={{ color: "red" }}>
                                              {this.state.issentfailed
                                                ? this.state.msg
                                                : ""}
                                            </p>
                                          </div>
                                          {this.state.image.length !== 0
                                                ?
                                          <div className="link-div">
                                            <Link
                                              to="#"
                                              className="btn btn-link"
                                              onClick={this.handleSendtoYouHue}
                                            >
                                              Send to YouHue
                                            </Link>
                                          </div>
                                          : null}
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
                                  If you have any questions, please email us at{" "}
                                  <Link
                                    to="mailto:help@youhue.com"
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

                <FooterContainer isLoggedIn={true} />
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default UploadSchoolDocs;
