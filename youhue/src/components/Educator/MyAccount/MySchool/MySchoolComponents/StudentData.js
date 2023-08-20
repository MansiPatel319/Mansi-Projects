import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../../Spinner/Spinner";
import {
  createTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

class StudentData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isToolTipOpen: false,
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

  componentDidUpdate(prevProps){
    console.log(prevProps.educator.switchSchoolTimeStamp,"prevprops");
    console.log(this.props.switchSchoolTimeStamp,"this.props");
    if(prevProps.educator.switchSchoolTimeStamp !== this.props.educator.switchSchoolTimeStamp){
      this.getSchoolData();
    }
  }

  defaultTheme = createTheme();
  TextOnlyTooltip = withStyles({
    tooltip: {
      marginLeft: "7px",
      maxWidth: "350px",
      padding: "10px 10px",
      textAlign: "left",
      backgroundColor: "#fff",
      border: "2px solid #652d90",
      boxShadow: "0 2px 4px 0 rgb(0 0 0 / 0%)",
      borderRadius: "12px",
      fontSize: "14px",
      lineHeight: "18px",
      color: "#3f3f44",
      letterSpacing: "0",
      fontFamily: "Omnes",
      fontWeight: "400",
    },
  })(Tooltip);
  handleToolTipOpen = () => {
    if (this.state.isToolTipOpen) {
      this.setState({ isToolTipOpen: false });
    } else {
      this.setState({ isToolTipOpen: true });
    }
  };
  render() {
    const details = this.state.data;
    return (
      <>
        {this.props.authenticate.loading ? <Spinner /> : null}
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="custom-text-div">
              <p className="prag-text">
                <span className="txt-span">Total Students: </span>
                <span className="ans-span"> {details.number_of_students} </span>
              </p>
              <p className="prag-text">
                <span className="txt-span">Total Classes: </span>
                <span className="ans-span"> {details.number_of_class} </span>
              </p>

              <p className="prag-text prag-text-flex">
                <span className="txt-span">School Category: &nbsp;</span>
                <span className="ans-span">
                  {details.school_category ? (
                    <div>
                      {details.school_category.category_name} (
                      {details.school_category.min_students} -{" "}
                      {details.school_category.max_students} students)
                    </div>
                  ) : (
                    ""
                  )}

                  {details.school_category && details.school_category.max_students ? (
                    <MuiThemeProvider
                    theme={this.defaultTheme}
                  >
                    <this.TextOnlyTooltip
                      placement="right"
                      open={this.state.isToolTipOpen}
                      title={details.school_category.admin_tool_tip || details.school_category.edu_tool_tip}
                      // title="You can continue to use YouHue for free until the total number of students in your school does not exceed 100. Upon adding the 101st student, you will be prompted to become or assign a school admin. 
                      // To find out more about our pricing plans, please visit youhue.com/pricing. You can also email us at support@youhue.com"
                    >
                      <div className="tooltip-div">
                        <Link
                          to="#"
                          className="tooltip-link"
                          data-toggle="tooltip"
                          id="tooltip-school-category"
                          title=""
                          onClick={() => {
                            (details.school_category.admin_tool_tip || details.school_category.edu_tool_tip) && this.handleToolTipOpen();
                          }}
                        >
                          {" "}
                          <span className="custom-icon info-new-icon"></span>{" "}
                        </Link>
                      </div>
                    </this.TextOnlyTooltip>
                  </MuiThemeProvider>
                    // <span className="tooltip-div">
                    //   <Link
                    //     to="#"
                    //     className="tooltip-link"
                        
                    //     data-toggle="tooltip"
                    //     title="<div className='text'> <p className='mb-10'></p></div>"
                    //   >
                    //     {" "}
                    //     <span className="custom-icon info-new-icon"></span>{" "}
                    //   </Link>
                    // </span>
                  ) : (
                    ""
                  )}
                </span>
              </p>
              <hr className="hr-custom-row01" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StudentData;
