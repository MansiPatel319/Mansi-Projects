import React from "react";
import { Link } from "react-router-dom";

import HeaderContainer from "../../../containers/Common/Header";
import FooterContainer from "../../../containers/Common/Footer";

import "./ActivateAccount.scss";
import Spinner from "../../Spinner/Spinner";

class ActivateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Invalid Activation Link",
      image: [],
      issentfailed: true,
      msg: "",
      loading: false
    };
  }

  componentDidMount() {
    localStorage.setItem("noRedirect", true);
    localStorage.setItem("const_url","")
    this.activateAccount();
  }

  activateAccount = () => {
    const { match } = this.props;
    const uuid = match.params.uuid;
    this.props
      .activateAccount(uuid)
      .then((res) => {
        if (res.status) {
          this.setState({ message: "Your email has been verified!" });
        } else {
          this.setState({ message: res.message });
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
      this.setState({ issentfailed: false, loading: true });
      var { match, history } = this.props;
      var uuid = match.params.uuid;
      let formData = new FormData();
      formData.append("educator_id", uuid);
      var files = this.state.image;
      for (let i = 0; i < files.length; i++) {
        formData.append("document_image", files[i]);
      }
      this.props
        .uploadSchoolId(formData)
        .then((res) => {
          this.setState({
            loading: false
          })
          if (res.status) {
            history.push("/school-id-sent/");
          }
        })
        .catch((err) => {
          this.setState({
            loading: false
          })
          console.log(err);
        });
    }
    this.setState({ msg: "Please Choose files" });
  };

  render() {
    return (
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area">
        {this.state.loading ? <Spinner /> : null}
          {this.props.authenticate.loading ? <Spinner /> : null}
          <section className="general-account-section">
            <div className="general-account-div bg-image-common2">
              <HeaderContainer />
              <div className="main-page-root">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="general-account-root edu-verfication-link-div">
                        <div className="full-account-div full-account-border-div">
                          <div className="general-title color-general-title01">
                            <div className="center-text-block">
                              <h3>
                                Verify that you belong to the school you have
                                chosen
                              </h3>
                            </div>

                            <hr className="custom-hr01 mt-0" />
                          </div>

                          <div className="ev-join-school-flex">
                            <div className="form-custom-div form-custom-600-div">
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="ev-join-school-div">
                                    <div className="tc-content-general-box">
                                      <p>
                                        Click the button below to upload your
                                        school ID
                                      </p>
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
                                            for="customFile"
                                          >
                                            Upload file
                                          </label>
                                        </div>

                                        <div className="prag-div">
                                          <p>You may upload multiple files.</p>
                                          {/* <p style={{ color: "red" }}>
                                            {this.state.issentfailed
                                              ? this.state.msg
                                              : ""}
                                          </p> */}
                                        </div>

                                        <div className="upload-file-div">
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
                                        </div>
                                        {this.state.image.length &&
                                        <div className="link-div">
                                          {" "}
                                          <Link
                                            to="#"
                                            className="btn btn-link"
                                            onClick={this.handleSendtoYouHue}
                                          >
                                            Send to YouHue
                                          </Link>{" "}
                                        </div> }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="ev-join-school-bottom-div">
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
              </div>
              <FooterContainer />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ActivateAccount;
