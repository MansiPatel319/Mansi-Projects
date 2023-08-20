import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "../../../containers/Common/Header";
import FooterContainer from "../../../containers/Common/Footer";

import character from "../../../assets/images/character/character-03.svg";

import "./ActivateAccount.scss";

class VerifiedEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  activateAccount = () => {
    const { match } = this.props;
    const uuid = match.params.uuid;
  
    this.props
      .activateAccount(uuid)
      .then((res) => {
        const {data:{email},status,code} =res
        
        if(code === 200){
          this.setState({loading:true})
          this.setState({ message: "Your email has been verified!" });
        }
        else if(code === 400){
          this.setState({loading:false})
          this.setState({ message: "" });
          this.props.history.push(
            "/login"
          );
        }
        this.setState({
          educatorEmail: email
        })
        if (status) {
          this.setState({ message: "Your email has been verified!" });
        } else {
          this.setState({ message: res.message });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
  
    localStorage.setItem("const_url","")
    this.activateAccount();
  }
  render() {

    return (
     <>
      {this.state.loading !== false &&
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
                            <div className="center-text-block varifyemail" >
                              <h3>Your email has been   <br></br> verified  !</h3>
                            </div>

                            <hr className="custom-hr01 mt-0" />
                          </div>

                          <div className="ev-join-school-flex">
                            <div className="form-custom-div">
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="ev-join-sending-div">
                                    <div className="tc-content-general-box tc-content-general-box-top">
                                      {/* <p>
                                        Thank you for sending us your school ID.
                                        We will review it and verify you within
                                        48 hours.
                                      </p> */}
                                    </div>

                                    <div className="chr-div">
                                      <div className="img-div">
                                        <img
                                          src={character}
                                          className="img-fluid"
                                          alt="chr"
                                        />
                                      </div>
                                    </div>

                                    <div className="tc-content-general-box tc-content-general-box-bottom">
                                    {/* <div className="button-row button-row-add-school">
                    <div className="center-side-button text-center">
                    <Link
                                          to="/login"
                                          style={{ color: "#3f3f44" }}
                                        >
                                          <u>GO Login</u>
                                        </Link>
                    </div>
                  </div>    */}
                    <div className="button-row button-row-add-school">
                    <div className="center-side-button text-center">
                      <Link
                        className="btn btn-common-primary btn-primary-width240"
                        to="/login"
                       
                        // disabled={this.state.isImportDisabled}
                        // onClick={this.handleStudentSaveModal}
                      >
                       GO to Login
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
  
            

              <FooterContainer />
            </div>
          </section>
        </div>
      </div>
    }
     </>
     
    );
  }
}

export default VerifiedEmail;
