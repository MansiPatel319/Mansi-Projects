import React, { Component } from 'react'
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { Modal } from "react-bootstrap";
import '../../../styles/downloadReport.css'
import { Link } from "react-router-dom";


class DownloadReport extends Component {
    constructor(props) {
        super(props);
        this.handleApply = this.handleApply.bind(this);
        this.state = {
          isSelectClassOpen: false,
          isSelectStudentOpen: false,
          canSelectMultipleClasses: false,
          isEnableSelectMultiClass: false,
          isEnableSelectMultiStudent: false,
          toogleMultipleClassDropdown: false,
          toogleMultipleStudentDropdown: false,
          selectedTimeSlot: 'This Week',
          selectedClassName: 'Select Class',
          selectedStudentName: 'Select Student',
          multileSelectedClass: [],
          multileSelectedStudent: [],
          selectedClassesId: '',
          selectedStudentId: '',
          selectedClass:[],
          selectedStudent:[],
          classesList:[],
          studentsList:[],
          classErrors:null,
          studentErrors:null,
          startDate: moment().clone().startOf("week"),
          endDate: moment(),
        };
      }
    async componentDidMount() {
      localStorage.setItem("const_url","")
        await this.getAllClass();
    }

    getAllClass = async () => {
        const allClasses = await this.props.getAllClass();
        this.setState({classesList:allClasses.data});
    };
    getStudents = async (uuid) => {
      const studentsData = await this.props.getStudentList(uuid);
      console.log(studentsData,"studentsData");
        this.setState({studentsList:studentsData.data.student_list});
    };

    getSelectedClasses = async () => {
        let selectedClasses = [];

        if (this.state.isEnableSelectMultiClass) {
            selectedClasses = this.state.multileSelectedClass;
        } else {

            selectedClasses = [this.state.selectedClass];
        }
        return selectedClasses;
    }

    handleSelectedClass = async (data) => {
        await this.setState({ selectedClass: data , selectedClassName: data.name }, async () => {
        if (data) {
          this.handleToogleMultipleSelectClasses();
          this.setState({
            classErrors: null,
          });
        }
      });
      let lst = []
      lst.push(data.id);
      let formData = new FormData()
      formData.append("class_id",JSON.stringify(lst))
      // let students = await this.props.getStudentList(formData)
      // console.log(students.data,"students");
      // localStorage.setItem("student_class_id",data.id)
      this.getStudents(formData);
    };

    handleSelectedStudent = async (data) => {
      console.log("data",data);
      await this.setState({ selectedStudent: data, selectedStudentName: data.first_name }, async () => {
        if (data) {
          this.handleToogleMultipleSelectStudents();
          this.setState({
            studentErrors: null,
          });
        }
      });
    };

    showClasses = () => {
        if(!this.state.isSelectClassOpen){
          this.setState({ isSelectClassOpen: true });
        } else{
          this.setState({ isSelectClassOpen: false });
        }
    };

    hideClasses = () => {
      this.setState({ isSelectClassOpen: false });
    };

    handleToogleMultipleSelectClasses = () => {
      this.setState({toogleMultipleClassDropdown: !this.state.toogleMultipleClassDropdown})
    }

    handleToogleMultipleSelectStudents = () => {
      this.setState({toogleMultipleStudentDropdown: !this.state.toogleMultipleStudentDropdown})
    }

    handleSelectMultipleClassOption = () => {
      this.setState({multileSelectedClass:[]});
      this.setState({selectedClass:[]});
      this.setState({isEnableSelectMultiClass: !this.state.isEnableSelectMultiClass});
    }

    handleSelectMultipleStudentOption = () => {
      this.setState({isEnableSelectMultiStudent: !this.state.isEnableSelectMultiStudent})
    }

