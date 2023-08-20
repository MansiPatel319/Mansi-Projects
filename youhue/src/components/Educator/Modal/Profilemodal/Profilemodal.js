// import moment from "moment";
import React, { Component } from "react";
// import { Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import InputComponent from "../../../UI/InputComponent";
// import { doAskHowAreYou } from "../../../../store/network/Educator/insightData";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../../store/actions/index";
// import empty_state from "../../../../assets/images/empty_state.svg";

class Profilemodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.educatordetails.professor_id,
      image: this.props.educatordetails.profile_image,
      name:this.props.professor_name,
      email:this.props.email,
      isImage: false
    };
  }
  handleuplodonclick = (event) => {
    
    let img_file = event.target.files[0];
    this.props.onChangeImage(img_file);
 
  }
  handledeleteprofile =()=>{
    this.props.deleteprofileimage(this.state.id)
    .then((res) => {
     
      if (res.status) {
       this.props.getAccountDetails();
       this.props.onClose();
      }
    })
    .catch((err) => {
      this.setState({
        loading: false
      })
      console.log(err);
    });

  }
  componentDidMount() {
    localStorage.setItem("const_url","")

    if (this.state.image !== null) {
      this.setState({ isImage: true })
    }

  }
  render() {
    return (
      <>

        <div
          className="modal modal-custom modal-custom-new yh_edit_profile_modal fade show"
          id="edit_profile"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Edit Photo</h4>
                <button
                  type="button"
                  className="close"
                  onClick={this.props.onClose}
                  data-dismiss="modal"
                >
                  <span className="custom-icon cancel-new-icon-01"></span>
                </button>

              </div>

              <div className="modal-body">
                <div className="editProfile_btnWrapper">
                  {/* <button className="editBtn deleteBtn" disabled={this.state.isImage}>Delete Photo</button> */}
                  <div className="button-row button-row-add-school editStudentRow">
                    <div className="center-side-button">
                      <button
                        className="btn btn-common-primary btn-primary-width240 btn-red deleteprofile"
                        onClick={this.handledeleteprofile}

                        disabled={this.state.isImage === false}
                      >
                        Delete Photo
                      </button>

                      <div  >

                        <label

                        //   className="filelabel-icon"
                          htmlFor="file-uploadpic-piclbl"
                          className="btn btn-common-primary btn-primary-width240 uploadprofile"
                          disabled={this.state.isImage === true}
                        >

                           {/* <button
                          className="btn btn-common-primary btn-primary-width240 uploadprofile"

                          disabled={this.state.isImage === true}
                        > */}

                          Upload Photo
                        {/* </button> */}
                        </label>
                        <input
                                          className="file-upload d-none"
                                          id="file-uploadpic-piclbl"
                                          type ="file"
                                          onChange={(event)=>this.handleuplodonclick(event)}
                                          accept="image/*"
                                           name="profile_image"
                                        />



                      </div>
                    </div>
                  </div>

                  <div className="button-row button-row-add-school">
                    <div className="center-side-button">

                    </div>
                  </div>

                  {/* <button  className="btn btn-common-primary btn-primary-width240 editBtn uploadBtn"disabled={!this.state.isImage} >Upload Photo</button> */}
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch)   => {
  return {
   deleteprofileimage: (data) => dispatch(actions.deleteprofileimage(data)),
   getAccountDetails: () => dispatch(actions.getAccountDetails()),
  };
};

export default connect(null, mapDispatchToProps)(Profilemodal);
