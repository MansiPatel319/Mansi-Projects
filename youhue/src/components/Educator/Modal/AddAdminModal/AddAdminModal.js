import React, { Component } from "react";
import { Modal } from "react-bootstrap";

// import "../../AddClass/AddClass.scss";
// import "../../../styles/style.css";
import "../../../../styles/style.css";
import DropDownList from "../../../UI/DropDownList";
import imageIcon from "../../../../assets/images/icons/user-new-icon.svg";
import { propTypes } from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";
class AddAdminModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddAdminDisabled: true,
      educator_id: "",
      educatorOptionList :[],
      selectedEducator: undefined,
      educatoroptionlist1:props.optionlist,
      educatorList: props.educatorList
    };
  }
  
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.props.getEducatorList();

  }
  componentDidUpdate = (prevProps) =>
  {
    if(prevProps.educatorList!== this.props.educatorList)
    {
      const options = this.state.educatorList.map(
        ({ user: { professor_name: label, id: value } }) => ({
          value: value,
          label: label,
        })
      );
      this.setState({ educatorOptionList: options, educatorList: this.props.educatorList });
    }
  }

  handleFieldChange = (event) => {
    const { educatorList } = this.state;
    this.setState({ selectedEducator: event });
    educatorList.map((res) => {
      if (res.user.id === event.value) {
        this.setState({
          educator_id: res.user.id,
          isAddAdminDisabled: false,
        });
      }
    });
  };

  render() {
    // console.log('this.props :>> ', this.props);
    const {educatoroptionlist1,selectedEducator } = this.state;
    return (
      <>
        <Modal
          size="lg"
          className="modal modal-custom modal-custom-new fade"
          id="add-school-admin-modal"
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
                  onClick={this.props.onClose}
                >
                  <span className="custom-icon cancel-new-icon-01"></span>
                </button>
                <div className="heading-title-div">
                  <h2 className="modal-title" style={{ color: "#3f3f44" }}>
                    Add a school admin
                  </h2>
                </div>
              </div>

              <div className="modal-body">
                <div className="edit-form-school-card-root">
                  <div className="form-custom-div form-custom-400-div form-custom-select-div">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group select2-form-group">
                     
                             <DropDownList
                                  value={selectedEducator}
                                  handleOptionChange={(e) =>
                                    this.handleFieldChange(e)
                                  }
                                  options={educatoroptionlist1}
                                  placeholder={
                                    <div className="select-card-dropdown-div">
                                      <div className="dd-container">
                                        <Link to="#" className="dd-option">
                                          <span className="span-img">
                                            <img
                                              className="dd-option-image"
                                              src={imageIcon}
                                            />
                                          </span>
                                          <label className="dd-placeholder-text">
                                            Select an Educator
                                          </label>
                                        </Link>
                                      </div>
                                    </div>
                                  }
                                />
                          {/* <div className="input-div">
                            <div className="selectbox-inline">
                              <div className="select-box select-common select-box-group select-custom2">
                                <select
                                  className="js-select2 select2-an-educator"
                                  onChange={(e) => this.handleFieldChange(e)}
                                >
                                  <option> </option>
                                  {educatorList &&
                                    educatorList.map((data) => {
                                      if (!data.is_admin) {
                                        return (
                                          <option value={data.user.id}>
                                            {" "}
                                            {data.user.professor_name}{" "}
                                          </option>
                                        );
                                      }
                                    })}
                                </select>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="button-row button-row-add-school">
                          <div className="center-side-button">
                            <button
                              className="btn btn-common-primary btn-primary-width240"
                              disabled={this.state.isAddAdminDisabled}
                              onClick={(data) =>
                                this.props.addAdmin(this.state.educator_id)
                              }
                            >
                              Add school admin
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

export default AddAdminModal;