    handleSelectMultipleClass= async(e,data) =>{
      console.log("data",data);
      e.preventDefault();
      let newArray = [...this.state.multileSelectedClass]
      console.log("newArray",newArray);
        const index = newArray.findIndex((item) => item.id === data.id)
        console.log("index",index);
        if (index.toString() !== '-1') {
          newArray.splice(index, 1)
        } else {
          newArray.push(data)
        }
        await this.setState({ multileSelectedClass: newArray, classErrors:null});
        let formData = new FormData()
        let ar = newArray.map((e)=>e.id)
        formData.append("class_id",JSON.stringify(ar))

        await this.getStudents(formData);
    }

    handleSelectMultipleStudent(e,data){
        e.preventDefault();
        let newArray = [...this.state.multileSelectedStudent]
        const index = newArray.findIndex((item) => item.student_id === data.student_id)
        if (index.toString() !== '-1') {
          newArray.splice(index, 1)
        } else {
          newArray.push(data)
        }
        this.setState({ multileSelectedStudent: newArray})
        this.setState({
            studentErrors: null,
        });
    }

      handleTimeSlote(e,timeSlot){
        e.preventDefault();
        if (timeSlot === "This Week") {
            this.setState(
              {
                selectedTag: e.target.text,
                startDate: moment().clone().startOf("week"),
                endDate: moment(),
              },
              () => {
                // this.getInsightAdminData();
              }
            );
          }
          if (timeSlot === "Last Week") {
            var currentDate = moment().subtract(1, "week");
            this.setState(
              {
                selectedTag: e.target.text,
                startDate: currentDate.clone().startOf("week"),
                endDate: currentDate.clone().endOf("week"),
              },
              () => {
                // this.getInsightAdminData();
              }
            );
          }
          if (timeSlot === "30 days") {
            this.setState({
              selectedTag: e.target.text,
              startDate: moment().subtract(30, "days"),
              endDate: moment(),
            });
          }
          if (timeSlot === "All Time") {
            this.setState({
              selectedTag: e.target.text,
              startDate: '',
              endDate: moment(),
            });
          }
        this.setState({ selectedTimeSlot: timeSlot})
      }

      downloadStudentsReport = async (e) => {
        let startDate = this.state.startDate;
        const endDate = this.state.endDate;
        let selectedStudents = [];

        if (this.state.isEnableSelectMultiStudent) {
            selectedStudents = this.state.multileSelectedStudent;
        } else {
            if (!this.state.selectedStudent.student_id) {
                this.setState({
                  studentErrors: "Please select the student",
                });
                return false;
            }
            selectedStudents = [this.state.selectedStudent];
        }
        if (selectedStudents.length <= 0 ) {
            this.setState({
                studentErrors: "Please select the student",
            });
            return false;
        }
        console.log(selectedStudents,"selectedStudents");

        let student_ids = selectedStudents.map(e => e.id);
        var keyArray = selectedStudents.map(function (item) {
          return `${item["class_id"]}||${item["student_id"]}`;
        });
        if (startDate){
          startDate= ""
        }
        let data = {
          student_ids:keyArray,
          start_date:startDate,
          end_date:endDate.format('YYYY-MM-DD')
        }
        // console.log(data);
        localStorage.setItem("student_report",JSON.stringify(data))
        localStorage.setItem("const_url","/download/studentReport/")
        window.open("/download/studentReport/");


        // let params = '?start_date=' + startDate.format("YYYY-MM-DD")+ "&end_date="+endDate.format('YYYY-MM-DD')+"&class_id="+student_ids;

        // const studentsReport = await this.props.downloadStudentReport(params);

        // this.downloadFile('http://www.africau.edu/images/default/sample.pdf','Student Report.pdf');
      };

