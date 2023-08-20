import React from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";

import "./UploadSchoolId.scss";

class UploadSchoolId extends React.Component {

  render() {
    return (
      <div id="wrapper" className="wrapper">
    
        <div className="main-middle-area">
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
                                            className="custom-file-input d-none"
                                            id="customFile"
                                            name="filename"
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
                                        </div>

                                        <div className="upload-file-div">
                                          <div className="upload-file-row">
                                            <p>school1.pdf</p>
                                            <p>myIDfront.jpeg</p>
                                          </div>
                                        </div>

                                        <div className="link-div">
                                          <Link to="#" className="btn btn-link">
                                            Send to YouHue
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="ev-join-school-bottom-div">
                              <div className="text-end-div">
                                <p>
                                  If you have any questions, please email us at
                                  <Link to="mailto:help@youhue.com" className="link">
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

export default UploadSchoolId;
