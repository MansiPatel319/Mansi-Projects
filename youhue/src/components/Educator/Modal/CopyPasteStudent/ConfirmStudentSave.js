import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

class ConfirmStudentSave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flip_names: false,
      addstudentdatastate: [],
      hashError:false,
      errors:{
        message:"",
        index:""
      },
    };
  }
  flipbuttonclick = () => {
    this.setState({
      flip_names: !this.state.flip_names,
    });
    var flipstudentlist = [];
    var cloneArray = this.state.addstudentdatastate;

    this.state.addstudentdatastate.addStudentData.forEach((res, index) => {
      let objdatafliped = {};
      if (res.lname !== "") {
        objdatafliped["fname"] = res.lname;
        objdatafliped["lname"] = res.fname;
      } else if (res.lname === "") {
        objdatafliped["fname"] = res.fname;
        objdatafliped["lname"] = "";
      }
      flipstudentlist.push(objdatafliped);
    });
    cloneArray.addStudentData = flipstudentlist;
    this.setState({ addstudentdatastate: cloneArray });
  };
  checkhaserror = (cloneData)=> {
   
    var hasErrorlocalvar = false;
    if(cloneData.length!==0){
      cloneData.map( (index, i) => {
        if(index.fname===""){
         hasErrorlocalvar = true;
        }
       })
    }
    else{
      hasErrorlocalvar = true;
    }
    
    
    this.setState({hashError:hasErrorlocalvar});
  };
   handleRemoveRow=(data)=> {
     var finalList=[];
    let cloneData = [...this.state.addstudentdatastate.addStudentData];
    const index = cloneData.indexOf(data);
    if (index > -1) {
      cloneData.splice(index, 1);
    }
    cloneData.addStudentData = cloneData;
    this.setState({addstudentdatastate:cloneData});
    this.checkhaserror(cloneData);
  };
  handlechange = (e, value, Index) => {
    let cloneArray = this.state.addstudentdatastate;
    const array_key = e.target.name;
    const changed_value = e.target.value;
    cloneArray.addStudentData[Index][array_key] = changed_value;
    this.setState({ addstudentdatastate: cloneArray });
    if(array_key==="fname"&&changed_value===""){
      var errorMessage='Please enter first name';
      this.setState({errors:{message:errorMessage,index:Index}})
    }
    else{
      this.setState({errors:{message:"",index:Index}})
    }
    this.checkhaserror( cloneArray.addStudentData);
  };
  handleSteps = () => {

    // this.props.setAdminDashboardStepCount(step);

    //save
    if(this.state.hashError===false){
      this.props.onClose();
      this.props.onConfirm();
      const name = [];
      const { educator } = this.props;
      const classId = educator.classDetailData["id"];
      this.state.addstudentdatastate.addStudentData.forEach((res, index) => {
        const last_name =
          this.state.addstudentdatastate.addStudentData[index].lname !== ""
            ? this.state.addstudentdatastate.addStudentData[index].lname
            : "";
        name.push(
          this.state.addstudentdatastate.addStudentData[index].fname +
            " " +
            last_name
        );
      });
      const formData = new FormData();
      formData.append("name", JSON.stringify(name));
      formData.append("_class_id", classId);

      this.props
        .addStudents(formData)
        .then((res) => {
          if (res.status) {
            // this.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
            this.props.setAdminDashboardStepCount(0);
            this.props.getClassDetails(classId); 
            this.props.getAccountDetails();
            this.props.getSchoolData()
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
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.setState({ addstudentdatastate: this.props.educator });
  }

  render() {
    return (
      <Modal
        className="modal modal-custom modal-custom-new fade  modal-989"
        id="popup2"
        show={this.props.show}
        onHide={this.props.close}
        centered
        size="lg">
        <div className="modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
       
              <div className="heading-title-div">
              <button
                type="button"
                className="close"
                onClick={this.props.onClose}
                data-dismiss="modal">
                <span className="custom-icon cancel-new-icon-01"></span>
              </button>
                <h2 className="modal-title">Confirm import</h2>
              </div>
            </div>

            <div className="modal-body addstudent">
              <div className="addStudent_modal_confirm_import">
                <label
                  className="label modal-label small-text-label"
                  htmlFor="">
                  Please confirm that the names below are formatted correctly.
                </label>
                <div className="yh_confirmImport_formSection">
                  <div className="row">
                    <div className="col-lg-8 col-md-8">
                      <div className="yh_confirmImport_formGroup">
                        <form>
                        {this.state.addstudentdatastate
                                  .addStudentData &&
                                  this.state.addstudentdatastate.addStudentData.map(
                                    (index, i) => {
                                      return (
                          <div className="row">
                            <div className="col-lg-5 col-md-5">
                              <div className="yh_confirmImport_formField">
                                
                                {i!==0 && <label className="labletextbox">First Name</label>}
                                {i===0 && <label>First Name</label>}
                                        <div key={i}>
                                          <div className="yh_confirmImport_formField">
                                            <input
                                              type="text"
                                              placeholder=""
                                              maxLength={!index.lname ? 30 : 30-index.lname.length}
                                              ref={(f) => (this.fname = f)}
                                              value={index.fname}
                                              name="fname"
                                              className={!index.fname ? 'has-error' : ''}
                                              onChange={(event) =>
                                                this.handlechange(
                                                  event,
                                                  index.fname,
                                                  i
                                                )
                                              }
                                            />
                                          </div>

                                        </div>
                                   
                              </div>
                            </div>
                            <div className="col-lg-5 col-md-5">
                              <div className="yh_confirmImport_formField">
                              {i===0 && <label>Last Name</label>}
                              {i!==0 && <label className="labletextbox">Last Name</label>} 
                               
                                        <div>
                                          <div className="yh_confirmImport_formField">
                                            <input
                                            className="lanmae_input"
                                            maxLength={index.fname.length===30 ? 0 :30-index.fname.length}
                                              type="text"
                                              ref={(l) => (this.ltitle = l)}
                                              value={index.lname}
                                              name="lname"
                                              onChange={(event) =>
                                                this.handlechange(
                                                  event,
                                                  index.lname,
                                                  i
                                                )
                                              }
                                            />  
                                          </div>

                                        </div>
                                   
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2">
                              <div>
                                {
                                 i===0 && <Link to="#" className="fa fa-times delete0"  title="Delete" onClick={() => this.handleRemoveRow(index)}></Link>
                                }
                               {
                                 i!==0 && <Link to="#" className="fa fa-times delete"  title="Delete" onClick={() => this.handleRemoveRow(index)}></Link>
                                }
                              </div>
                                               
                                               </div>
                          </div>
   );
  }
)}
                        </form>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <div className="yh_formDialogue_wrapper">
                        <div className="yh_formDialogue_box">
                          <h3>
                            Are your first names showing up in the ‘last name’
                            field?
                          </h3>
                          <div className="flipBtn_block">
                            <Link to="#" onClick={this.flipbuttonclick}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="19.595"
                                viewBox="0 0 14 19.595">
                                <g
                                  id="noun_flip_771246"
                                  transform="translate(-2.8 -0.195) rotate(-90)">
                                  <g id="Group" transform="translate(0 2.8)">
                                    <path
                                      id="Path"
                                      d="M-6.445,6.18a.52.52,0,0,1,.76,0l1.76,1.76a6.843,6.843,0,0,0,.08-.92,5.941,5.941,0,0,0-5.94-5.94,5.942,5.942,0,0,0-2.68.64.533.533,0,0,1-.72-.24.533.533,0,0,1,.24-.72A6.883,6.883,0,0,1-9.785,0a7.029,7.029,0,0,1,7.02,7.02,6.545,6.545,0,0,1-.08,1.08l1.92-1.92a.52.52,0,0,1,.76,0,.52.52,0,0,1,0,.76L-2.925,9.7a.546.546,0,0,1-.38.16.546.546,0,0,1-.38-.16l-2.76-2.76A.556.556,0,0,1-6.445,6.18Z"
                                      transform="translate(-0.195)"
                                      fill="#a895a0"
                                    />
                                    <path
                                      id="Path-2"
                                      data-name="Path"
                                      d="M-13.059,2.925l2.74-2.76a.52.52,0,0,1,.76,0l2.76,2.76a.52.52,0,0,1,0,.76.52.52,0,0,1-.76,0l-1.76-1.76a6.843,6.843,0,0,0-.08.92,5.941,5.941,0,0,0,5.94,5.94,5.943,5.943,0,0,0,2.68-.64.533.533,0,0,1,.72.24A.533.533,0,0,1-.3,9.1a6.965,6.965,0,0,1-3.18.76,7.029,7.029,0,0,1-7.02-7.02,6.545,6.545,0,0,1,.08-1.08l-1.92,1.92a.546.546,0,0,1-.38.16.546.546,0,0,1-.38-.16A.559.559,0,0,1-13.059,2.925Z"
                                      transform="translate(-6.561 4.135)"
                                      fill="#a895a0"
                                    />
                                  </g>
                                </g>
                              </svg>
                              Flip first/last names
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="yh_formPopup_footer">
                <div className="row">
                  <div className="col-lg-3 col-md-3">
                    <div className="yh_popup_backBtn">
                      <Link to="#" onClick={this.props.onClose}>
                        Go back
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="yh_popup_continueBtn">
                      <button
                        className="btn btn-common-primary btn-primary btn-primary-width240"
                        disabled={this.state.hashError}
                        onClick={() => this.handleSteps()}
                        to="#">
                        Continue
                      </button>

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

export default ConfirmStudentSave;
