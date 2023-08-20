import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import CountryData from "../../../../staticdata/CountryData";
import DropDownList from "../../../UI/DropDownList";

export class EditSchoolDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: CountryData,
      formData: {
        school_name: `${
          this.props.schoolDetails.school_name
            ? this.props.schoolDetails.school_name
            : ""
        }`,
        area_street: `${
          props.schoolDetails.area_street ? props.schoolDetails.area_street : ""
        }`,
        city_town: `${
          props.schoolDetails.city_town ? props.schoolDetails.city_town : ""
        }`,
        state_province: `${
          props.schoolDetails.state_province
            ? props.schoolDetails.state_province
            : ""
        }`,
        country: {
          value: `${
            props.schoolDetails.country ? props.schoolDetails.country : ""
          }`,
          label: `${
            props.schoolDetails.country ? props.schoolDetails.country : ""
          }`,
        },
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
      isDisabled: true,
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

    if (data.country.value.trim() === "") {
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
    this.setState({ isDisabled: false });
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
  };
  handleSelectFieldChange = (event) => {
    const { value } = event;
    this.setState({ isDisabled: false });
    const formData = { ...this.state.formData };
    formData["country"] = event;
    this.setState({ formData }, () => {
      this.handleChangedField("country", value);
    });
  };
  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    if (name === "school_name") {
      if (value.trim() === "") {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "area_street") {
      formError[`${name}_error`] = false;
      if (value.trim() === "") {
        formError[`${name}_message`] = "";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "city_town") {
      formError[`${name}_error`] = false;
      if (value.trim() === "") {
        formError[`${name}_message`] = "";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "state_province") {
      formError[`${name}_error`] = false;
      if (value.trim() === "") {
        formError[`${name}_message`] = "";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "country") {
      formError[`${name}_error`] = false;
      if (value.trim() === "") {
        formError[`${name}_message`] = "";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    this.setState({ formError });
  };

  handleErrorMessage = (event) => {
    const formError = { ...this.state.formError };
    const { name } = event.target;
    formError[`${name}_error`] = false;
    if (name === "school_name") {
      formError[`${name}_focus_error`] = true;
      // formError[`${name}_message`]"Please use the name by which your students know you. ";
      formError[`${name}_message`] = "";
    } else {
      formError[`professor_name_focus_error`] = false;
    }
    if (name === "area_street") {
      formError[`${name}_focus_error`] = true;
      // formError[`${name}_message`] = "Please enter school area";
      formError[`${name}_message`] = "";
    } else {
      formError[`email_focus_error`] = false;
    }
    if (name === "city_town") {
      formError[`${name}_focus_error`] = true;
      formError[`${name}_message`] = "";
    } else {
      formError[`confirm_email_focus_error`] = false;
    }
    if (name === "state_province") {
      formError[`${name}_focus_error`] = true;
      // formError[`${name}_message`] = "Please enter school state";
      formError[`${name}_message`] = "";
    } else {
      formError[`password_focus_error`] = false;
    }
    this.setState({ formError });
  };

  submitForm = () => {
    const { formData } = this.state;
    const isValid = this.validateForm(formData);

    if (isValid) {
      const formDataAddSchool = {
        school_name: formData.school_name,
        area_street: formData.area_street,
        city_town: formData.city_town,
        state_province: formData.state_province,
        country: formData.country.value,
      };

      this.props.EditSchool(formDataAddSchool);
    }
  };
  render() {
    const { formError, formData } = this.state;
    return (
      <Modal
        className="modal modal-custom modal-custom-new fade"
        id="edit-school-modal"
        centered
        show={this.props.show}
        onHide={this.props.onClose}
      >
        {" "}
        <div className="modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this.props.onClose}
                data-dismiss="modal"
              >
                <span className="custom-icon cancel-new-icon-01"></span>
              </button>
              <div className="heading-title-div">
                <h2 className="modal-title" style={{ color: "#3f3f44" }}>
                  Edit Your School
                </h2>
              </div>
            </div>

            <div className="modal-body">
              <div className="edit-form-school-card-root">
                <div className="form-custom-div form-label-custom-div">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group form-group-wt-label">
                        <label className="label" for="">
                          School Name
                        </label>
                        <div className="input-div">
                          <input
                            type="text"
                            className={`form-control ${
                              formError.school_name_error ? "error" : ""
                            }`}
                            value={formData.school_name}
                            placeholder="School Name"
                            name="school_name"
                            maxLength="40"
                            onChange={this.handleFieldChange}
                            onFocus={this.handleErrorMessage}
                          />
                          {formError.school_name_error ? (
                            <div className="info-text error-text">
                              <p className="error-p">
                                {formError.school_name_message}
                              </p>
                            </div>
                          ) : (
                            <div
                              className={`info-text ${
                                !formError.school_name_focus_error && "d-none"
                              }`}
                            >
                              <p className="info-p">
                                {formError.school_name_message}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group form-group-wt-label">
                        <label className="label" for="">
                          Area/Street
                        </label>
                        <div className="input-div">
                          <input
                            type="text"
                            className={`form-control ${
                              formError.area_street_error ? "error" : ""
                            }`}
                            placeholder="Area/Street"
                            name="area_street"
                            onChange={this.handleFieldChange}
                            onFocus={this.handleErrorMessage}
                            value={formData.area_street}
                          />
                          {formError.area_street_error ? (
                            <div className="info-text error-text">
                              <p className="error-p">
                                {formError.area_street_message}
                              </p>
                            </div>
                          ) : (
                            <div
                              className={`info-text ${
                                !formError.area_street_focus_error && "d-none"
                              }`}
                            >
                              <p className="info-p">
                                {formError.area_street_message}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group form-group-wt-label">
                        <label className="label" for="">
                          City/Town
                        </label>
                        <div className="input-div">
                          <input
                            type="text"
                            className={`form-control ${
                              formError.city_town_error ? "error" : ""
                            }`}
                            placeholder="City/Town"
                            name="city_town"
                            onChange={this.handleFieldChange}
                            onFocus={this.handleErrorMessage}
                            value={formData.city_town}
                          />
                          {formError.city_town_error ? (
                            <div className="info-text error-text">
                              <p className="error-p">
                                {formError.city_town_message}
                              </p>
                            </div>
                          ) : (
                            <div
                              className={`info-text ${
                                !formError.city_town_focus_error && "d-none"
                              }`}
                            >
                              <p className="info-p">
                                {formError.city_town_message}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group form-group-wt-label">
                        <label className="label" for="">
                          State/Province
                        </label>
                        <div className="input-div">
                          <input
                            type="text"
                            className={`form-control ${
                              formError.state_province_error ? "error" : ""
                            }`}
                            placeholder="State/Province"
                            name="state_province"
                            onChange={this.handleFieldChange}
                            onFocus={this.handleErrorMessage}
                            value={formData.state_province}
                          />
                          {formError.state_province_error ? (
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
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group form-group-wt-label select2-form-group">
                        <label className="label" for="">
                          Country
                        </label>
                        <div className="input-div">
                          <div className="selectbox-inline">
                            <div className="select-box select-common select-box-group select-custom2">
                              <DropDownList
                                value={this.state.formData.country}
                                handleOptionChange={(e) =>
                                  this.handleSelectFieldChange(e)
                                }
                                options={this.state.countryList}
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
                                  whiteSpace: "nowrap",
                                  color: "rgba(63, 63, 68, 0.5)",
                                }}
                                optionStyle={{
                                  padding: "10px",
                                  minHeight: "40px",
                                }}
                                controlStyle={{
                                  "&:hover": { borderColor: "#652d90" },
                                }}
                              />
                              {/* <select
                                className={`form-control ${
                                  formError.country_error ? "error" : ""
                                }`}
                                id="country-name-select"
                                name="country"
                                onChange={this.handleFieldChange}
                                onFocus={this.handleErrorMessage}
                                value={formData.country}
                              >
                                <option> </option>
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
                                <option selected> United Arab Emirates </option>
                                <option> United Kingdom </option>
                                <option> United States of America </option>
                              </select> */}
                            </div>
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
                            disabled={
                              this.state.isDisabled ||
                              this.state.formData.area_street === "" ||
                              this.state.formData.city_town === "" ||
                              this.state.formData.country === "" ||
                              this.state.formData.school_name === "" ||
                              this.state.formData.state_province === ""
                            }
                            onClick={this.submitForm}
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
      </Modal>
    );
  }
}

export default EditSchoolDetails;
