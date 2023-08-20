import React from "react";
import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";
import { Link } from "react-router-dom";

import "./AddSchool.scss";
import InputComponent from "../../../UI/InputComponent";
import CountryData from "../../../../staticdata/CountryData";
import DropDownList from "../../../UI/DropDownList";
import Spinner from "../../../Spinner/Spinner";

class AddSchool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList:CountryData,
      formData: {
        school_name: "",
        area_street: "",
        city_town: "",
        state_province: "",
        country: "",
      },
      formError: {
        school_name_error: false,
        school_name_focus_error: false,
        school_name_message: "",
        area_street_error: false,
        area_street_focus_error: false,
        area_street_message: "",
        city_town_error: false,
        city_town_focus_error: false,
        city_town_message: "",
        state_province_error: false,
        state_province_focus_error: false,
        state_province_message: "",
        country_error: false,
        country_focus_error: false,
        country_message: "",
      },
      isAddSchoolDisabled:true
    };
  }
  
  validateForm = (data) => {
    
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.school_name.trim() === "") {
      formError.school_name_error = true;
      formError.school_name_message = "Please enter school name";
      isFormValid = false;
    } else {
      formError.school_name_error = false;
      formError.school_name_message = "";
    }

    if (data.area_street.trim() === "") {
      formError.area_street_error = true;
      formError.area_street_message = "Please enter area";
      isFormValid = false;
    } else {
      formError.area_street_error = false;
      formError.area_street_message = "";
    }

    if (data.city_town.trim() === "") {
      formError.city_town_error = true;
      formError.city_town_message = "Please enter city";
      isFormValid = false;
    } else {
      formError.city_town_error = false;
      formError.city_town_message = "";
    }

    if (data.state_province.trim() === "") {
      formError.state_province_error = true;
      formError.state_province_message = "Please enter state";
      isFormValid = false;
    } else {
      formError.state_province_error = false;
      formError.state_province_message = "";
    }

    if (data.country === "") {
      formError.country_error = true;
      formError.country_message = "Please enter country";
      isFormValid = false;
    } else {
      formError.country_error = false;
      formError.country_message = "";
    }

    this.setState({ formError });
    return isFormValid;
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    const testForField = this.checkFiledsArenotBlank("school_name","area_street","city_town","state_province", value)
    if (testForField && this.state.formData.country !== '') {
      this.setState({ isAddSchoolDisabled: false });
    } else {
      this.setState({ isAddSchoolDisabled: true });
    }
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
  };

  handleSelectFieldChange = (event) => {
    const {value } = event;
    const formData = { ...this.state.formData };
    formData["country"] = event;
    const testForField = this.checkFiledsArenotBlank("school_name","area_street","city_town","state_province", value)
    if (testForField) {
      this.setState({ isAddSchoolDisabled: false });
    } else {
      this.setState({ isAddSchoolDisabled: true });
    }

    this.setState({ formData }, () => {
      this.handleChangedField("country", value);
    });
  };

  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    if (name === "school_name") {
      if (value.trim() === "") {
        formError[`${name}_error`] = true;
        formError[`${name}_message`] = "Please enter your name.";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "area_street") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Please enter school area.";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "city_town") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Please enter school city.";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "state_province") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Please enter school state";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "country") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Please select school country";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    this.setState({ formError });
  };

  checkFiledsArenotBlank = (filed1,filed2,filed3,filed4,filed5) =>{
    const {formData} = this.state
    let flag = false
    if(formData[filed1]!=="" && formData[filed2]!=="" && formData[filed3]!=="" && formData[filed4]!=="" && filed5!=="" )
    {
      flag= true
    }
    return flag
  }

  handleErrorMessage = (event) => {  
    const { name,value } = event.target;  
    if (name === "school_name") {
      const testForField = this.checkFiledsArenotBlank("area_street","city_town","state_province","country", value)
      if (testForField) {
        this.setState({ isAddSchoolDisabled: false });
      } else {
        this.setState({ isAddSchoolDisabled: true });
      }
    } 
    if (name === "area_street") {
      const testForField = this.checkFiledsArenotBlank("school_name","city_town","state_province","country", value)
      if (testForField) {
        this.setState({ isAddSchoolDisabled: false });
      } else {
        this.setState({ isAddSchoolDisabled: true });
      }
     
    }
    if (name === "city_town") {
      const testForField = this.checkFiledsArenotBlank("school_name","area_street","state_province","country", value)
      if (testForField) {
        this.setState({ isAddSchoolDisabled: false });
      } else {
        this.setState({ isAddSchoolDisabled: true });
      }
     
    } 
    if (name === "state_province") {
      const testForField = this.checkFiledsArenotBlank("school_name","area_street","city_town","country", value)
      if (testForField) {
        this.setState({ isAddSchoolDisabled: false });
      } else {
        this.setState({ isAddSchoolDisabled: true });
      }
    } 
    if(this.state.formData.country !== '') {
      const testForField = this.checkFiledsArenotBlank("school_name","area_street","city_town","country", value)
      if (testForField) {
        this.setState({ isAddSchoolDisabled: false });
      } else {
        this.setState({ isAddSchoolDisabled: true });
      }
    }
  };
  handleClickOnBack=()=>{
    const { history } = this.props;
    history.goBack()
  }

  submitForm = () => {
    const { formData } = this.state;
    const { history } = this.props;
    const email = localStorage.getItem("email");
    const formDataAddSchool = {
      school_name: formData.school_name,
      area_street: formData.area_street,
      city_town: formData.city_town,
      state_province: formData.state_province,
      country: formData.country.value,
    }

    const isValid = this.validateForm(formData);
    if (isValid) {      
      this.props
        .addSchool(formDataAddSchool)
        .then((res) => {
          if (res.status) {
            // this.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
            history.replace("/join-school/"+(res.data.id)+"/"+email);
          } else {
            // this.props.addToast(res.message, {
            //   appearance: "error",
            //   autoDismiss: true,
            // });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {

    return (
      <div id="wrapper" className="wrapper">
        {this.props.authenticate?.loading ? <Spinner /> : null}
        <div className="main-middle-area">
          <section className="general-account-section">
            <div className="general-account-div bg-image-common2">
              <HeaderContainer />
              <div className="main-page-root">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="general-account-root find-school-link-div">
                        <div className="full-account-div full-account-border-div">
                          <div className="general-title general-add-school-title">
                            <div className="center-text-block">
                              <h2>Add Your School</h2>
                            </div>

                            <div className="acc-row">
                              <p>
                                Provide your school info to become a part of the
                                YouHue community!
                              </p>
                            </div>
                          </div>

                          <div className="form-custom-div form-custom-400-div">
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <InputComponent
                                    inputType="text"
                                    // inputClassName={`form-control ${
                                    //   formError.school_name_error ? "error" : ""
                                    // }`}
                                    maxLength="40"
                                    inputClassName="form-control"
                                    inputPlaceholder="School Name"
                                    inputName="school_name"
                                    onInputChange={this.handleFieldChange}
                                    handleInpfocus={this.handleErrorMessage}
                                  />
                                  {/* {formError.school_name_error ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {formError.school_name_message}
                                      </p>
                                    </div>
                                  ) : (
                                    <div
                                      className={`info-text ${
                                        !formError.school_name_focus_error &&
                                        "d-none"
                                      }`}
                                    >
                                      <p className="info-p">
                                        {formError.school_name_message}
                                      </p>
                                    </div>
                                  )} */}
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <InputComponent
                                    inputType="text"
                                    // inputClassName={`form-control ${
                                    //   formError.area_street_error ? "error" : ""
                                    // }`}
                                    inputClassName="form-control"
                                    inputPlaceholder="Area/Street"
                                    inputName="area_street"
                                    onInputChange={this.handleFieldChange}
                                    handleInpfocus={this.handleErrorMessage}
                                  />
                                  {/* {formError.area_street_error ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {formError.area_street_message}
                                      </p>
                                    </div>
                                  ) : (
                                    <div
                                      className={`info-text ${
                                        !formError.area_street_focus_error &&
                                        "d-none"
                                      }`}
                                    >
                                      <p className="info-p">
                                        {formError.area_street_message}
                                      </p>
                                    </div>
                                  )} */}
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <InputComponent
                                    inputType="text"
                                    // inputClassName={`form-control ${
                                    //   formError.city_town_error ? "error" : ""
                                    // }`}
                                    inputClassName="form-control"
                                    inputPlaceholder="City/Town"
                                    inputName="city_town"
                                    onInputChange={this.handleFieldChange}
                                    handleInpfocus={this.handleErrorMessage}
                                  />
                                  {/* {formError.city_town_error ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {formError.city_town_message}
                                      </p>
                                    </div>
                                  ) : (
                                    <div
                                      className={`info-text ${
                                        !formError.city_town_focus_error &&
                                        "d-none"
                                      }`}
                                    >
                                      <p className="info-p">
                                        {formError.city_town_message}
                                      </p>
                                    </div>
                                  )} */}
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <InputComponent
                                    inputType="text"
                                    // inputClassName={`form-control ${
                                    //   formError.state_province_error
                                    //     ? "error"
                                    //     : ""
                                    // }`}
                                    inputClassName="form-control"
                                    inputPlaceholder="State/Province"
                                    inputName="state_province"
                                    onInputChange={this.handleFieldChange}
                                    handleInpfocus={this.handleErrorMessage}
                                  />
                                  {/* {formError.state_province_error ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {formError.state_province_message}
                                      </p>
                                    </div>
                                  ) : (
                                    <div
                                      className={`info-text ${
                                        !formError.state_province_focus_error &&
                                        "d-none"
                                      }`}
                                    >
                                      <p className="info-p">
                                        {formError.state_province_message}
                                      </p>
                                    </div>
                                  )} */}
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="form-group select2-form-group">
                                  <div className="selectbox-inline">
                                    <div className="select-box select-common select-box-group select-custom2">
                                      <DropDownList
                                        value={this.state.formData.country}
                                        handleOptionChange={(e) =>
                                          this.handleSelectFieldChange(e)
                                        }
                                        options={this.state.countryList}
                                        name="country"
                                        placeholder="Please select country"
                                        placeholderStyle={{
                                          lineHeight: "36px",
                                          color: "#3C454C",
                                          paddingRight: "33px",
                                          display: "block",
                                          paddingLeft: "8px",
                                          paddingRight: "20px",
                                          fontSize: "18px",
                                          fontWeight: 400,
                                          color: "rgba(63, 63, 68, 0.5)",
                                          whiteSpace: "nowrap",
                                        }}
                                        optionStyle={{
                                          padding: "10px",
                                          minHeight: "40px",
                                        }}
                                        controlStyle={{
                                          "&:hover": { borderColor: "#652d90" }
                                        }}
                                      />
                                      {/* <select
                                        className={`form-control ${
                                          formError.country_error ? "error" : ""
                                        }`}
                                        id="country-name-select"
                                        name="country"
                                        onBlur={this.handleFieldChange}
                                        onFocus={this.handleErrorMessage}
                                      >
                                        <option>Please Select country </option>
                                        <option> Afghanistan </option>
                                        <option> Australia </option>
                                        <option> Bhutan </option>
                                        <option> Brazil </option>
                                        <option> Canada </option>
                                        <option> China </option>
                                        <option> Egypt </option>
                                        <option> France </option>
                                        <option> Germany </option>
                                        <option> Hong Kong </option>
                                        <option> India </option>
                                        <option> Japan </option>
                                        <option> Singapore </option>
                                        <option> United Arab Emirates </option>
                                        <option> United Kingdom </option>
                                        <option>
                                          United States of America
                                        </option>
                                      </select> */}
                                    </div>
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
                                      onClick={this.submitForm}
                                      disabled={
                                        this.state.isAddSchoolDisabled
                                      }
                                    >
                                      Add school
                                    </button>
                                    <div className="link-div">
                                      <Link
                                        // to={back_url}
                                        to="#"
                                        onClick={()=>this.handleClickOnBack()}
                                        className="btn btn-link"
                                      >
                                        Back to school search
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
              <FooterContainer />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default AddSchool;
