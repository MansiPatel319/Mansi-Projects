import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";
import MyAccountLeftMenu from "../MyAccountLeftMenu";
import profile_pic from "../../../../assets/images/No_image_available.svg";
import Profilemodal from "../../Modal/Profilemodal/Profilemodal";
import "./EditProfile.scss";
import "../MyAccount.scss";
import "../../../../styles/style.css";
import NotificationBannerComponent from "../../../Common/NotificationBannerComponent/NotificationBannerComponent";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email_disabled: true,
      selectedFile: "",
      selectedFileURL: "",
      isprofilemodalshow:false,
      btncolor:{},
      formData: {
        professor_id:this.props.educator.id,
        professor_name: this.props.educator.professor_name,
        email: this.props.educator.email,
        profile_image: this.props.educator.profile_image,
      },
      formError: {
        professor_name_error: false,
        professor_name_message: "",
        email_error: false,
        email_message: "",
      },
      isDisabledSave: true,
    };
  }

  async componentDidMount() {
    localStorage.setItem("const_url","")
    await this.props.getAccountDetails();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.educator.professor_name !==
        this.props.educator.professor_name ||
      prevProps.educator.email !== this.props.educator.email ||
      prevProps.educator.profile_image !== this.props.educator.profile_image
    ) {
      this.setState({ formData: this.props.educator });
    }
  }

  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    if (name === "professor_name") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Name is required..";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "email") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Email is required.";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    this.setState({ formError });
  };
  checkFiledsArenotBlank = (filed2) => {
    let flag = false;
    if (filed2 !== "") {
      flag = true;
    }
    return flag;
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
     if (value.trim() === "") {
      this.setState({
        isSaveDisabled: true,
      });
    } else {
      this.setState({
        isSaveDisabled: false,
      });
      const testForField = this.checkFiledsArenotBlank(value);
      if (testForField) {
        this.setState({ isDisabledSave: false });
      } else {
        this.setState({ isDisabledSave: true });
      }
    }
   
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
  };

  handleImggeFieldChange = () => {
    
    this.setState({
      isprofilemodalshow: true,
     
    });
  };

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.professor_name.trim() === "") {
      formError.professor_name_error = true;
      formError.professor_name_message = "Please enter professor name.";
      isFormValid = false;
    } else {
      formError.professor_name_error = false;
      formError.professor_name_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };

   handleSubmitEdit = () => {
    const { formData } = this.state;
    let formdata = new FormData();
    formdata.append("professor_name", this.state.formData.professor_name);
    formdata.append("email", this.state.formData.email);
    formdata.append("profile_image", this.state.selectedFile);

    const isValid = this.validateForm(formData);
    formData["profile_image"] = this.state.selectedFile;
    if (isValid) {
      this.props
        .editProfile(formdata)
        .then(async(res) => {
          if (res.status) {
            
  await this.props.getAccountDetails();
  //  this.setState({btncolor:{backgroundColor:"#652d90",color:"white"}})
   this.setState({ isDisabledSave: true,isprofilemodalshow:false });
            // this.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
          } else {
            // this.props.addToast(res.message, {
            //   appearance: "error",
            //   autoDismiss: true,
            // });
          }
        })
        .catch((err) => {
          this.setState({
            isprofilemodalshow: false,
           
          });
          console.log(err);
        });
    }
  };
  render() {
    const details = this.props.educator;
    const formError = this.state.formError;
    return (
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area dashboard-middle-area">
          <section className="general-dashboard-section bg-image-common">
            <div className="general-dashboard-div background-color-main">
              <HeaderContainer isLoggedIn={true} />
              <div className="body-main-new my-account-main-div">
                <div className="container-main-root">
                  <div className="container-inner-root">
                    {!details.verifiy_educator &&
                    details.role === "Educator" &&
                    localStorage.getItem("isShowNotificationBanner")&&
                    this.props.isShowNotification ? (
                      <NotificationBannerComponent date={details.end_date} />
                    ) : null}
                    <div className="my-account-text-div">
                      <div className="my-account-text-row">
                        <div className="text-div">
                          <h4>My Account</h4>
                        </div>
                        <div className="cancel-div">
                          <div className="cancel-icon-div">
                            <Link
                              to="/educator/home"
                              className="btn-cancel-icon"
                            >
                              <span className="custom-icon cancel-round-icon"></span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="main-my-tab-area-div">
                      <div className="main-my-tab-area-row">
                        <MyAccountLeftMenu />

                        <div className="main-my-tab-right-div">
                          <div className="main-my-tab-right-inner">
                            <div className="edit-profile-card-root">
                              <div className="form-custom-div form-label-custom-div">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="profile-pic-upload-group">
                                      <div className="circle" onClick={this.handleImggeFieldChange} >
                                        <img
                                        
                                          className="profile-pic"
                                          src={
                                            this.state.selectedFile
                                              ? this.state.selectedFileURL
                                              : details.profile_image
                                              ? details.profile_image
                                              : profile_pic
                                          }
                                          name="profile_image"
                                          alt="img"
                                        />
                                        <label

                                          className="filelabel-icon"
                                          for="file-uploadpic"
                                        >
                                          <span  className="custom-icon edit-pencil-new-icon"></span>
                                        </label>
                                        <input
                                          className="file-upload d-none"
                                          id="file-uploadpic"
                                       
                                         
                                          name="profile_image"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group form-group-wt-label">
                                      <label className="label" for="">
                                        Name
                                      </label>
                                      <div className="input-div">
                                        <input
                                          type="text"
                                          className={`form-control ${
                                            formError.school_name_error
                                              ? "error"
                                              : ""
                                          }`}
                                          placeholder="Enter name"
                                          maxLength="30"
                                          name="professor_name"
                                          value={
                                            this.state.formData.professor_name
                                          }
                                          onChange={(event)=>{this.handleFieldChange(event)}}
                                          disabled={!this.state.email_disabled}
                                        />
                                        {/* {formError.professor_name_error ? (
                                          <div className="info-text error-text">
                                            <p className="error-p">
                                              {formError.professor_name_message}
                                            </p>
                                          </div>
                                        ) : null} */}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group form-group-wt-label">
                                      <label className="label" for="">
                                        Email
                                      </label>
                                      <div className="input-div">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter email"
                                          name="email"
                                          value={details.email}
                                          disabled={this.state.email_disabled}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="button-row button-row-add-school">
                                      <div className="center-side-button">
                                        <button
                                          className="btn btn-common-primary btn-primary-width240"
                                          style={{backgroundColor:this.state.btncolor.backgroundColor,color:this.state.btncolor.color}}
                                          disabled=""
                                          onClick={this.handleSubmitEdit}
                                          disabled={this.state.isDisabledSave}
                                        >
                                          Save changes
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
                    </div>
                  </div>
                </div>
              </div>
              <FooterContainer isLoggedIn={true} />
            </div>
          {this.state.isprofilemodalshow &&
             <Profilemodal
             show={this.state.isprofilemodalshow}
             onClose={()=>this.setState({isprofilemodalshow:false})}
             educatordetails={this.state.formData}
             onChangeImage={(img)=>this.setState({selectedFile:img,selectedFileURL:URL.createObjectURL(img),},()=>{
               this.handleSubmitEdit()
             })}
           />
          }
         
          </section>
        </div>
      </div>
    );
  }
}

export default EditProfile;
