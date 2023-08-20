import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import miniLogo from "../../assets/images/mini_logo_new.svg";

class DemoEducatorResponseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_sug_msg: "",
      formData: {
        text: "",
        std_id: "",
      },
      formError: {
        text_error: false,
        text_message: "",
      },
    };
  }

  render() {
    const { data, formError } = this.state;
    const type = this.props.type;
    const demodatahappy = {
      id: "de7b3619-47eb-4327-ae2d-50aeb5ca6340",
      owner: {
        id: "55f334e6-022b-4388-97f2-33639da6e1f3",
        full_name: "Student A",
        first_name: "Student A",
        last_name: "",
        username: "Student A",
        email: "Student A1C1CB@youhueedu.com",
      },
      mood: {
        id: "b95aed02-8876-4966-940c-8f553bca21ba",
        name: "Happy",
        slug: "happy",
        parent: null,
      },
      users: [
        "50825c3c-c24a-4eeb-9cd0-00944c96f16b",
        "3c3fc024-6972-4690-bca2-5c7ee6413545",
      ],
      is_flag: true,
      text: "Log text log text log text",
      date: "05 Oct",
      time: "6:57am",
      is_read: true,
      is_responded: true,
      responses: [
        {
          id: "1cced278-0f3c-44eb-a31e-b8aa9777fdeb",
          text: "Spread a little sunshine! Share your happy mood with a friend.",
          is_read: false,
          educator: {
            id: "50825c3c-c24a-4eeb-9cd0-00944c96f16b",
            professor_name: "karamraj vaghela",
            token: "Token 8bb46c5f0b40a7f36690fa20d0e3ce4218d2704e",
            email: "Educator1@citrusbug.com",
            profile_image:
              "https://youhue-dev-bucket.s3.amazonaws.com/media/profile_img/image_picker_9C37D9AC-C90A-4E5B-8F69-2081D8FD02D1-6496-0000037C4726B520.jpg",
            school_name: "St. Xavier",
          },
          date: "06 Oct",
          time: "7:07am",
        },
        {
          id: "33bdeb81-5ff1-4c79-8ee8-7e11d6fc2078",
          text: "Spread a little sunshine! Share your happy mood with a friend.",
          is_read: false,
          educator: {
            id: "3c3fc024-6972-4690-bca2-5c7ee6413545",
            professor_name: "Educator 1",
            token: "Token 47feab99321b6448c021a2df01dc2e4e04b34b7e",
            email: "akash.soni@yopmail.com",
            profile_image:
              "https://youhue-dev-bucket.s3.amazonaws.com/media/profile_img/image_picker_353D858E-9082-4CD7-B1FD-A373551AE915-2555-00000E6D1682402C.jpg",
            school_name: "St. Xavier",
          },
          date: "05 Oct",
          time: "9:00am",
        },
      ],
      suggested_message: [
        {
          mood: "b95aed02-8876-4966-940c-8f553bca21ba",
          message:
            "Spread a little sunshine! Share your happy mood with a friend.",
        },
        {
          mood: "b95aed02-8876-4966-940c-8f553bca21ba",
          message: "Make a mental note of how good this feels.",
        },
        {
          mood: "b95aed02-8876-4966-940c-8f553bca21ba",
          message: "Awesome! Take a moment to enjoy this feeling.",
        },
      ],
    };
    const demodatacalm = {
      id: "7e62099f-a33a-454a-b1f0-7500886a49eb",
      owner: {
        id: "a189d9fe-6b60-457f-bd61-5fb7e3c6e4f1",
        full_name: "Alison Hemmings",
        first_name: "Alison Hemmings",
        last_name: "",
        username: "Alison Hemmings",
        email: "Alison Hemmings345CB@youhueedu.com",
      },
      mood: {
        id: "edb3469-f7f7-4f19-b1ff-fd896053e6e8",
        name: "calm",
        slug: "calm",
        parent: null,
      },
      users: ["50825c3c-c24a-4eeb-9cd0-00944c96f16b"],
      is_flag: false,
      text: "bullying",
      date: "08 Oct",
      time: "4:33am",
      is_read: true,
      is_responded: false,
      responses: [],
      suggested_message: [
        {
          mood: "edb3469-f7f7-4f19-b1ff-fd896053e6e8",
          message:
            "Okay. Take some deep breaths and a few moments of quiet time.",
        },
        {
          mood: "edb3469-f7f7-4f19-b1ff-fd896053e6e8",
          message: "Your emotions don't define you.",
        },
        {
          mood: "edb3469-f7f7-4f19-b1ff-fd896053e6e8",
          message: "Noticing your anger is the first step. Be proud of that.",
        },
      ],
    };
    const demodataanxious = {
      id: "7e62099f-a33a-454a-b1f0-7500886a49eb",
      owner: {
        id: "a189d9fe-6b60-457f-bd61-5fb7e3c6e4f1",
        full_name: "Alison Hemmings",
        first_name: "Alison Hemmings",
        last_name: "",
        username: "Alison Hemmings",
        email: "Alison Hemmings345CB@youhueedu.com",
      },
      mood: {
        id: "8f8dccb-14c2-4b6a-98aa-338fadb387d1",
        name: "anxious",
        slug: "anxious",
        parent: null,
      },
      users: ["50825c3c-c24a-4eeb-9cd0-00944c96f16b"],
      is_flag: true,
      text: "bullying",
      date: "08 Oct",
      time: "4:33am",
      is_read: true,
      is_responded: false,
      responses: [],
      suggested_message: [
        {
          mood: "8f8dccb-14c2-4b6a-98aa-338fadb387d1",
          message:
            "Okay. Take some deep breaths and a few moments of quiet time.",
        },
        {
          mood: "8f8dccb-14c2-4b6a-98aa-338fadb387d1",
          message: "Your emotions don't define you.",
        },
        {
          mood: "8f8dccb-14c2-4b6a-98aa-338fadb387d1",
          message: "Noticing your anger is the first step. Be proud of that.",
        },
      ],
    };
    // console.log("status_id===============", this.state.status_id);
    return (
      <>
        {type === "happy" && (
          <>
            {demodatahappy && (
              <Modal
                className="modal modal-custom modal-custom-new fade response-modal"
                id="educator-response-view"
                size="xl"
                show={this.props.show}
                onHide={this.props.close}
                centered>
                <div className="modal-xl modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body">
                      <button
                        type="button"
                        className="close"
                        onClick={this.props.onClose}
                        data-dismiss="modal">
                        <span className="custom-icon cancel-new-icon-01"></span>
                      </button>
                      <div className="response-modal-body">
                        <div className="response_content_wrapper">
                          <div
                            className={
                              demodatahappy.responses &&
                              demodatahappy.responses.length !== 0
                                ? "response_content_block educator-response"
                                : "response_content_block"
                            }>
                            <div className="response_thumb">
                              <span
                                className={`mood-icon mood-${
                                  demodatahappy?.mood?.parent
                                    ? demodatahappy?.mood?.parent?.slug
                                    : demodatahappy?.mood?.slug
                                }-icon`}></span>
                            </div>
                            <div className="response_text">
                              <h3>
                                <span>
                                  {demodatahappy.owner
                                    ? demodatahappy.owner.full_name
                                    : ""}
                                </span>{" "}
                                was{" "}
                                {demodatahappy.mood
                                  ? demodatahappy.mood.name
                                  : ""}
                                {this.state.status_id?.is_flag?.name ? (
                                  <>
                                    {" about "}
                                    <span>
                                      {this.state.status_id.is_flag.name}
                                    </span>
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
                              <p>{demodatahappy.text}</p>
                              <h5>
                                {moment(demodatahappy.date).format("D MMM")}{" "}
                                <span>
                                  {moment(demodatahappy.time, "hh:mm A").format(
                                    "h:mma"
                                  )}
                                </span>
                              </h5>
                            </div>
                          </div>

                          {demodatahappy.responses &&
                          demodatahappy.responses.length !== 0
                            ? demodatahappy.responses.map((res, i) => {
                                return (
                                  <div
                                    className={
                                      demodatahappy.responses.length - 1 === i
                                        ? "response_content_block"
                                        : "response_content_block educator-response-reply"
                                    }>
                                    <div className="response_thumb">
                                      <img src={miniLogo} alt="logo" />
                                    </div>
                                    <div className="response_text">
                                      <h3>
                                        <span>
                                          {res.educator.professor_name}
                                        </span>{" "}
                                        said:
                                      </h3>
                                      <p>{res.text}</p>
                                      <h5>
                                        {moment(res.date).format("D MMM")}{" "}
                                        <span>
                                          {moment(res.time, "hh mm A").format(
                                            "h:mma"
                                          )}
                                        </span>
                                      </h5>
                                    </div>
                                  </div>
                                );
                              })
                            : ""}
                          {!demodatahappy.is_responded ? (
                            <div className="response_suggession">
                              <h3>
                                Send{" "}
                                <span>
                                  {demodatahappy.owner
                                    ? demodatahappy.owner.first_name
                                    : ""}
                                </span>{" "}
                                a response
                              </h3>
                              <ul>
                                {demodatahappy.suggested_message &&
                                demodatahappy.suggested_message.length !== 0
                                  ? demodatahappy.suggested_message.map(
                                      (demodatahappy) => {
                                        return (
                                          <li>
                                            <Link
                                              className={demodatahappy.mood}
                                              to="#"
                                              onClick={() =>
                                                this.setState({
                                                  selected_sug_msg:
                                                    demodatahappy.message,
                                                  formdemodatahappy: {
                                                    text: demodatahappy.message,
                                                  },
                                                })
                                              }>
                                              <span className="respose-message">
                                                {" "}
                                                {demodatahappy.message}
                                              </span>
                                            </Link>
                                          </li>
                                        );
                                      }
                                    )
                                  : ""}
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        {!demodatahappy.is_responded ? (
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
                                onChange={this.handleFieldChange}></textarea>
                              {this.state.formData.text.trim() === "" ? (
                                <Link
                                  to="#"
                                  className="send_btn_disabled"
                                  onClick={(e) => e.preventDefault()}>
                                  Send
                                </Link>
                              ) : (
                                <Link
                                  to="#"
                                  className="send_btn"
                                  onClick={this.submitForm}>
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
        )}
        {type === "calm" && 
              <Modal
                className="modal modal-custom modal-custom-new fade response-modal"
                id="educator-response-view"
                size="xl"
                show={this.props.show}
                onHide={this.props.close}
                centered>
                <div className="modal-xl modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body">
                      <button
                        type="button"
                        className="close"
                        onClick={this.props.onClose}
                        data-dismiss="modal">
                        <span className="custom-icon cancel-new-icon-01"></span>
                      </button>
                      <div className="response-modal-body">
                        <div className="response_content_wrapper">
                          <div
                            className={
                              demodatacalm.responses &&
                              demodatacalm.responses.length !== 0
                                ? "response_content_block educator-response"
                                : "response_content_block"
                            }>
                            <div className="response_thumb">
                              <span
                                className={`mood-icon mood-${
                                  demodatacalm?.mood?.parent
                                    ? demodatacalm?.mood?.parent?.slug
                                    : demodatacalm?.mood?.slug
                                }-icon`}></span>
                            </div>
                            <div className="response_text">
                              <h3>
                                <span>
                                  {demodatacalm.owner
                                    ? demodatacalm.owner.full_name
                                    : ""}
                                </span>{" "}
                                was{" "}
                                {demodatacalm.mood
                                  ? demodatacalm.mood.name
                                  : ""}
                                {this.state.status_id?.is_flag?.name ? (
                                  <>
                                    {" about "}
                                    <span>
                                      {this.state.status_id.is_flag.name}
                                    </span>
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
                              <p>{demodatacalm.text}</p>
                              <h5>
                                {moment(demodatacalm.date).format("D MMM")}{" "}
                                <span>
                                  {moment(demodatacalm.time, "hh:mm A").format(
                                    "h:mma"
                                  )}
                                </span>
                              </h5>
                            </div>
                          </div>

                          {demodatacalm.responses &&
                          demodatacalm.responses.length !== 0
                            ? demodatacalm.responses.map((res, i) => {
                                return (
                                  <div
                                    className={
                                      demodatacalm.responses.length - 1 === i
                                        ? "response_content_block"
                                        : "response_content_block educator-response-reply"
                                    }>
                                    <div className="response_thumb">
                                      <img src={miniLogo} alt="logo" />
                                    </div>
                                    <div className="response_text">
                                      <h3>
                                        <span>
                                          {res.educator.professor_name}
                                        </span>{" "}
                                        said:
                                      </h3>
                                      <p>{res.text}</p>
                                      <h5>
                                        {moment(res.date).format("D MMM")}{" "}
                                        <span>
                                          {moment(res.time, "hh mm A").format(
                                            "h:mma"
                                          )}
                                        </span>
                                      </h5>
                                    </div>
                                  </div>
                                );
                              })
                            : ""}
                          {!demodatacalm.is_responded ? (
                            <div className="response_suggession">
                              <h3>
                                Send{" "}
                                <span>
                                  {demodatacalm.owner
                                    ? demodatacalm.owner.first_name
                                    : ""}
                                </span>{" "}
                                a response
                              </h3>
                              <ul>
                                {demodatacalm.suggested_message &&
                                demodatacalm.suggested_message.length !== 0
                                  ? demodatacalm.suggested_message.map(
                                      (demodatacalm) => {
                                        return (
                                          <li>
                                            <Link
                                              className={demodatacalm.mood}
                                              to="#"
                                              onClick={() =>
                                                this.setState({
                                                  selected_sug_msg:
                                                    demodatacalm.message,
                                                  formdemodatacalm: {
                                                    text: demodatacalm.message,
                                                  },
                                                })
                                              }>
                                              <span className="respose-message">
                                                {" "}
                                                {demodatacalm.message}
                                              </span>
                                            </Link>
                                          </li>
                                        );
                                      }
                                    )
                                  : ""}
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        {!demodatacalm.is_responded ? (
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
                                onChange={this.handleFieldChange}></textarea>
                              {this.state.formData.text.trim() === "" ? (
                                <Link
                                  to="#"
                                  className="send_btn_disabled"
                                  onClick={(e) => e.preventDefault()}>
                                  Send
                                </Link>
                              ) : (
                                <Link
                                  to="#"
                                  className="send_btn"
                                  onClick={this.submitForm}>
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
        }
        {type === "anxious" && (
          <>
            {demodataanxious && (
              <Modal
                className="modal modal-custom modal-custom-new fade response-modal"
                id="educator-response-view"
                size="xl"
                show={this.props.show}
                onHide={this.props.close}
                centered>
                <div className="modal-xl modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body">
                      <button
                        type="button"
                        className="close"
                        onClick={this.props.onClose}
                        data-dismiss="modal">
                        <span className="custom-icon cancel-new-icon-01"></span>
                      </button>
                      <div className="response-modal-body">
                        <div className="response_content_wrapper">
                          <div
                            className={
                              demodataanxious.responses &&
                              demodataanxious.responses.length !== 0
                                ? "response_content_block educator-response"
                                : "response_content_block"
                            }>
                            <div className="response_thumb">
                              <span
                                className={`mood-icon mood-${
                                  demodataanxious?.mood?.parent
                                    ? demodataanxious?.mood?.parent?.slug
                                    : demodataanxious?.mood?.slug
                                }-icon`}></span>
                            </div>
                            <div className="response_text">
                              <h3>
                                <span>
                                  {demodataanxious.owner
                                    ? demodataanxious.owner.full_name
                                    : ""}
                                </span>{" "}
                                was{" "}
                                {demodataanxious.mood
                                  ? demodataanxious.mood.name
                                  : ""}
                                {this.state.status_id?.is_flag?.name ? (
                                  <>
                                    {" about "}
                                    <span>
                                      {this.state.status_id.is_flag.name}
                                    </span>
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
                              <p>{demodataanxious.text}</p>
                              <h5>
                                {moment(demodataanxious.date).format("D MMM")}{" "}
                                <span>
                                  {moment(demodataanxious.time, "hh:mm A").format(
                                    "h:mma"
                                  )}
                                </span>
                              </h5>
                            </div>
                          </div>

                          {demodataanxious.responses &&
                          demodataanxious.responses.length !== 0
                            ? demodataanxious.responses.map((res, i) => {
                                return (
                                  <div
                                    className={
                                      demodataanxious.responses.length - 1 === i
                                        ? "response_content_block"
                                        : "response_content_block educator-response-reply"
                                    }>
                                    <div className="response_thumb">
                                      <img src={miniLogo} alt="logo" />
                                    </div>
                                    <div className="response_text">
                                      <h3>
                                        <span>
                                          {res.educator.professor_name}
                                        </span>{" "}
                                        said:
                                      </h3>
                                      <p>{res.text}</p>
                                      <h5>
                                        {moment(res.date).format("D MMM")}{" "}
                                        <span>
                                          {moment(res.time, "hh mm A").format(
                                            "h:mma"
                                          )}
                                        </span>
                                      </h5>
                                    </div>
                                  </div>
                                );
                              })
                            : ""}
                          {!demodataanxious.is_responded ? (
                            <div className="response_suggession">
                              <h3>
                                Send{" "}
                                <span>
                                  {demodataanxious.owner
                                    ? demodataanxious.owner.first_name
                                    : ""}
                                </span>{" "}
                                a response
                              </h3>
                              <ul>
                                {demodataanxious.suggested_message &&
                                demodataanxious.suggested_message.length !== 0
                                  ? demodataanxious.suggested_message.map(
                                      (demodataanxious) => {
                                        return (
                                          <li>
                                            <Link
                                              className={demodataanxious.mood}
                                              to="#"
                                              onClick={() =>
                                                this.setState({
                                                  selected_sug_msg:
                                                    demodataanxious.message,
                                                  formdemodataanxious: {
                                                    text: demodataanxious.message,
                                                  },
                                                })
                                              }>
                                              <span className="respose-message">
                                                {" "}
                                                {demodataanxious.message}
                                              </span>
                                            </Link>
                                          </li>
                                        );
                                      }
                                    )
                                  : ""}
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        {!demodataanxious.is_responded ? (
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
                                onChange={this.handleFieldChange}></textarea>
                              {this.state.formData.text.trim() === "" ? (
                                <Link
                                  to="#"
                                  className="send_btn_disabled"
                                  onClick={(e) => e.preventDefault()}>
                                  Send
                                </Link>
                              ) : (
                                <Link
                                  to="#"
                                  className="send_btn"
                                  onClick={this.submitForm}>
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
        )}
      </>
    );
  }
}

export default DemoEducatorResponseView;
