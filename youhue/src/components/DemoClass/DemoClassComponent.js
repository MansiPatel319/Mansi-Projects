import React from "react";
import Select2 from "react-select2-wrapper";
import { Link } from "react-router-dom";
import "../../styles/style.css";
import HeaderContainer from "../../containers/Common/Header";
import FooterContainer from "../../containers/Common/Footer";

const DemoClassComponent = () => {
  const data = [{ id: 1, text: "Demo Class", value: "Demo Class" }];
  return (
    <>
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
                                <ul className="tab-list-ul">
                                  <li className="tab-item active">
                                    <Link to="#" className="link"> Admin </Link>
                                    {/* <Link
                                      to="#"
                                      className="link"
                                    >
                                      {" "}
                                      Admin{" "}
                                    </Link> */}
                                  </li>
                                  <li className="tab-item">
                                    <Link to="/demoinsight" className="link">
                                      {" "}
                                      Insight{" "}
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="yh-tab-body-div">
                              <div className="dash-class-view-main-root">
                                <div className="top-info-header-group-div">
                                  <div className="row justify-content-between">
                                    <div className="col-lg-5 col-md-6 left-6">
                                      <div className="top-info-header-group-left">
                                        <div className="dropdown-group-div">
                                          <div className="dropdown-group-box user-dropdown-group-box">
                                            <div className="icon-box user-icon-box">
                                              <span className="custom-icon user-group-new-icon"></span>
                                            </div>
                                            <div className="selectbox-inline">
                                              <div className="select-box select-common select-box-group select-custom2">
                                                <Select2
                                                  className="js-select2"
                                                  // value={this.state.selectedClass}
                                                  data={data}
                                                  options={{
                                                    placeholder: "Demo Class",
                                                  }}
                                                />
                                              </div>
                                            </div>
                                            {/* <div className="selectbox-inline">
                                              <div className="select-box select-common select-box-group select-custom2">
                                                <select
                                                  className="js-select2"
                                                  id="group-name-select"
                                                >
                                                  <option> </option>
                                                  <option selected>
                                                    Ms. Green’s 4th Grade
                                                  </option>
                                                  <option>
                                                    Ms. Green’s 4th Grade
                                                  </option>
                                                  <option>
                                                    Ms. Green’s 4th Grade
                                                  </option>
                                                </select>
                                              </div>
                                            </div> */}
                                          </div>
                                        </div>

                                        <div className="access-code-box">
                                          <p>Your Class Access Code:</p>
                                          <h4>
                                            XXXXXXXXXX
                                            <Link
                                              to="#"
                                              className="arrow-link"
                                              data-toggle="modal"
                                              data-target="#view-class-access-code-modal"
                                            >
                                              {" "}
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
                                            <h2>5</h2>
                                            <p>Students</p>
                                          </div>
                                          <div className="count-view-box">
                                            <h2>2</h2>
                                            <p>Educators</p>
                                          </div>
                                          <div className="count-view-box">
                                            <h2>10</h2>
                                            <p>Logs</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="main-dashboard-body">
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="box-heading-div">
                                        <div
                                          className="title-heading-div"
                                          id="class-name-text"
                                        >
                                          <h2>Demo Class</h2>{" "}
                                          <Link
                                            to="#"
                                            className="btn-transparent edit-btn"
                                            id="edit-class-button"
                                          >
                                            {" "}
                                            <span className="custom-icon edit-icon"></span>{" "}
                                          </Link>
                                        </div>

                                        <div
                                          className="class-group-root-div d-none"
                                          id="class-input-group"
                                        >
                                          <div className="form-div class-form-div">
                                            <div className="form-group class-form-group">
                                              <div className="form-group-row">
                                                <div className="input-group-box">
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="class-name"
                                                    // value=""
                                                  />
                                                </div>
                                                <div className="button-group-div">
                                                  <button
                                                    className="btn btn-common-outline btn-primary2 btn-primary2-fill mr-5px btn-save-class"
                                                    id="btn-save-new-class"
                                                  >
                                                    Save
                                                  </button>
                                                  <button
                                                    className="btn btn-common-outline btn-primary3 btn-primary3-fill btn-cancel-class"
                                                    id="btn-cancel-class"
                                                  >
                                                    Cancel
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="primary-common-box primary-educators-box">
                                        <div className="primary-header-box">
                                          <div className="row">
                                            <div className="col-lg-12">
                                              <div className="primary-header-box-row">
                                                <div className="primary-header-box-left">
                                                  <h3>
                                                    Educators{" "}
                                                    <Link
                                                      to="#"
                                                      className="btn btn-general-link btn-general-add btn-plus-icon"
                                                    >
                                                      {" "}
                                                      <span className="custom-icon plus-new-icon"></span>{" "}
                                                    </Link>
                                                  </h3>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="primary-body-box">
                                          <div className="row">
                                            <div className="col-lg-12">
                                              <div className="primary-body-box-row">
                                                <div className="primary-table-custom">
                                                  <div className="primary-table-header">
                                                    <div className="tr-div">
                                                      <div className="th-div column-div col-40">
                                                        <h4>Name</h4>
                                                      </div>
                                                      <div className="th-div column-div col-40">
                                                        <h4>Email</h4>
                                                      </div>
                                                      <div className="th-div column-div col-20"></div>
                                                    </div>
                                                  </div>

                                                  <div className="primary-table-body">
                                                    <div className="tr-div">
                                                      <div className="td-div column-div col-40">
                                                        <p data-title="Name">
                                                          Educatoe 1
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-40">
                                                        <p data-title="Email">
                                                          educator1@youhue.com
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-20 edit-col">
                                                        <Link
                                                          to="#"
                                                          className="btn btn-general-link btn-general-edit btn-delete-icon"
                                                          data-toggle="modal"
                                                          data-target="#remove-educators-modal"
                                                        >
                                                          {" "}
                                                          <span className="custom-icon cancel-round-icon"></span>{" "}
                                                        </Link>
                                                      </div>
                                                    </div>

                                                    <div className="tr-div">
                                                      <div className="td-div column-div col-40">
                                                        <p data-title="Name">
                                                          Educatoe 2
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-40">
                                                        <p data-title="Email">
                                                          educator2@youhue.com
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-20 edit-col">
                                                        <Link
                                                          to="#"
                                                          className="btn btn-general-link btn-general-edit btn-delete-icon"
                                                          data-toggle="modal"
                                                          data-target="#remove-educators-modal"
                                                        >
                                                          {" "}
                                                          <span className="custom-icon cancel-round-icon"></span>{" "}
                                                        </Link>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="primary-common-box primary-students-box">
                                        <div className="primary-header-box">
                                          <div className="row">
                                            <div className="col-lg-12">
                                              <div className="primary-header-box-row">
                                                <div className="primary-header-box-left">
                                                  <h3>
                                                    Students{" "}
                                                    <Link
                                                      to="#"
                                                      className="btn btn-general-link btn-general-add btn-plus-icon"
                                                    >
                                                      {" "}
                                                      <span className="custom-icon plus-new-icon"></span>{" "}
                                                    </Link>
                                                  </h3>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="primary-body-box">
                                          <div className="row">
                                            <div className="col-lg-12">
                                              <div className="primary-body-box-row">
                                                <div className="primary-table-custom primary-students-custom">
                                                  <div className="primary-table-header">
                                                    <div className="tr-div">
                                                      <div className="th-div column-div col-40">
                                                        <h4>Name</h4>
                                                      </div>
                                                      <div className="th-div column-div col-40">
                                                        <h4>Passcode</h4>
                                                      </div>
                                                      <div className="th-div column-div col-20"></div>
                                                    </div>
                                                  </div>

                                                  <div className="primary-table-body">
                                                    <div className="tr-div">
                                                      <div className="td-div column-div col-40">
                                                        <p data-title="Name">
                                                          Student A
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-40">
                                                        <p data-title="Passcode">
                                                          S001
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-20 edit-col">
                                                        <div className="btn-group-edit-login-div">
                                                          <Link
                                                            to="#"
                                                            className="btn btn-general-link btn-general-edit btn-edit-btn mr-10 demo"
                                                          >
                                                            {" "}
                                                            <span className="custom-icon edit-icon"></span>{" "}
                                                          </Link>
                                                          <Link
                                                            to="#"
                                                            className="btn btn-general-link btn-login-btn demo"
                                                          >
                                                            {" "}
                                                            <span className="custom-icon login-new-icon"></span>{" "}
                                                          </Link>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div className="tr-div">
                                                      <div className="td-div column-div col-40">
                                                        <p data-title="Name">
                                                          Student B
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-40">
                                                        <p data-title="Passcode">
                                                          S002
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-20 edit-col">
                                                        <div className="btn-group-edit-login-div">
                                                          <Link
                                                            to="#"
                                                            className="btn btn-general-link btn-general-edit btn-edit-btn mr-10 demo"
                                                          >
                                                            {" "}
                                                            <span className="custom-icon edit-icon"></span>{" "}
                                                          </Link>
                                                          <Link
                                                            to="#"
                                                            className="btn btn-general-link btn-login-btn demo"
                                                          >
                                                            {" "}
                                                            <span className="custom-icon login-new-icon"></span>{" "}
                                                          </Link>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div className="tr-div">
                                                      <div className="td-div column-div col-40">
                                                        <p data-title="Name">
                                                          Student C
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-40">
                                                        <p data-title="Passcode">
                                                          S003
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-20 edit-col">
                                                        <div className="btn-group-edit-login-div">
                                                          <Link
                                                            to="#"
                                                            className="btn btn-general-link btn-general-edit btn-edit-btn mr-10 demo"
                                                          >
                                                            {" "}
                                                            <span className="custom-icon edit-icon"></span>{" "}
                                                          </Link>
                                                          <Link
                                                            to="#"
                                                            className="btn btn-general-link btn-login-btn demo"
                                                          >
                                                            {" "}
                                                            <span className="custom-icon login-new-icon"></span>{" "}
                                                          </Link>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div className="tr-div">
                                                      <div className="td-div column-div col-40">
                                                        <p data-title="Name">
                                                          Student D
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-40">
                                                        <p data-title="Passcode">
                                                          S004
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-20 edit-col">
                                                        <div className="btn-group-edit-login-div">
                                                          <Link
                                                            to="#"
                                                            className="btn btn-general-link btn-general-edit btn-edit-btn mr-10"
                                                          >
                                                            {" "}
                                                            <span className="custom-icon edit-icon"></span>{" "}
                                                          </Link>
                                                          <Link
                                                            to="#"
                                                            className="btn btn-general-link btn-login-btn demo"
                                                          >
                                                            {" "}
                                                            <span className="custom-icon login-new-icon"></span>{" "}
                                                          </Link>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div className="tr-div">
                                                      <div className="td-div column-div col-40">
                                                        <p data-title="Name">
                                                          Student E
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-40">
                                                        <p data-title="Passcode">
                                                          S005
                                                        </p>
                                                      </div>
                                                      <div className="th-div column-div col-20 edit-col">
                                                        <div className="btn-group-edit-login-div">
                                                          <Link
                                                            to="#"
                                                            className="btn btn-general-link btn-general-edit btn-edit-btn mr-10"
                                                          >
                                                            {" "}
                                                            <span className="custom-icon edit-icon"></span>{" "}
                                                          </Link>
                                                          <Link
                                                            to="#"
                                                            className="btn btn-general-link btn-login-btn demo"
                                                          >
                                                            {" "}
                                                            <span className="custom-icon login-new-icon"></span>{" "}
                                                          </Link>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="primary-footer-box">
                                          <div className="row">
                                            <div className="col-lg-12">
                                              <div className="primary-footer-box-row">
                                                <div className="print-button-right">
                                                  <Link
                                                    to="#"
                                                    className="btn btn-general-link btn-print-pass-code"
                                                  >
                                                    Download Passcode List
                                                  </Link>
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
                  </div>
                </div>
              </div>

              <FooterContainer />
            </div>
          </section>
        </div>
      </div>

      <div
        className="modal modal-custom modal-custom-new fade"
        id="view-class-access-code-modal"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span className="custom-icon cancel-new-icon-01"></span>
              </button>
              <div className="heading-title-div">
                <h2 className="modal-title">
                  How will your students access your class?
                </h2>
              </div>
            </div>

            <div className="modal-body view-class-access-code-body">
              <div className="view-download-div">
                <div className="view-download-inner-div">
                  <button className="btn btn-general-transparent btn-view mr-10">
                    {" "}
                    <span className="custom-icon eye-hidden-icon"></span>{" "}
                  </button>
                  <button className="btn btn-general-transparent btn-download">
                    {" "}
                    <span className="custom-icon download-icon"></span>{" "}
                  </button>
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
                              <h2>A80283EM9L</h2>
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
                                  Students log in by typing your 10-digit class
                                  access code.
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
                                src="assets/images/qr-image.png"
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
                    * Your students need to enter your class once per device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DemoClassComponent;
