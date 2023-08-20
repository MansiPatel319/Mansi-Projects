import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "../../Dashboard/Dashboard.scss";
import {
  Link
} from "react-router-dom";

class ViewClassCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBackGroundVisible: true,
      qrcode: this.props.classQRcode
    };
  }
  handleVisibility = () => {
    // var backdrop = document.getElementsByClassName("modal-backdrop");
    if (this.state.isBackGroundVisible) {
      this.setState({ isBackGroundVisible: false });
      // document.getElementsByClassName("modal-backdrop").css({opacity:"1"})
    } else {
      this.setState({ isBackGroundVisible: true });
    }
    // console.log(document.getElementsByClassName("modal-backdrop"));
  };
  handleDownloadPdf = () => {
    const { parentData } = this.props;
    const { history, educator } = parentData
    localStorage.setItem("class_Id",this.props.classId)
    localStorage.setItem("const_url","/download/classCode/")
    window.open("/download/classCode/");
  }
  render() {
    return (
      <>
        <Modal
          size="lg"
          className="modal modal-custom modal-custom-new fade"
          show={this.props.show}
          onHide={this.props.onClose}
          centered
        >
          <div className=" modal-lg modal-dialog-centered" id="view-class-access-code-modal">
            <div className="modal-content">
              <Modal.Header className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={this.props.onClose}
                >
                  <span className="custom-icon cancel-new-icon-01"></span>
                </button>
                <div className="heading-title-div">
                  <h2 className="modal-title">
                    How will your students access your class?
                  </h2>
                </div>
              </Modal.Header>
              <Modal.Body size="lg">
                <div className="modal-body view-class-access-code-body">
                  <div className="view-download-div">
                    <div className="view-download-inner-div">
                      <button
                        className="btn btn-general-transparent btn-view mr-10"
                        onClick={this.handleVisibility}
                      >
                        {" "}
                        <span
                          className={`custom-icon ${this.state.isBackGroundVisible
                            ? "eye-hidden-icon"
                            : "eye-icon"
                            }`}
                        ></span>{" "}
                      </button>
                      <Link to="#" onClick={this.handleDownloadPdf} target="_blank" className="btn btn-general-transparent btn-download"> <span className="custom-icon download-icon"></span> </Link>
                    </div>
                  </div>

                  <div className="view-access-code-card-root">
                    <div className="view-access-code-card-row-root">
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="view-access-code-card view-access-code-card01">
                            <div className="view-access-code-card-row">
                              <div className="view-access-code-card-top">
                                <div className="code-bx-div">
                                  <h2>{this.props.classcode}</h2>
                                </div>
                              </div>

                              <div className="view-access-code-card-middle">
                                <div className="view-access-code-card-middle-left">
                                  <span className="span-icon">
                                    <span className="custom-icon keyboard-icon-rounded"></span>
                                  </span>
                                </div>
                                <div className="view-access-code-card-middle-right">
                                  <div className="content-div">
                                    <h4>Class Access Code</h4>
                                    <p>
                                      Students log in by typing your 10-digit
                                      class access code.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="view-access-code-card view-access-code-card02">
                            <div className="view-access-code-card-row">
                              <div className="view-access-code-card-top">

                                <div className="thumb-bx-div">
                                  <img
                                    src={this.state.qrcode}
                                    className="img-fluid img-qr"
                                    alt="QR"
                                  />
                                </div>
                              </div>

                              <div className="view-access-code-card-middle">
                                <div className="view-access-code-card-middle-left">
                                  <span className="span-icon">
                                    <span className="custom-icon qr-code-icon-rounded"></span>
                                  </span>
                                </div>
                                <div className="view-access-code-card-middle-right">
                                  <div className="content-div">
                                    <h4>Class QR Code</h4>
                                    <p>
                                      Students log in by scanning your class QR
                                      code.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="notes-blm-div">
                      <p>
                        * Your students need to enter your class once per
                        device.
                      </p>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </div>
          </div>
        </Modal>
        <div
          className="fade modal-backdrop show"
          style={
            this.state.isBackGroundVisible ? {
              backgroundColor: "#000", zIndex: "99999", opacity: "0"
            } : {
              backgroundColor: "#FCFAF6", opacity: "1", zIndex: "99999"
            }
          }
        ></div>
      </>
    );
  }
}

export default ViewClassCode;
