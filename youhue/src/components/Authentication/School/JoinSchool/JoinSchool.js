import React from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";

import "./JoinSchool.scss";

class JoinSchool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      educator: props.educator
    };
  }
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.getSchoolDetails();
    this.props.getAccountDetails()
  }
  componentDidUpdate(prevProps)
  {
    if(prevProps.educator!== this.props.educator)
    {
      this.setState({
        educator: this.props.educator
      })
    }
  }
  getSchoolDetails = () => {
    const { match } = this.props;
    const school_id = match.params.id;
    this.props
      .getSchoolDetails(school_id)
      .then((res) => {
        if (res.status) {
          this.setState({ data: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleJoinSchoolEvent = () => {
    this.joinschool();
  };

  joinschool = () => {
    
    var { history } = this.props;
    const { match } = this.props;
    const email = match.params.email;
    var data = {
      school_id: this.state.data.id,
      email: email,
    };
    if(this.state.educator?.educatorData?.is_locked)
    {
      this.props
      .joinSchoolWithPut(data)
      .then((res) => {
        if (res.status) {

          localStorage.setItem("token", res.data["token"]);
          localStorage.setItem("educatorId", res.data["user"]);
          if(res.data["is_demo_class"])
          {

            localStorage.setItem("isDemoClass",res.data["is_demo_class"])
          }
          else{
            localStorage.removeItem("isDemoClass")
          }
          history.replace("/educator/home");

          this.setState({ data: res.data });
          // history.push("/educator/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }   
    else{
      this.props
        .joinSchool(data)
        .then((res) => {
          if (res.status) {
  
            localStorage.setItem("token", res.data["token"]);
            localStorage.setItem("educatorId", res.data["user"]);
            if(res.data["is_demo_class"])
            {
  
              localStorage.setItem("isDemoClass",res.data["is_demo_class"])
            }
            else{
              localStorage.removeItem("isDemoClass")
            }
            history.replace("/educator/home");
  
            this.setState({ data: res.data });
            // history.push("/educator/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
   
  };
  handleClickOnBack=()=>{
  var { history } = this.props;
  const { match } = this.props;
  const email = match.params.email;
  history.replace(`/find-school/${email}`);
    // history.goBack()
  }

  render() {
    const school_detail = this.state.data;
    return (
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area">
          <section className="general-account-section">
            <div className="general-account-div bg-image-common2">
              <HeaderContainer isLoggedIn/>
              <div className="main-page-root">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="general-account-root find-school-link-div">
                        <div className="full-account-div full-account-border-div">
                          <div className="general-title color-general-title01">
                            <div className="center-text-block">
                              <h3>{school_detail.school_name}</h3>
                              <p>
                                {school_detail.area_street},{" "}
                                {school_detail.city_town},{" "}
                                {school_detail.country}
                              </p>
                            </div>
                            <hr className="custom-hr01 mt-0"></hr>
                          </div>

                          <div className="form-custom-div form-custom-600-div">
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="fs-join-school-div">
                                  <div className="tc-content-general-box">
                                    <p>
                                      {school_detail &&
                                      school_detail.number_of_educators ===
                                        0 ? (
                                        <span className="block">
                                          Looks like you're the first one here.
                                          <br />
                                          Please share YouHue with other
                                          educators in your school.
                                        </span>
                                      ) : (
                                        <span>
                                          {" "}
                                          Join the{" "}
                                          {
                                            school_detail.number_of_educators
                                          }{" "}
                                          educators already using YouHue at{" "}
                                          {school_detail.school_name}!
                                        </span>
                                      )}
                                    </p>
                                  </div>

                                  <div className="button-row pt-15">
                                    <div className="center-side-button">
                                      <Link
                                        to="#"
                                        className="btn btn-common-primary btn-common-primary-link btn-primary-width240"
                                        onClick={this.handleJoinSchoolEvent}
                                      >
                                        Join this school
                                      </Link>
                                      <div className="link-div">
                                        <Link
                                        to="#"                           
                                          className="btn btn-link"
                                          onClick={()=>this.handleClickOnBack()}
                                        >
                                          Change school
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
              <FooterContainer />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default JoinSchool;
