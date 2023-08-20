import React from "react";
import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";
import { Link } from "react-router-dom";
import logoIcon from "../../../../assets/images/logo-icon.png";

import "./FindSchool.scss";
import InputComponent from "../../../UI/InputComponent";

class FindSchool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSchool: "",
      schoolList: [],
      isShowCancelButton: localStorage.getItem("isRedirected"),
      educatorEmail: "",
    };
    this.wrapperRef1 = React.createRef();
  }
  componentDidMount() {
    localStorage.setItem("noRedirect", true);
    localStorage.setItem("const_url", "");
    document.addEventListener("mousedown", this.handleClickOutside);
    // this.activateAccount();
    this.props.getAccountDetails();
  }
  handleClickOutside = (event) => {
    if (
      this.wrapperRef1 &&
      !this.wrapperRef1?.current?.contains(event.target)
    ) {
      this.setState({ searchSchool: "", schoolList: [] });
    }
  };

  // activateAccount = () => {
  //   const { match } = this.props;
  //   const uuid = match.params.uuid;
  //   this.props
  //     .activateAccount(uuid)
  //     .then((res) => {
  //       const {data:{email},status} =res

  //       this.setState({
  //         educatorEmail: email
  //       })
  //       if (status) {
  //         this.setState({ message: "Your email has been verified!" });
  //       } else {
  //         this.setState({ message: res.message });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentWillUnmount = () => {
    localStorage.removeItem("isRedirected");
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  handleFieldChange = (event) => {
    const { value } = event.target;
    this.setState({ searchSchool: value }, () => {
      if (this.state.searchSchool) {
        this.props
          .findSchool({ searchSchool: this.state.searchSchool })
          .then((res) => {
            this.setState({
              schoolList: res.data,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.setState({
          schoolList: [],
        });
      }
    });
  };
  redirectToJoinSchool = (id) => {
    const { match } = this.props;
    const email = match.params.email;
    this.props.history.push(`/join-school/${id}/${email}`);
  };

  render() {
    const { educatorData } = this.props.educator;
    const { schoolList } = this.state;
    return (
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area">
          <section className="general-account-section">
            <div className="general-account-div bg-image-common2">
              <HeaderContainer isLoggedIn />
              <div className="main-page-root">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="general-account-root find-school-link-div">
                        <div
                          className={
                            educatorData.school_name === ""
                              ? "full-account-div full-account-border-div cancel-main-div"
                              : "full-account-div full-account-border-div"
                          }
                        >
                          {/* {this.state.isShowCancelButton && ( */}
                          {educatorData.school_name === "" && (
                            <button
                              style={{ zIndex: "99999", position: "absolute" }}
                              className="btn btn-general-link btn-general-edit btn-delete-icon"
                              onClick={() => {
                                this.props.history.push("/educator/home");
                              }}
                            >
                              <span className="custom-icon cancel-round-icon"></span>
                            </button>
                          )}

                          <div className="general-title">
                            <div className="center-text-block pb-0">
                              <h2>
                                <span className="block">
                                  To get started, <br />
                                  let’s find your school!
                                </span>
                              </h2>
                            </div>
                          </div>

                          <div className="form-custom-div form-custom-600-div">
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="search-div">
                                  <div className="search-row">
                                    <div className="search-input-box">
                                      <InputComponent
                                        inputType="text"
                                        inputClassName="form-control form-search"
                                        inputID="form-search"
                                        inputPlaceholder="Search by school name"
                                        maxLength="40"
                                        onInputChange={this.handleFieldChange}
                                      />
                                    </div>
                                  </div>
                                  {this.state.searchSchool && (
                                    <>
                                      <div
                                        className="dropdown-menu dropdown-menu-card"
                                        id="search-dropdown"
                                        style={{ display: "block" }}
                                      >
                                        <div className="back-dropdown"></div>
                                        <div
                                          className="card-body"
                                          ref={this.wrapperRef1}
                                        >
                                          <div className="list-group">
                                            <div className="list-group-item">
                                              {schoolList &&
                                              schoolList.length > 0
                                                ? schoolList.map((res) => {
                                                    return (
                                                      <div
                                                        className="typeh-list-div"
                                                        key={res.id}
                                                      >
                                                        <Link
                                                          onClick={() =>
                                                            this.redirectToJoinSchool(
                                                              res.id
                                                            )
                                                          }
                                                          to="#"
                                                          // to={`/join-school/${res.id}/${this.state.educatorEmail}`}
                                                          className="typeh-list-row-div"
                                                        >
                                                          <div className="typeh-list-left-div">
                                                            <h4 className="text-h4">
                                                              {res.school_name}
                                                            </h4>
                                                            <p>
                                                              {res.area_street +
                                                                " , " +
                                                                res.city_town +
                                                                " , " +
                                                                res.country}
                                                            </p>
                                                          </div>
                                                          {res.number_of_educators >
                                                            0 && (
                                                            <div className="typeh-list-right-div">
                                                              <div className="yh-ed-div">
                                                                <div className="yh-ed-row-div">
                                                                  <div className="thumb-image">
                                                                    <img
                                                                      src={
                                                                        logoIcon
                                                                      }
                                                                      className="img-fluid"
                                                                      alt="img"
                                                                    />
                                                                  </div>
                                                                  <div className="text-div">
                                                                    <p>
                                                                      {res.number_of_educators ===
                                                                      1
                                                                        ? res.number_of_educators +
                                                                          " " +
                                                                          " YouHue Educator"
                                                                        : res.number_of_educators +
                                                                          " " +
                                                                          "YouHue Educators"}
                                                                    </p>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )}
                                                        </Link>
                                                      </div>
                                                    );
                                                  })
                                                : null}
                                            </div>
                                            {/* {this.state.searchSchool && ( */}

                                            <div className="list-group-item-bottom">
                                              <div className="typeh-list-div">
                                                <p>
                                                  <Link
                                                    to="/add-school"
                                                    className="link"
                                                  >
                                                    Can’t find school?
                                                    <span className="text-decoration">
                                                      &nbsp;Add it now
                                                    </span>
                                                  </Link>
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
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
    );
  }
}

export default FindSchool;