      downloadClassesReport = async (e) => {
        let startDate = this.state.startDate;
        const endDate = this.state.endDate;
        let selectedClasses = [];

        if (this.state.isEnableSelectMultiClass) {
            selectedClasses = this.state.multileSelectedClass;
        } else {
            if (!this.state.selectedClass.id) {
                this.setState({
                  classErrors: "Please select the class",
                });
                return false;
            }
            selectedClasses = [this.state.selectedClass];
        }

        if (selectedClasses.length <= 0 ) {

            this.setState({
              classErrors: "Please select the class",
            });
              return false;
        }


        let class_ids = selectedClasses.map(e => e.id);

        // let params = '?start_date=' + startDate.format("YYYY-MM-DD")+ "&end_date="+endDate.format('YYYY-MM-DD')+"&class_id="+class_ids;
        if (startDate){
          startDate= startDate.format("YYYY-MM-DD")
        }
        // let formData = new FormData();
        // formData.append("class_id", class_ids);
        // formData.append("start_date", startDate);
        // formData.append("end_date", endDate.format('YYYY-MM-DD'));
        let data = {
          class_id:class_ids,
          start_date:startDate,
          end_date:endDate.format('YYYY-MM-DD')
        }
        // console.log(data);
        localStorage.setItem("class_report",JSON.stringify(data))
        localStorage.setItem("student_class_id",class_ids)
        localStorage.setItem("const_url","/download/classReport/")
        window.open("/download/classReport/");

        // const classReport = await this.props.downloadClassReport(formData);

        // this.downloadFile('http://www.africau.edu/images/default/sample.pdf','Class Report.pdf');
      };

      downloadFile = async (file_url,file_name) => {
        let link = document.createElement('a');
        link.href = file_url;
        link.target = '_blank';
        link.setAttribute(
          'download',
          file_name,
        );
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
        this.props.onClose();
      }

      handleSelectAllOptions = (type) => {
        if (type == "None"){
          this.setState({multileSelectedClass: []})
        }
        else{
          this.setState({multileSelectedClass: this.state.classesList})
        }
      }

      handleSelectAllStudentsOptions = (type) => {
        if (type == "None"){
          this.setState({multileSelectedStudent: []})
        }
        else{
          this.setState({multileSelectedStudent: this.state.studentsList})
        }
      }

      handleApply = (event, picker) => {
        this.setState(
          {
            startDate: picker.startDate,
            endDate: picker.endDate,
          },
          () => {
          }
        );
      };

