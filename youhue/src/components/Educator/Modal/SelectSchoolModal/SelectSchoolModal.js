import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";

import "../../../../styles/style.css";
import DropDownList from "../../../UI/DropDownList";

class SelectSchoolModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolData:[],
      selectedSchool:"",
      isSaveChagesDisabled:true
    };
  }
  
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.getSchoolList();
  }

  getSchoolList(){
    this.props.SwitchSchool();
  }
  componentDidUpdate = (prevProps) =>
  {
    if(prevProps.switchSchoolData !== this.props.switchSchoolData)
    {
      const options = this.props.switchSchoolData.map(
        (res) => ({
          value: res.id,
          label: res.school_name,
        }),
      );
      let school = this.props.districtSchoolData.filter(person => person.owner ==true)
      .map((schoolSelect)=>({
        value: schoolSelect.id,
        label: schoolSelect.school_name}))
      this.setState({ 
        schoolData: options, 
        selectedSchool:school
      });
    }
  }

handleSelectFieldChange = (event) => {
    const {value } = event;
    this.setState({selectedSchool:event, isSaveChagesDisabled:false})
  };

  changeSchool = () => {
    this.props.saveSchool(this.state.selectedSchool?.value).then(
      this.props.getSchoolData(),
    ).then(
      this.props.onClose
    )
  }
  render() {
    return (
      <>
        <Modal
          size="lg"
          className="modal modal-custom modal-custom-new fade"
          id="add-school-admin-modal"
          show={this.props.show}
          onHide={this.props.onClose}
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
                    Switch School
                  </h2>
                </div>
              </div>

              <div className="modal-body">
                <div className="edit-form-school-card-root">
                  <div className="form-custom-div form-custom-400-div form-custom-select-div">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                      <div className="col-lg-12 col-md-12">
                                <div className="form-group select2-form-group">
                                  <div className="selectbox-inline">
                                    <div className="select-box select-common select-box-group select-custom2">
                                      <DropDownList
                                        value={this.state.selectedSchool}
                                        handleOptionChange={(e) =>
                                          this.handleSelectFieldChange(e)
                                        }
                                        options={this.state.schoolData}
                                        name="selectedSchool"
                                        placeholder="Select a school"
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
                              disabled={this.state.isSaveChagesDisabled}
                              onClick={(data) =>
                                this.changeSchool()
                              }
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
      </>
    );
  }
}

const mapStateToProps = state => {
    return {
        districtSchoolData: state.educator.switchSchoolData
    }
}

const mapDispatchToProps = (dispatch)   => {
    return {
      SwitchSchool: () => dispatch(actions.SwitchSchool()),
      saveSchool: (data) => dispatch(actions.saveSchool(data)),
      getAccountDetails: () => dispatch(actions.getAccountDetails()),
      getSchoolData: () => dispatch(actions.getSchoolData()),
      dosetSwitchSchoolTimeStamp: () => dispatch(actions.dosetSwitchSchoolTimeStamp())
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectSchoolModal);
