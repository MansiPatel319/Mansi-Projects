import React from "react";
import { Link, useHistory } from "react-router-dom";
import InputComponent from "../../../../UI/InputComponent";
import "./NoSchoolAssociated.scss";
import "../../MyAccount.scss";

const NoSchoolAssociated = ({email}) => {
  const history = useHistory()
 
 
  const clickOnJoinSchool = () =>{
    localStorage.setItem("isRedirected","true")
    localStorage.setItem("email", email);
    history.push(`/find-school/${email}`)
  }
  
    return (
      <>
        <div className="main-my-tab-right-div">
          <div className="main-my-tab-right-inner">
            <div className="form-custom-div custom-school-div">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="form-group form-group-custom">
                    <div className="form-group-row">
                      <div className="label-div">
                        <label>School</label>
                      </div>
                      <div className="input-div">
                        <InputComponent
                          inputType="text"
                          inputPlaceholder=""
                          inpValue="None"
                          inputClassName="form-control"
                          inpDisabled={true}
                        />
                      </div>
                      <div className="info-right-div d-flex link-row-info">
                        <div className="link-div">
                          <Link to="#" onClick={()=> clickOnJoinSchool()} className="link btn-link">
                            Join a school
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <p className="custom-prag-text">
                    <span className="txt-span">Role: </span>
                    <span className="ans-span">Educator</span>
                  </p>

                  <hr className="hr-custom-row01" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="custom-text-div">
                  <p className="prag-text">
                    You are not associated with any school. Please join another
                    school to continue using YouHue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  
}

export default NoSchoolAssociated;
