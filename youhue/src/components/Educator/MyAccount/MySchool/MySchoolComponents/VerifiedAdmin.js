import React, { Component } from "react";
import VerifyJoinRequest from "../../../Modal/VerifyJoinRequestModal/VerifyJoinRequest";
import DeclineJoinRequestModal from "../../../Modal/DeclineJoinRequest/DeclineJoinRequest";
import Spinner from "../../../../Spinner/Spinner";
import AddAdminModal from "../../../Modal/AddAdminModal/AddAdminModal";
import RevmoveEducatorFromSchool from "../../../../../containers/Educator/Modal/RevmoveEducatorFromSchool";
import SelectReplacementEducator from "../../../../../containers/Educator/Modal/SelectReplacementEducator";
import InviteEducatorToYourSchool from "../../../../../containers/Educator/Modal/InviteEducatorToYourSchool";
import MaximumSchoolLimitReached from "../../../Modal/MaximumSchoolLimitReached/MaximumSchoolLimitReached";
import imageIcon from "../../../../../assets/images/icons/user-new-icon.svg";
import { Link } from "react-router-dom";

class VerifiedAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eduList: [],
      schoolData: [],
      joinResData: "",
      isOpenJoinReqVerifyModal: false,
      // isOpenJoinReqDeclineModal: false,
      isOpenAddAdminModal: false,
      isOpenRemoveEducatorModal: false,
      eduID: "",
      removeeducatorid:"",
      isOpenReplaceModal: false,
      replacementClassList: [],
      educatorOptionList: [],
      isOpenInviteEducatorToYourSchool: false ,
      isOpenMaxLimitReached: false
    };
  }

  componentDidMount() {
    localStorage.setItem("const_url","")
    this.getEducatorList();
    this.getSchoolData();
    this.getJoinSchoolRequest();
  }

  componentDidUpdate(prevProps){
    if(prevProps.educator.switchSchoolTimeStamp !== this.props.educator.switchSchoolTimeStamp){
      this.getEducatorList();
      this.getSchoolData();
      this.getJoinSchoolRequest();
    }
  }

  getedu = () => {
    this.props
    .verifiedEducatorList()
    .then((res)=>{
      if (res.status) {
        this.setState({ eduList: res.data});
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getEducatorList = () => {
    this.props
      .verifiedEducatorList()
      .then((res) => {
        if (res.status) {
          const options = res.data.filter(a => !a.is_admin && a.user.verified_email).map(
            ({ user: { professor_name: label, id: value, email: email } }) => ({
              value: value,
              label: (
                <div className="select-card-dropdown-div">
                  <div className="dd-container">
                    <Link to="#" className="dd-option">
                      {" "}
                      <span className="span-img">
                        <img className="dd-option-image" src={imageIcon} />
                      </span>{" "}
                      <label className="dd-option-text" style={{textAlign:"left"}}>{label}</label>{" "}
                      <small className="dd-option-description dd-desc" style={{textAlign:"left"}}>
                        {email}
                      </small>
                    </Link>
                  </div>
                </div>
              ),
            })
          );
          this.setState({ eduList: res.data, educatorOptionList: options });
        } else {
          console.log("No Educator List found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getSchoolData = () => {
    this.props
      .getSchoolData()
      .then((res) => {
        if (res.status) {
          this.setState({ schoolData: res.data });
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

  getJoinSchoolRequest = () => {
    this.props
      .joinSchoolRequest()
      .then((res) => {
        if (res.status) {
          this.setState({ joinResData: res.data });
          // } else {
          //   this.props.addToast(res.message, {
          //     appearance: "error",
          //     autoDismiss: true,
          //   });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleisOpenVerifyRequestModal = (data,student) => {
    const schoolData = this.state.schoolData
    if(schoolData?.number_of_students+student>=schoolData?.school_category?.max_students+schoolData?.school_category?.extended_students  )
    {
      this.setState({ isOpenMaxLimitReached: true});
    }
    else
    {

      this.setState({ isOpenJoinReqVerifyModal: true, eduID: data });
    }
  };
  handleCloseJoinReqVerifyModal = () => {
    this.setState({ isOpenJoinReqVerifyModal: false });
  };
  // handleisOpenVerifyRequestModal = (data) => {
  //   this.setState({ isOpenJoinReqVerifyModal: true, eduID: data });
  // };
  handleCloseAddAdminModal = () => {
    this.setState({ isOpenAddAdminModal: false });
  };
  handleAddAdmin = (ids) => {
    var data = { educator_id: ids };
    this.props
      .addSchoolAdmin(data)
      .then((res) => {
        if (res.status) {
          // this.props.addToast(res.message, {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
          this.setState({ isOpenAddAdminModal: false });
          this.getEducatorList();
          this.getSchoolData();
          this.getJoinSchoolRequest();
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

  handleVerifyEducator = () => {
    
    var data = { educator_id: this.state.eduID };
    this.props
      .verifyJoinRequest(data)
      .then((res) => {
        if (res.status) {
          // this.props.addToast(res.message, {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
          this.setState({ isOpenJoinReqVerifyModal: false });
          this.getEducatorList();
          this.getSchoolData();
          this.getJoinSchoolRequest();
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

  handleisOpenDeclineRequestModal = (e, data) => {

    e.preventDefault();
    this.setState({ isOpenJoinReqDeclineModal: true, eduID: data });
    this.setState({removeeducatorid:data});
  };
  handleCloseJoinReDeclineModal = () => {
    this.setState({ isOpenJoinReqDeclineModal: false, eduID: "" });
  };

  handleDeclineEducator = (eduID) => {
    var data = { educator_id: eduID };
    this.props
      .declineJoinRequets(data)
      .then((res) => {
        if (res.status) {
          // this.props.addToast(res.message, {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
          // this.setState({ isOpenJoinReqDeclineModal: false });
          this.getJoinSchoolRequest();
            this.getEducatorList();
            this.getSchoolData();
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
  handleRemoveEducatorEducator = () => {
    let data = { educator_id: this.state.eduID };
    let formData = new FormData();
    formData.append("educator_id", this.state.eduID);
    this.props
      .revmoveEducatorFromSchool(formData)
      .then((res) => {
        const { code, data, status } = res;
        if (status) {
          
          this.setState({
                  
            isOpenJoinReqDeclineModal:false
          },()=>
          {this.getEducatorList();});
        } else {
          switch (code) {
            case 200:
            case 202:
              if (data.is_replace) {
                const classDataUpdate = data.classes.map((data) => {
                  data.educatorSeletcedOption = null;
                  return data;
                });
                this.setState({
                  isOpenReplaceModal: true,
                  replacementClassList: classDataUpdate,
                  isOpenJoinReqDeclineModal:false
                });
                this.getEducatorList();
              }
              else{               
                this.setState({
                  
                  isOpenJoinReqDeclineModal:false
                });
              }
              break;

            default:
              break;
          }
        }
        // this.setState({ isOpenJoinReqDeclineModal: false });
      })
      .catch((err) => {
        this.setState({
                  
          isOpenJoinReqDeclineModal:false
        });
        console.log(err);
      });
  };
 
  handleReplacementChanges = (params) => {
    this.props
      .replaceEductorFromSchool(params)
      .then((res) => {
        this.setState({ isOpenReplaceModal: false,isOpenJoinReqDeclineModal: false  });
         this.getEducatorList();

      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleClosePaidLimitReachedModal=()=>{
    this.setState({
      isOpenMaxLimitReached: false
    })
  }
  render() {
    const { eduList, schoolData, joinResData } = this.state;
    return (
      <>
        {this.props.authenticate.loading ? <Spinner /> : null}
        <div className="school-admin-table-dv verified-educators-table-dv mb-16">
          <div className="school-admin-table-row">
            <div className="heading-div">
              <h3>Verified Educators</h3>
            </div>

            <div className="table-div">
              <div className="row">
                <div className="col-lg-11 col-md-12">
                  <div className="table-responsive">
                    <table className="table custom-table">
                      <thead>
                        <tr>
                          <th className="min-w150">Name</th>
                          <th>Email</th>
                          <th className="min-w190">Verified by</th>
                          <th className="min-w160">Verified on</th>
                          <th className="action-th">
                            <div className="heading-action-right-div">
                              <button
                                className="btn btn-general-link btn-general-add"
                                data-toggle="modal"
                                // data-target="#invite-an-educator-modal"
                                onClick={() => {
                                  this.setState({
                                    isOpenInviteEducatorToYourSchool: true,
                                  });
                                }}
                              >
                                <span className="custom-icon plus-new-icon"></span>{" "}
                              </button>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {eduList && eduList.length !== 0 ? (
                          eduList.map((data) => {
                            return (
                              <tr key={data.id}>
                                <td>{data.user.professor_name}</td>
                                <td>{data.user.email}</td>
                                <td>{data.accepted_by}</td>
                                <td>{data.accepted_on}</td>
                                <td className="action-td">
                                  <div className="btn-action-div">
                                    {this.props.educator?.educatorData?.id === data.user.id 
                                      ? <button 
                                      className="btn btn-general-link btn-general-cancel custom-icon"
                                      style={{cursor:"default" ,height:"36px"}}
                                      ></button>
                                      : <button
                                        className="btn btn-general-link btn-general-cancel"
                                        onClick={(e) => {
                                          this.handleisOpenDeclineRequestModal(
                                            e,
                                            data.user.id
                                          );
                                       }}
                                        >
                                      <span className="custom-icon cancel-new-round-icon"></span>
                                    </button> }
                                    
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            {/* <td colSpan="4" style={{ textAlign: "center" }}>
                              No Verified Educator found.
                            </td> */}
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="school-admin-table-dv verified-educators-table-dv mb-16">
          <div className="school-admin-table-row">
            <div className="heading-div">
              <h3>Requests to join {schoolData.school_name}</h3>
            </div>

            <div className="table-div">
              <div className="row">
                <div className="col-lg-11 col-md-12">
                  <div className="table-responsive">
                    <table className="table custom-table">
                      <thead>
                        <tr>
                          <th className="min-w150">Name</th>
                          <th>Email</th>
                          <th className="min-w190">Requested on</th>
                          <th className="action-btn-verify">Verify/Decline</th>
                        </tr>
                      </thead>
                      <tbody>
                        {joinResData && joinResData.length !== 0 ? (
                          joinResData.map((res) => {
                            return (
                              <tr>
                                <td>{res.user.professor_name}</td>
                                <td>{res.user.email}</td>
                                <td>{res.request_on}</td>
                                <td className="action-td">
                                  <div className="btn-verify-action-div">
                                    <button
                                      data-toggle="modal"
                                      data-target="#verify-educator-confirmation-modal"
                                      className="btn btn-common-outline btn-primary2-fill btn-verify mr-10"
                                      onClick={() =>
                                        this.handleisOpenVerifyRequestModal(
                                          res.user.id,
                                          res.number_of_student
                                        )
                                      }
                                    >
                                      Verify
                                    </button>
                                    <button
                                      data-toggle="modal"
                                      data-target="#remove-educator-from-verified-confirmation-modal"
                                      className="btn btn-common-outline btn-primary3-fill btn-decline"
                                      onClick={() =>
                                        // this.handleisOpenDeclineRequestModal(
                                        //   res.user.id
                                        // )
                                        this.handleDeclineEducator(res.user.id)
                                      }
                                    >
                                      Decline
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            {/* <td colSpan="4" style={{ textAlign: "center" }}>
                              No New Request
                            </td> */}
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="school-admin-table-dv">
          <div className="school-admin-table-row">
            <div className="heading-div">
              <h3>Your school admins</h3>
            </div>

            <div className="table-div">
              <div className="row">
                <div className="col-lg-7 col-md-12">
                  <div className="table-responsive">
                    <table className="table custom-table">
                      <thead>
                        <tr>
                          <th className="min-w150">Name</th>
                          <th>Email</th>
                          <th className="action-th">
                            <div className="heading-action-right-div">
                              
                              <button
                                className="btn btn-general-link btn-general-add"
                                data-toggle="modal"
                                onClick={() =>
                                  this.setState({ isOpenAddAdminModal: true })
                                }
                                data-target="#add-school-admin-modal"
                                style={
                                  schoolData.number_of_educators <= 1
                                    ? { pointerEvents: "none", opacity: 0.3 }
                                    : null
                                }
                              >
                                {" "}
                                <span className="custom-icon plus-new-icon"></span>{" "}
                              </button>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {schoolData && schoolData.school_admin ? (
                          schoolData.school_admin.map((data) => {
                            return (
                              <tr>
                                <td>{data.professor_name}</td>
                                <td>{data.email}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                              No admin found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpenMaxLimitReached && (
               <MaximumSchoolLimitReached
               message="This means that you won’t be able to verify any new educators who already have students in their class."
               handleClose={this.handleClosePaidLimitReachedModal}
               />
        )}
        {this.state.isOpenJoinReqVerifyModal ? (
          <VerifyJoinRequest
            show={this.state.isOpenJoinReqVerifyModal}
            onClose={this.handleCloseJoinReqVerifyModal}
            verify={this.handleVerifyEducator}
            props={this.props}

          />
        ) : (
          ""
        )}
        {this.state.isOpenJoinReqDeclineModal ? (
          <DeclineJoinRequestModal
            show={this.state.isOpenJoinReqDeclineModal}
            onClose={this.handleCloseJoinReDeclineModal}
            // decline={this.handleDeclineEducator}
            decline={this.handleRemoveEducatorEducator}
            props={this.props}
          />
        ) : (
          ""
        )}
        {this.state.isOpenAddAdminModal ? (
          <AddAdminModal
            show={this.state.isOpenAddAdminModal}
            onClose={this.handleCloseAddAdminModal}
            addAdmin={(data) => this.handleAddAdmin(data)}
            props={this.props}
            educatorList={this.state.eduList}
            optionlist={this.state.educatorOptionList}
            getEducatorList={this.getEducatorList}
          />
        ) : (
          ""
        )}
        {this.state.isOpenRemoveEducatorModal ? (
          <RevmoveEducatorFromSchool
            show={this.state.isOpenRemoveEducatorModal}
            onClose={this.handleCloseAddAdminModal}
            addAdmin={(data) => this.handleAddAdmin(data)}
            props={this.props}
            educatorList={this.state.eduList}
          />
        ) : (
          ""
        )}
        {this.state.isOpenReplaceModal && (
          <SelectReplacementEducator
            show={this.state.isOpenReplaceModal}
            onClose={() => {
              this.setState({ isOpenReplaceModal: false,isOpenJoinReqDeclineModal:true });
            }}
            eduList={this.state.eduList}
            eduID={this.state.removeeducatorid}
            replacementClassList={this.state.replacementClassList}
            handleRelacementEducator={this.handleReplacementChanges}
          />
        )}
        {this.state.isOpenInviteEducatorToYourSchool && (
          <InviteEducatorToYourSchool
            show={this.state.isOpenInviteEducatorToYourSchool}
            onClose={() => {
              this.setState({ isOpenInviteEducatorToYourSchool: false },()=>{
                this.getedu()
              });
            }}
            schoolId={schoolData.id}
            // getJoinSchoolRequest={this.getJoinSchoolRequest()}
          />
        )}
      </>
    );
  }
}

export default VerifiedAdmin;
