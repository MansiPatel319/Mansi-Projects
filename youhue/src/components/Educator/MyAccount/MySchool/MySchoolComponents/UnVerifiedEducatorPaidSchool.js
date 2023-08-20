import React, { Component } from "react";
import Spinner from "../../../../Spinner/Spinner";
import { Link } from "react-router-dom";

class UnVerifiedEducatorPaidSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      image: [],
      msg: "",
      issentsuccess: false,
    };
  }

  async componentDidMount() {
    localStorage.setItem("const_url","")
    await this.getSchoolData();
  }

  getSchoolData = () => {
    this.props
      .getSchoolData()
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
  handleImageChange = (event) => {
    const images = [];

    var files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      images.push(event.target.files[i]);
    }
    const updtaed_images = [...this.state.image, ...images];
    this.setState({ image: updtaed_images });
  };

  handleSendtoYouHue = () => {
    if (this.state.image.length !== 0) {
      var { educator } = this.props;
      var uuid = educator.educatorData.user_uuid;
      let formData = new FormData();
      formData.append("educator_id", uuid);
      var files = this.state.image;
      for (let i = 0; i < files.length; i++) {
        formData.append("document_image", files[i]);
      }
      this.props
        .uploadSchoolId(formData)
        .then((res) => {
          if (res.status) {
            this.setState({ issentsuccess: true, image: [] });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.setState({ msg: "Please Choose files" });
  };
  render() {
    const details = this.state.data;
    return (
      <>
        {this.props.authenticate.loading ? <Spinner /> : null}
        {this.state.issentsuccess ||
        this.props.educatorData.is_docs_uploaded ? (
          <div className="row my-tab-new">
            <div className="col-lg-12 col-md-12">
              <div className="custom-text-div">
                <p className="prag-text">
                  You are unverified at {details.school_name}. Your school
                  admin has received the request to verify you.
                  <span className="block">
                    We have also received your school ID and are reviewing it.
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="custom-text-div">
                <p className="prag-text">
                  You are unverified at {details.school_name}. Your school
                  admin has received the request to verify you.{" "}
                </p>
                <p className="prag-text">
                  You can also{" "}
                  <label className="label-color" for="customFile">
                    upload
                  </label>{" "}
                  your school ID and any form of documentation that shows your name, title and school and we will verify you.
                </p>
                <input
                  type="file"
                  multiple={true}
                  className="custom-file-input d-none"
                  id="customFile"
                  accept=".jpg, .png, .jpeg, .pdf"
                  name={this.state.image ? this.state.image.name : "filename"}
                  onChange={this.handleImageChange}
                />
              </div>
            </div>
          </div>
        )}

        {this.state.image.length === 0
          ? ""
          : this.state.image.map((image, index) => {
              return <p className="upload-file-name" key={index}>{image.name}</p>;
            })}
        {this.state.image.length === 0 ? (
          ""
        ) : (
          <>
            <Link
              to="#"
              className="btn btn-link uploadDoc "
              onClick={this.handleSendtoYouHue}
            >
              Send to YouHue
            </Link>{" "}
          </>
        )}
      </>
    );
  }
}

export default UnVerifiedEducatorPaidSchool;
