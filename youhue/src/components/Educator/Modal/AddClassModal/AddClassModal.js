import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import "../../AddClass/AddClass.scss";
// import "../../../styles/style.css";

class AddClassModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
      },
      formError: {
        name_error: false,
        name_message: "",
      },
      isAddclassDisabled:true
    };
    this.inputClassNameRef = React.createRef();
  }
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.inputClassNameRef.current.focus();
  }
  validateForm = (data) => {
    let isFormValid = true;
    // const formError = { ...this.state.formError };
    // if (data.name.trim() === "") {
    //   formError.name_error = true;
    //   formError.name_message = "Please enter class name!";
    //   isFormValid = false;
    // } else {
    //   formError.name_error = false;
    //   formError.name_message = "";
    // }
    // this.setState({ formError });
    return isFormValid;
  };

  // handleChangedField = (name, value) => {
  //   const formError = { ...this.state.formError };
  //   if (name === "name") {
  //     formError[`${name}_error`] = true;
  //     if (value.trim() === "") {
  //       formError[`${name}_message`] = "Please enter class name!";
  //     } else {
  //       formError[`${name}_error`] = false;
  //       formError[`${name}_message`] = "";
  //     }
  //   }
  //   this.setState({ formError });
  // };

  handleFieldChange = (event) => {
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    
    this.setState({ formData });
    if(value!==""){
      this.setState({isAddclassDisabled:false})
    }

    else if(value===""){
      this.setState({isAddclassDisabled:true})
    }
  
  };

  submitForm = () => {
    const { formData } = this.state;
    const { history } = this.props.props;
    const formError = { ...this.state.formError };
    const isValid = this.validateForm(formData);
    if (isValid) {
      const params = new FormData();
      params.append("name", formData.name);
      this.props.props
        .addClass(params)
        .then(async (res) => {
          if (res.status) {
            // this.props.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
            await this.props.props.getAllClass();
            await this.props.props.getClassDetails(res.data.id);
            const name = this.state.formData.name;
            this.props.onClose(name);
            history.replace("/educator/home");
          } else if (res.code === 400) {
            formError.name_error = true;
            formError.name_message = res.message;
            this.setState({ formError });
          } else {
            this.props.onClose();
            // this.props.props.addToast(res.message, {
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
    const { formError } = this.state;
    return (
      <>
        <Modal
          size="lg"
          className="modal modal-custom modal-custom-new fade"
          id="add-a-class-modal"
          show={this.props.show}
          onHide={this.props.close}
          centered
        >
          <div className="modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={this.props.onClose}
                >
                  <span className="custom-icon cancel-new-icon-01"></span>
                </button>
                <div className="heading-title-div">
                  <h2 className="modal-title" style={{ color: "#3f3f44" }}>
                    Add a class
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
                            type="text"
                            id="class-name-acc"
                            name="name"
                            maxLength="40"
                            className={`form-control ${
                              formError.name_error ? "error" : ""
                            }`}
                            placeholder="What would you like to name this class?"
                            onChange={this.handleFieldChange}
                            ref={this.inputClassNameRef}
                          />{" "}
                          {formError.name_error ? (
                            <div className="info-text error-text">
                              <p className="error-p">
                                {formError.name_message}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="button-row button-row-add-school">
                          <div className="center-side-button">
                            <button
                              disabled={
                                this.state.isAddclassDisabled
                              }
                              className="btn btn-common-primary btn-primary-width240"
                              onClick={this.submitForm}
                            >
                              Create class
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
      </>
    );
  }
}

export default AddClassModal;
