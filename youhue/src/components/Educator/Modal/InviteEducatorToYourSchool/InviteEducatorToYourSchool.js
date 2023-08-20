import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { isValidEmailAddress } from "../../../../utils/validators";
const InviteEducatorToYourSchool = ({
  show,
  onClose,
  schoolId,
  // getJoinSchoolRequest,
  InviteEducatorSchool,
}) => {
  const [eName, seteName] = useState("");
  //   const [eNameErr, seteNameErr] = useState("");
  const [eEmail, seteEmail] = useState("");
  const [eEmailErr, seteEmailErr] = useState("");
  const[btncolor,setbtncolor] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if(name==="name" && value===""){
      seteName("");
    }
    if(name==="email" && value===""){
      seteEmail("");
    }
    switch (name) {
      case "name":
        seteName(value);
        break;
      case "email":
        seteEmailErr("");
        seteEmail(value);
        break;

      default:
        break;
    }
  };
  const isFormValid = () => {
    let isValid = true;
    if (eEmail === "") {
      seteEmailErr("required");
      isValid = false;
    } else if (!isValidEmailAddress(eEmail)) {
      seteEmailErr("The email you entered is invalid");
      isValid = false;
    }
    return isValid;
  };
  const handleSubmit = (e) => {

    // e.preventDefault()
    const valid = isFormValid();
    const formData = {
      name: eName,
      email: eEmail,
      school_id: schoolId,
    };
    
    if (valid) {
      InviteEducatorSchool(formData)
        .then((res) => {
          setbtncolor({backgroundColor:"#652d90",color:"white"})
          if(res.code===400){
            seteEmailErr(res.message);
           
          }
          else{
            onClose();
          }
          //This for sucess response
         
          // getJoinSchoolRequest();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Modal
      size="lg"
      className="modal modal-custom modal-custom-new fade show"
      id="invite-an-educator-modal"
      show={show}
      onHide={onClose}
      centered
    >
      <div className=" modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={onClose}
            >
              <span className="custom-icon cancel-new-icon-01"></span>
            </button>
            <div className="heading-title-div">
              <h2 className="modal-title">
                <span className="block">Invite an educator</span>
                <span className="block">to your school</span>
              </h2>
            </div>
          </div>
          <div className="modal-body">
            <div className="educator-center-form-card-root">
              <div className="form-custom-div form-custom-400-div">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <input
                        value={eName}
                        type="text"
                        maxLength="30"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        onChange={(e)=>handleOnChange(e)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <input
                        value={eEmail}
                        type="email"
                        className={
                          eEmailErr === ""
                            ? "form-control"
                            : "form-control error"
                        }
                        placeholder="Email"
                        name="email"
                        onChange={(e)=>handleOnChange(e)}
                      />
                    </div>
                    {eEmailErr !== "" ? (
                      <div
                        style={{
                          fontFamily: "Omnes",
                          fontWeight: "400",
                          fontSize: "12px",
                          lineHeight: "20px",
                          color: "#3f3f44",
                          letterSpacing: "0.29px",
                          textAlign: "left",
                          padding: "0 0 5px 0",
                        }}
                      >
                        <p
                          style={{
                            color: "#e25674",
                            lineHeight: "16px",
                            fontSize: "14px",
                          }}
                        >
                          {eEmailErr}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="button-row button-row-add-school">
                      <div className="center-side-button">
                        <button
                        style={{backgroundColor:btncolor.backgroundColor,color:btncolor.color}}
                          className="btn btn-common-primary btn-primary-width240"
                          disabled={eName === "" || eEmail === ""}
                          onClick={()=>handleSubmit()}
                        >
                          Send invite
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InviteEducatorToYourSchool;
