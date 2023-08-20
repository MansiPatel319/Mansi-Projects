import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import miniLogo from "../../../../assets/images/mini_logo_new.svg";
// import miniLogo from "../../../../assets/images/mini_logo.png";
import { suggested_response } from "../../../../staticdata/suggestedResponse";

class EducatorResponseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      status_id: this.props ? this.props.selectedStatus : "",
      selected_sug_msg: "",
      formData: {
        text: "",
        std_id: ""
      },
      formError: {
        text_error: false,
        text_message: "",
      },
    };
  }
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.statusResponseGetData();
  }

  statusResponseGetData = () => {
    var statusId=""
    if(this.state.status_id===undefined){
     statusId = this.state.status_id;;
    }
    else{
      
       statusId = this.state.status_id;
    }

    
    this.props
      .statusResponseGetData(statusId)
      .then((res) => {
        if (res.status) {
          this.setState({ data: res.data });
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
  };

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.text.trim() === "") {
      formError.text_error = true;
      formError.text_message = "Please enter class name!";
      isFormValid = false;
    } else {
      formError.text_error = false;
      formError.text_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };

  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    if (name === "text") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Please enter class name!";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    this.setState({ formError });
  };

  handleFieldChange = (event) => {
    this.setState({ selected_sug_msg: "" });
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
  };
  submitForm = () => {
    const { formData } = this.state;
    const statusId = this.state.status_id;
    const formError = { ...this.state.formError };
    if (this.state.selected_sug_msg && formData.text === "") {
      formData.text = this.state.selected_sug_msg;
      formData.std_id = statusId
    }
    const isValid = this.validateForm(formData);
    if (isValid) {
      const params = new FormData();
      params.append("text", formData.text);
      params.append("std_id", statusId)
      this.props
        .statusResponsePostData(statusId, params)
        .then(async (res) => {
          if (res.status) {
            // this.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
            this.setState({ selected_sug_msg: "" });
            this.statusResponseGetData();
          } else if (res.code === 400) {
            formError.name_error = true;
            formError.name_message = res.message;
            this.setState({ formError });
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
    const { data, formError } = this.state;
  
    // console.log("status_id===============", this.state.status_id);
    return (
      <>
        {data && (
          <Modal
            className="modal modal-custom modal-custom-new fade response-modal"
            id="educator-response-view"
            size="xl"
            show={this.props.show}
            onHide={this.props.close}
            centered
          >
            <div className="modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <button
                    type="button"
                    className="close"
                    onClick={this.props.onClose}
                    data-dismiss="modal"
                  >
                    <span className="custom-icon cancel-new-icon-01"></span>
                  </button>
                  <div className="response-modal-body">
                    <div className="response_content_wrapper">
                      <div
                        className={
                          data.responses && data.responses.length !== 0
                            ? "response_content_block educator-response"
                            : "response_content_block"
                        }
                      >
                        <div className="response_thumb">
                          <span
                            className={`mood-icon mood-${
                              data?.mood?.parent
                                ? data?.mood?.parent?.slug
                                : data?.mood?.slug
                            }-icon`}
                          ></span>
                        </div>
                        <div className="response_text">
                          <h3>
                            <span>
                              {data.owner ? data.owner.full_name : ""}
                            </span>{" "}
                            was {data.mood ? data.mood.name : ""}
                            {this.state.status_id?.is_flag?.name ? (
                              <>
                                {" about "}
                                <span>{this.state.status_id.is_flag.name}</span>
                              </>
                            ) : (
                              ""
                            )}
                            {this.state.status_id?.is_topics?.name ? (
                              <>
                                {" about "}
                                <span>
                                  {this.state.status_id.is_topics.name}
                                </span>
                              </>
                            ) : (
                              ""
                            )}
                          </h3>
                          <p>{data.text}</p>
                          <h5>
                          {moment(
                                 data.date
                                 ).format("D MMM")}{" "}
                           
                            <span>
                              {moment(new Date(data.date_created_web_utc), "hh:mm A").format("h:mma")}
                            </span>
                          </h5>
                        </div>
                      </div>

                      {data.responses && data.responses.length !== 0
                        ? data.responses.map((res, i) => {
                            
                            return (
                              <div
                                className={
                                  data.responses.length - 1 === i
                                    ? "response_content_block"
                                    : "response_content_block educator-response-reply"
                                }
                              >
                                <div className="response_thumb">
                                  <img src={miniLogo} alt="logo" />
                                </div>
                                <div className="response_text">
                                  <h3>
                                    <span>{res.educator.professor_name}</span>{" "}
                                    said:
                                  </h3>
                                  <p>
                                 {res.text}</p>
                                  <h5>
                                  {moment(
                                 res.date
                                 ).format("D MMM")}{" "}
                                    <span>
                                    {moment(new Date(res.date_created_web_utc), "hh:mm A").format("h:mma")}
                                      {/* {moment(res.time, "hh mm A").format(
                                        "h:mma"
                                      )} */}
                                    </span>
                                  </h5>
                                </div>
                              </div>
                            );
                          })
                        : ""}
                      {!data.is_responded ? (
                        <div className="response_suggession">
                          <h3>
                            Send{" "}
                            <span>
                              {data.owner ? data.owner.first_name : ""}
                            </span>{" "}
                            a response
                          </h3>
                          <ul>
                            {data.suggested_message &&
                            data.suggested_message.length !== 0
                              ? data.suggested_message.map((data) => {
                                  return (
                                    <li>
                                      <Link
                                        className={data.mood_data.name}
                                        to="#"
                                        onClick={() =>
                                          this.setState({
                                            selected_sug_msg: data.message,
                                            formData: { text: data.message },
                                          })
                                        }
                                      >
                                        <span className="respose-message">
                                          {" "}
                                          {data.message}
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })
                              : ""}
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    {!data.is_responded ? (
                      <>
                        <div className="response_msg_block">
                          <span>
                            <img src={miniLogo} alt="logo" />
                          </span>
                          <textarea
                            placeholder="Type your message"
                            value={
                              this.state.selected_sug_msg
                                ? this.state.selected_sug_msg
                                : this.state.formData.text
                            }
                            name="text"
                            onChange={this.handleFieldChange}
                          ></textarea>
                          {this.state.formData.text.trim() === "" ? (
                            <Link
                              to="#"
                              className="send_btn_disabled"
                              onClick={(e) => e.preventDefault()}
                            >
                              Send
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className="send_btn"
                              onClick={this.submitForm}
                            >
                              Send
                            </Link>
                          )}
                        </div>
                        {/* {formError.text_error ? (
                      <div className="info-text error-text">
                        <p className="error-p">{formError.text_message}</p>
                      </div>
                    ) : null} */}
                        <p className="note">You can only respond once.</p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export default EducatorResponseView;
