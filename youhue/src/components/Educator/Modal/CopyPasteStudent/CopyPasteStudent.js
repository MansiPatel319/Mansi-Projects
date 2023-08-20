import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ConfirmStudentSave from "../../../../containers/Educator/ConfirmStudentSave";
import FreeLimitReachedInvite from "../../../../containers/Educator/Modal/FreeLimitReachedInvite";
import spinner from "../../../Spinner/Spinner";
import UnveifiedLimitReachedModal from "../../Dashboard/AccountLock/UnveifiedLimitReachedModal";
import MaximumSchoolLimitReached from "../MaximumSchoolLimitReached/MaximumSchoolLimitReached";

class CopyPasteStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImportDisabled: true,
      isOpenFreeLimitReachedModal: false,
      numberof_student:{
        maxlimit:"",
        alreadenternumberofstudent:"",
        currentaddedenumberofstudent:"",
      },
      isOpenStudentSaveModal: false,
      textAreaValue: "",
      textAreaValueDisplay:"",
      classDetails: this.props.educator.classDetailData,
      accoutDetails: this.props.educator.educatorData, 
      isPaid: undefined,
      isUnverifiedFreeLimitReachedModal: false,
      isOpenPaidLimitReachedModal: false,
      loading: false, 
      show:props.show
    };
  }

  handleTextAreaChange = (event) => {
    this.setState({ isImportDisabled: false });
    var student_data = event.target.value;
    var lines = student_data.split('\n');
    var charlimit = 30;
    for (var i = 0; i < lines.length; i++) {

        if (lines[i].length <= charlimit){
             continue;
        }
        lines[i] = lines[i].substring(0,charlimit)


    }

    student_data = lines.slice(0).join('\n');
    this.setState({ textAreaValueDisplay: student_data });

    var trimstudent_data = student_data.trim();
    var student_list = trimstudent_data.split("\n").map(trimstudent_data => trimstudent_data.trim());

    var filtered_student_list = student_list.filter(function (el) {
      return el !== "";
    });
    if(filtered_student_list.length===0){
      this.setState({ isImportDisabled: true });
    }
    this.setState({ textAreaValue: filtered_student_list });

  };
  isOpenStudentSaveModal = () => {
    this.setState({ isOpenStudentSaveModal: false, show:true });
  };
  isOpenCopyPasteModal = () => {
    this.props.onClose();
  };

  getSchoolData = () => {
   
    this.props
      .getSchoolData()
      .then((res) => {
        this.setState({isPaid: res.data.paid})
        if (res.status) {
          const max_students =  res?.data?.school_category?.max_students  ? res.data.school_category.max_students : 100;
          const totalenterstudent =  res?.data?.number_of_students ;
          this.setState({ numberof_student:{maxlimit:max_students,alreadenternumberofstudent:totalenterstudent}})
          this.setState({loading: false})
          } 
      })
      .catch((err) => {
        console.log(err);
        this.setState({loading: false})
      });
  };
  handleStudentSaveModal = () => {
  
    if (this.state.accoutDetails.verifiy_educator) {
    const textAreaValue=this.state.textAreaValue.length?this.state.textAreaValue.length:0;
    const maxLimit =  ( this.state?.isPaid || this.state.accoutDetails.role==="Admin" )? this.state.numberof_student.maxlimit+25 : this.state.numberof_student.maxlimit;
    const alreadyEntered = this.state.numberof_student.alreadenternumberofstudent ? this.state.numberof_student.alreadenternumberofstudent : 0;
    const remainingLimit = maxLimit - alreadyEntered;
    // var remaininglist = this.state.numberof_student.maxlimit ? this.state.numberof_student.maxlimit : 0-this.state.numberof_student.alreadenternumberofstudent ? this.state.numberof_student.alreadenternumberofstudent:0;
    var addedlist=remainingLimit -textAreaValue;
    if(addedlist>=0){
      var finalArraylist=[];
      var final_list=this.state.textAreaValue;


      final_list.map((index)=>{
        var data=index.split(" ");
        var mainobjdata={};
        mainobjdata["fname"]=data[0];
        mainobjdata["lname"]=data.length>2?data.slice(1,data.length).join(" "):data[1]===undefined?"":data[1];
        finalArraylist.push(mainobjdata);
      })

      this.props.props.addStudentData(finalArraylist);
      this.setState({ isOpenStudentSaveModal: true, show: false });
    }
    else{
      if (this.state.isPaid || this.state.accoutDetails.role==="admin") {
        this.setState({
          isOpenPaidLimitReachedModal: true,
          show: false
        });
      } else {
        this.setState({ isOpenFreeLimitReachedModal: true,  show: false });
      }
     
    }
  }
  else{
    const textAreaValue=this.state.textAreaValue.length?this.state.textAreaValue.length:0;
    const maxLimit =  100;
    const alreadyEntered = this.state.classDetails.temp_no_students ? this.state.classDetails.temp_no_students : 0;
    const remainingLimit = maxLimit - alreadyEntered;
    // var remaininglist = this.state.numberof_student.maxlimit ? this.state.numberof_student.maxlimit : 0-this.state.numberof_student.alreadenternumberofstudent ? this.state.numberof_student.alreadenternumberofstudent:0;
    var addedlist=remainingLimit -textAreaValue;
    if(addedlist>=0){
      var finalArraylist=[];
      var final_list=this.state.textAreaValue;


      final_list.map((index)=>{
        var data=index.split(" ");
        var mainobjdata={};
        mainobjdata["fname"]=data[0];
        mainobjdata["lname"]=data.length>2?data.slice(1,data.length).join(" "):data[1]===undefined?"":data[1];
        finalArraylist.push(mainobjdata);
      })

      this.props.props.addStudentData(finalArraylist);
      this.setState({ isOpenStudentSaveModal: true ,show: false});
    }
    else{
      this.setState({ isUnverifiedFreeLimitReachedModal: true, show: false });
    }
  }
  };
  handleCloseFreeLimitReachedModal = () => {
    this.setState({ isOpenFreeLimitReachedModal: false, show: true });
  };
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.setState({loading: true})
    this.getSchoolData();
    this.props.getAccountDetails()
  }
  handleClosePaidLimitReachedModal = () => {
    this.setState({ isOpenPaidLimitReachedModal: false,show: true });
  };
  render() {
    return (
      <>
      {this.state.loading ? <spinner /> :(

     <>
        <Modal
          className="modal modal-custom modal-custom-new fade"
          show={this.state.show}
          onHide={this.props.close}
          centered
          id="popup1"
          size="lg"
        >
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
                  <h2 className="modal-title">Copy/Paste student list</h2>
                </div>
              </div>

              <div className="modal-body">
                <div className="addStudent_modal">
                  <label className="label modal-label small-text-label" for="">
                    Paste your student list
                  </label>
                  <div className="addStudent_textarea">
                    <textarea
                      placeholder={`Copy/Paste your student names here. Put each name on a new line.

Examples

First Name Last Name
First Name Last Name
First Name Last Name

--- or ---

Last Name First Name
Last Name First Name
Last Name First Name`}

                      onChange={this.handleTextAreaChange}
                      value={this.state.textAreaValueDisplay}
                    />
                  </div>
                  <div className="button-row button-row-add-school">
                    <div className="center-side-button text-center">
                      <button
                        className="btn btn-common-primary btn-primary-width240"
                        disabled={this.state.isImportDisabled}
                        onClick={this.handleStudentSaveModal}
                      >
                        Import list
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {this.state.isOpenStudentSaveModal ? (
          <ConfirmStudentSave
            show={this.state.isOpenStudentSaveModal}
            onClose={this.isOpenStudentSaveModal}
            onConfirm={this.isOpenCopyPasteModal}
            props={this.props}
          />
        ) : null}
            {this.state.isOpenFreeLimitReachedModal ? (
          <FreeLimitReachedInvite
            show={this.state.isOpenFreeLimitReachedModal}
            onClose={this.handleCloseFreeLimitReachedModal}
          />
        ) : null}
        {this.state.isUnverifiedFreeLimitReachedModal ? (
          <UnveifiedLimitReachedModal onClose={()=>this.setState({isUnverifiedFreeLimitReachedModal: false})}
          
        />
        ) : null}
           {this.state.isOpenPaidLimitReachedModal ? (
          <MaximumSchoolLimitReached
          show={this.state.isOpenPaidLimitReachedModal}
          handleClose={this.handleClosePaidLimitReachedModal}
          />
        ) : null}
        </>
         )}
      </>
    );
  }
}

export default CopyPasteStudent;