    render() {
        const { startDate, endDate } = this.state;
        console.log(this.state,"this.state");
        return (
            <div>
                {/* <!-- Start Multiple class modal --> */}
                {/* <div className="modal-backdrop fade show download-report"></div> */}
                {/* <div
                className="modal modal-custom modal-custom-new multiple_class_modal fade show"
                id="download-report"
                style={{display: "block"}}
                // onClick={(e)=>this.checkCkickEvent(e)}
                > */}
                <Modal
                    size="lg"
                    className="modal modal-custom modal-custom-new multiple_class_modal download-report"
                    dialogClassName='default-download-report'
                    id="download-report"
                    show={this.props.show}
                    onHide={this.props.onClose}
                    centered
                >

                  {/* <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content"> */}
                    {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                          {/* <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            onClick={this.props.onClose}
                          >
                              <span className="custom-icon cancel-new-icon-01"></span>
                          </button> */}
                            <div className="heading-title-div">
                            <h2 className="modal-title" style={{"color":"white"}}>Download Reports</h2>
                            </div>
                        </div>

                        <div className="modal-body">
                            {/* <!-- Start here  --> */}
                            <div className="multiple_classes_body">
                                <div className="dropdown_group_block">
                                <div className="dropdown-group-box date-dropdown-group-box">
                                <div className="input-inline-group">
                                <ul>
                                    <li><Link to="#" className={this.state.selectedTimeSlot == 'This Week' ? 'active' : ''} onClick={(e) => this.handleTimeSlote(e,'This Week') } >This Week</Link></li>
                                    <li><Link to="#"
                                        className={this.state.selectedTimeSlot == 'Last Week' ? 'active' : ''}
                                        onClick={(e) => this.handleTimeSlote(e,'Last Week') }
                                        >Last Week</Link></li>
                                    <li><Link to="#"
                                    className={this.state.selectedTimeSlot == '30 days' ? 'active' : ''}
                                    onClick={(e) => this.handleTimeSlote(e,'30 days') }
                                    >30 days</Link></li>
                                    <li><Link to="#"
                                    className={this.state.selectedTimeSlot == 'All Time' ? 'active' : ''}
                                    onClick={(e) => this.handleTimeSlote(e,'All Time') }
                                    >All Time</Link></li>
                                </ul>
                                </div>
                                </div>
                                <DateRangePicker
                                    locale={{ format: "DD MMM YYYY" }}
                                    maxDate={moment().format("DD MMM YYYY")}
                                    initialSettings={{
                                        startDate: startDate,
                                        endDate: endDate,
                                        maxDate:moment().toDate()
                                      }}
                                      startDate={startDate}
                                      endDate={endDate}
                                    onApply={this.handleApply}
                                >
                                <div className="icon-box date-icon-box">
                                <input
                                    type="text"
                                    className="form-control form-date"
                                    id="downloadReport-DatePicker"
                                    name="daterange"
                                    value={`${
                                        startDate
                                          ? startDate.format("DD MMM YYYY")
                                          : ""
                                      } - ${
                                        endDate
                                          ? endDate.format("DD MMM YYYY")
                                          : ""
                                      }`}
                                    onChange={() => console.log("CHANGE")}
                                />
                                <label className='active'><span className="custom-icon calendar-icon"></span></label>
                                </div>
                                </DateRangePicker>
                            </div>
                                <div className="multiple_download_wrapper">
                                <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="multiple_download_block">
                                    <div className="dropdown-group-box user-dropdown-group-box">
                                    <div className={`multiClass_select${!this.state.isEnableSelectMultiClass? "" : " multiCheckbox"}`}>
                                        <div className="dropdown">
                                            {this.state.isEnableSelectMultiClass?
                                            <button onClick={(e) => this.handleToogleMultipleSelectClasses(e,this.state.classesList[0]) } style={{"color":"black"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <input type="checkbox" name="multi1" id="multi1" />
                                                    <label htmlFor="multi1" className={this.state.multileSelectedClass.length > 0 ? 'checked' : '' }>
                                                        {this.state.classesList.length > 0 && this.state.multileSelectedClass.length > 0 ? this.state.multileSelectedClass.length + ' Classes Selected' : 'Select Class' }
                                                    </label>
                                            </button>
                                            :
                                            <button onClick={this.handleToogleMultipleSelectClasses} style={{"color":"black"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="custom-icon user-icon"></span>{this.state.selectedClassName !== '' ? this.state.selectedClassName : 'Name Your Class'}
                                            </button>
                                            }
                                            <ul style={{"height":"350px", "overflow":"auto"}} className={this.state.toogleMultipleClassDropdown ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="dropdownMenuButton">
                                            {this.state.isEnableSelectMultiClass ?
                                                <>
                                                {this.state.classesList.length > 0 && this.state.classesList.map((data, index) => {

                                                    const key = this.state.multileSelectedClass.findIndex(a => a.id === data.id);
                                                    return <li onClick={(e) => this.handleSelectMultipleClass(e,data)} key={`index_select_${index}`} className={`dropdown-item ${key.toString() !== '-1'? ' checked' : ''}`}>
                                                            <input type="checkbox" name={data.name} id={data.name} />
                                                            <label htmlFor={data.name}>{data.name}</label>
                                                            </li>
                                                })}
                                                <Link onClick={() => this.state?.classesList.length === this.state.multileSelectedClass.length
                                                      ? this.handleSelectAllOptions('None') : this.handleSelectAllOptions('Select All')}
                                                    className="dropdown_link"
                                                    to="#"
                                                  >
                                                    {this.state?.classesList
                                                      .length ===
                                                    this.state.multileSelectedClass.length
                                                      ? "None"
                                                      : "Select All"}
                                                  </Link>
                                                {/* <Link onClick={this.handleSelectAllOptions('Select All')} className="dropdown_link" to="#">Select All</Link> */}
                                                {
                                                  this.state.isEnableSelectMultiClass && this.state.multileSelectedClass?.length >0  ? 
                                                  <Link onClick={this.handleToogleMultipleSelectClasses} className="dropdown_btn" to="#">Done</Link> :
                                                  <Link onClick={this.handleSelectMultipleClassOption} className="dropdown_btn" to="#">Cancel</Link>
                                                }
                                                </>
                                            :
                                            <>
                                            {this.state.classesList.length > 0 && this.state.classesList.map((data, index) => {
                                                return <li onClick={() => this.handleSelectedClass(data)} key={`index_single_${index}`} className="dropdown-item">
                                                        <Link to="#">
                                                            <span className="custom-icon user-icon"></span> {data.name}
                                                        </Link>
                                                    </li>
                                            })}


                                                {/* <li className="dropdown-item">
                                                <Link to="#">
                                                    <span className="custom-icon user-icon"></span> Ms. Green’s 4th Grade
                                                </Link>
                                                </li>
                                                <li className="dropdown-item">
                                                <Link to="#">
                                                    <span className="custom-icon user-icon"></span> Ms. Green’s 4th Grade
                                                </Link>
                                                </li> */}
                                                <button onClick={this.handleSelectMultipleClassOption} className="dropdown_link" to="#">Select Multiple Classes</button>
                                            </>
                                            }
                                            </ul>

                                        </div>

                                    </div>

                                </div>
                                { this.state.classErrors &&
                                    <div className="error-box active"><p className="error-text" style={{textAlign: 'left'}}>{this.state.classErrors}</p></div>
                                }
                                    <Link  to="#" onClick={(e)=>this.downloadClassesReport(e)} className="download_btn" >Download Class Report </Link>
                                    </div>
                                </div>

                                {/* Student Data DropDown */}


                                <div className={(this.state.selectedClass.id) && this.state.studentsList.length > 0 ? "col-lg-6 col-md-6" : 'col-lg-6 col-md-6 disabled'}>
                                    <div className="multiple_download_block">
                                    <div className="dropdown-group-box user-dropdown-group-box">
                                        <div className={`multiClass_select${!this.state.isEnableSelectMultiStudent? "" : " multiCheckbox"}`}>
                                        <div className="dropdown">
                                            {/* <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            >
                                            <span className="custom-icon user-icon"></span>
                                                {this.state.selectedStudentName !== '' ? this.state.selectedStudentName : 'Select Student'}
                                            </button> */}
                                            {this.state.isEnableSelectMultiStudent?
                                            <button onClick={(e) => this.handleToogleMultipleSelectStudents(e,this.state.studentsList[0]) } style={{"color":"black"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <input type="checkbox" name="multi1" id="multi1" />
                                                    <label htmlFor="multi1" className={this.state.multileSelectedStudent.length > 0 ? 'checked' : '' }>
                                                        {this.state.studentsList.length > 0 && this.state.multileSelectedStudent.length > 0 ? this.state.multileSelectedStudent.length + ' Students Selected' : 'Select Student' }
                                                    </label>
                                            </button>
                                            :
                                            <button onClick={this.handleToogleMultipleSelectStudents} style={{"color":"black"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="custom-icon student-single-icon"></span>{this.state.selectedStudentName !== '' ? this.state.selectedStudentName : 'Select Student'}
                                            </button>
                                            }
                                            <ul style={{"height":"350px", "overflow":"auto"}}
                                            className={this.state.toogleMultipleStudentDropdown ? "dropdown-menu show" : "dropdown-menu"}
                                            aria-labelledby="dropdownMenuButton"
                                            >
                                                {this.state.isEnableSelectMultiStudent ?
                                                <>
                                                {this.state.studentsList.length > 0 && this.state.studentsList.map((data, index) => {
                                                  // console.log("data",data);
                                                  console.log("this.state.multileSelectedStudent",this.state.multileSelectedStudent);

                                                    const key = this.state.multileSelectedStudent.findIndex(a => a.student_id === data.student_id);
                                                    return <li onClick={(e) => this.handleSelectMultipleStudent(e,data)} key={`index_select_student_${index}`} className={`dropdown-item ${key.toString() !== '-1'? ' checked' : ''}`}>
                                                            <input type="checkbox" name={data.first_name} id={data.first_name} />
                                                            <label htmlFor={data.first_name}>{data.first_name}</label>
                                                            </li>
                                                })}
                                                <Link onClick={() => this.state?.studentsList.length === this.state.multileSelectedStudent.length
                                                      ? this.handleSelectAllStudentsOptions('None') : this.handleSelectAllStudentsOptions('Select All')}
                                                    className="dropdown_link"
                                                    to="#"
                                                  >
                                                    {this.state?.studentsList
                                                      .length ===
                                                    this.state.multileSelectedStudent.length
                                                      ? "None"
                                                      : "Select All"}
                                                  </Link>
                                                {/* <Link onClick={this.handleSelectAllStudentsOptions} className="dropdown_link" to="#">Select All</Link> */}
                                                {
                                                  this.state.isEnableSelectMultiStudent && this.state.multileSelectedStudent?.length > 0  ? 
                                                  <Link onClick={this.handleToogleMultipleSelectStudents} className="dropdown_btn" to="#">Done</Link> :
                                                  <Link onClick={this.handleSelectMultipleStudentOption} className="dropdown_btn" to="#">Cancel</Link>
                                                }
                                                {/* <Link onClick={this.handleSelectMultipleStudentOption} className="dropdown_btn" to="#">Cancel</Link> */}
                                                </>
                                            :
                                            <>
                                            {this.state.studentsList.length > 0 && this.state.studentsList.map((data, index) => {
                                                return <li onClick={() => this.handleSelectedStudent(data)} key={`index_single_student_${index}`} className="dropdown-item">
                                                        <Link to="#">
                                                            <span className="custom-icon student-single-icon"></span> {data.first_name}
                                                        </Link>
                                                    </li>
                                            })}


                                                {/* <li className="dropdown-item">
                                                <Link to="#">
                                                    <span className="custom-icon user-icon"></span> Ms. Green’s 4th Grade
                                                </Link>
                                                </li>
                                                <li className="dropdown-item">
                                                <Link to="#">
                                                    <span className="custom-icon user-icon"></span> Ms. Green’s 4th Grade
                                                </Link>
                                                </li> */}
                                                <Link onClick={this.handleSelectMultipleStudentOption} className="dropdown_link" to="#">Select Multiple Students</Link>
                                            </>
                                            }

                                            {/* <li className="dropdown-item">
                                                <Link  to="#">
                                                <span className="custom-icon user-icon"></span> Ms.
                                                Green’s 4th Grade
                                                </Link>
                                            </li>
                                            <li className="dropdown-item">
                                                <Link  to="#">
                                                <span className="custom-icon user-icon"></span> Ms.
                                                Green’s 4th Grade
                                                </Link>
                                            </li>
                                            <li className="dropdown-item">
                                                <Link  to="#">
                                                <span className="custom-icon user-icon"></span> Ms.
                                                Green’s 4th Grade
                                                </Link>
                                            </li>
                                            <li className="dropdown-item">
                                                <Link  to="#">
                                                <span className="custom-icon user-icon"></span> Ms.
                                                Green’s 4th Grade
                                                </Link>
                                            </li> */}

                                            {/* <Link className="dropdown_link"  to="#"
                                                > Select Multiple Students </Link> */}
                                            </ul>
                                        </div>
                                        </div>

                                    </div>
                                    { this.state.studentErrors &&
                                      <div className="error-box active"><p className="error-text" style={{textAlign: 'left'}}>{this.state.studentErrors}</p></div>
                                    }
                                    <Link  to="#"
                                      onClick={(e)=>this.downloadStudentsReport(e)}
                                      className="download_btn"
                                        >Download Student Report
                                    </Link>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            {/* <!-- Start here  --> */}
                        </div>
                    {/* </div>

                  </div> */}
                </Modal>
              {/* </div> */}

                {/* <!-- End of modal --> */}

            </div>
        )
    }
}

export default DownloadReport;

