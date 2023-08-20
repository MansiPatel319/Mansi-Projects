import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LoginContainer from "../../containers/Authentication/Login";
import SignupContainer from "../../containers/Authentication/Signup";
import SignupFromInviteContainer from "../../containers/Authentication/SignupFromInvite";
import PrivacyPolicyContainer from "../../containers/Authentication/PrivacyPolicy";

import ResetPasswordContainer from "../../containers/Authentication/ResetPassword";
import ResetPasswordLinkContainer from "../../containers/Authentication/ResetPasswordLink";
import ActivateAccountContainer from "../../containers/Authentication/ActivateAccount";
import Gobackfromlogin from "../../containers/Authentication/VerifiedEmail";
import FindSchoolContainer from "../../containers/Authentication/School/FindSchool";
import AddSchoolContainer from "../../containers/Authentication/School/AddSchool";
import JoinSchoolContainer from "../../containers/Authentication/School/JoinSchool";
import VerifyEmailContainer from "../../containers/Authentication/School/VerifyEmail";

//Educators
import EducatorContainer from "../../containers/Educator/Educator";
import EducatorClassesContainer from "../../containers/Educator/Classes";
import EducatorInsightDashboardContainer from "../../containers/Educator/InsightDashboard/InsightDashboard";
//import EducatorAccountContainer from "../../containers/Educator/EditAccount";
import AddClassContainer from "../../containers/Educator/AddClass";
import ChangePasswordContainer from "../../containers/Educator/MyAccount/ChangePassword";
import EditProfileContainer from "../../containers/Educator/MyAccount/EditProfile";
import EducatorAccountContainer from "../../containers/Educator/MyAccount/MySchool";
import ContactUsContainer from "../../containers/Educator/MyAccount/ContactUs";
import NotificationSettingContainer from "../../containers/Common/NotificationSettingContainer";
import NotificationAlertsContainer from "../../containers/Common/NotificationAlertsContainer";
import NotificationAccountUpdatesContainer from "../../containers/Common/NotificationAccountUpdatesContainer";

//Student
import StudentContainer from "../../containers/Student/Student";
import ViewStudentLoginInstruction from "../../containers/Educator/ViewStudentLoginInstruction";
import ViewLogininstruction from "../../containers/Educator/ViewLogininstruction";
import SchoolIdSentContainer from "../../containers/Authentication/SchoolIdSent";
import JoinRequestDeclineAccountLockUploadedId from "../Educator/Dashboard/AccountLock/JoinRequestDeclineAccountLockUploadedId";
import SignupFromInviteAdmin from "../../containers/Authentication/SignupFromInviteAdmin";
import UploadSchoolDocs from "../../containers/Educator/UploadSchoolDocs";
import ThanksYou from "../Educator/InviteAdmin/ThanksYou";
import DemoClassComponent from "../DemoClass/DemoClassComponent";
import Demoinsight from "../DemoClass/DemoClassInsight.";
import DownloadClassCode from "../../containers/Educator/pdf/DownloadClassCode";
import DemoinsightMoodjournal from "../DemoClass/Demomoodjournalinsight";
import DownloadStudentInstructions from "../../containers/Educator/pdf/DownloadStudentInstructions";
import DownloadStudentPasscodeList from "../../containers/Educator/pdf/DownloadStudentPasscodeList";
import DownloadClassReport from "../../containers/Educator/pdf/DownloadClassReport";
import DownloadStudentReport from "../../containers/Educator/pdf/DownloadStudentReport";
import Version from "../Version";

class Main extends React.Component {
  componentDidMount() {
    this.authenticationCheck();
  }

  // authenticationCheck = () => {
  //   const { history } = this.props;
  //   const token = localStorage.getItem("token");
  //   const noRedirect = localStorage.getItem("noRedirect");
  //   console.log(noRedirect,">>>>>>>>>>>>>>>>>>>>>>>");
  //   if (noRedirect) {
  //     localStorage.removeItem("noRedirect");
  //   } else if (!token) {
  //     history.replace("/login");
  //   }
  //   // else if (const_url !== "") {
  //   //   history.replace(const_url);
  //   // }
  //   else {
  //     // history.replace("/educator/home/")
  //   }
  // };
  authenticationCheck = () => {
    const { history } = this.props;
    const token = localStorage.getItem("token");
    // console.log("window.location", window.location.href);
    const const_url =
      localStorage.getItem("const_url") || window.location.pathname;
    // console.log("const_url", this.props);
    const noRedirect = localStorage.getItem("noRedirect");
    let split_url = [];
    if (const_url) {
      split_url = const_url.split("/");
      // console.log(split_url);
    }
    if (noRedirect) {
      localStorage.removeItem("noRedirect");
    } else if (token) {
      if (split_url.length > 2) {
        switch (split_url[2] || split_url[3]) {
          case "classCode":
            history.replace("/download/classCode/");
            break;
          case "studentCode":
            history.replace("/download/studentCode/");
            break;
          case "studentCodeList":
            history.replace("/download/studentCodeList/");
            break;
          case "classReport":
            history.replace("/download/classReport/");
            break;
          case "studentReport":
            history.replace("/download/studentReport/");
            break;
          case "view-login-instructions-mail":
            history.replace(
              `/educator/view-login-instructions-mail/${split_url[3]}/${split_url[4]}`
            );
            break;
          // case "activate":
          //   history.replace(
          //     `/${split_url[3]}`
          //   );
          //   break;
          default:
            history.replace("/educator/home/");
            break;
        }
      } else {
        history.replace("/educator/home/");
      }
    } else {
      if (split_url[2] == "activate") {
        history.replace(`/educator/activate/${split_url[3]}`);
      } else if (split_url[2] == "view-login-instructions-mail") {
        history.replace(
          `/educator/view-login-instructions-mail/${split_url[3]}/${split_url[4]}`
        );
      } else {
        history.replace("/login");
      }
    }
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/demo-class" component={DemoClassComponent} />
          <Route exact path="/demoinsight" component={Demoinsight} />
          <Route
            exact
            path="/demo-moodjournal"
            component={DemoinsightMoodjournal}
          />
          <Route
            exact
            path="/find-school/:email"
            component={FindSchoolContainer}
          />
          <Route exact path="/add-school" component={AddSchoolContainer} />
          <Route
            exact
            path="/join-school/:id/:email"
            component={JoinSchoolContainer}
          />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/signup" component={SignupContainer} />
          {/* <Route
            exact
            path="/activate/:uuid"
            component={ActivateAccountContainer}
          /> */}
          <Route
            exact
            path="/educator/activate/:uuid"
            component={Gobackfromlogin}
          />
          {/* <Route
            exact
            path="/activate/:uuid"
            component={FindSchoolContainer}
          /> */}
          <Route
            exact
            path="/school-id-sent/"
            component={SchoolIdSentContainer}
          />
          <Route
            exact
            path="/account-lock/"
            component={JoinRequestDeclineAccountLockUploadedId}
          />
          <Route
            exact
            path="/verify-invite/:uuid"
            component={SignupFromInviteContainer}
          />
          <Route
            exact
            path="/verify-educator-school/:uuid"
            component={SignupFromInviteContainer}
          />
          <Route
            exact
            path="/verifyadmin-invite/:uuid"
            component={SignupFromInviteAdmin}
          />
          <Route exact path="/upload-docs/" component={UploadSchoolDocs} />
          <Route exact path="/id-sent/" component={ThanksYou} />
          <Route
            exact
            path="/privacy-policy"
            component={PrivacyPolicyContainer}
          />
          <Route exact path="/verify-email" component={VerifyEmailContainer} />
          <Route
            exact
            path="/change-password"
            component={ChangePasswordContainer}
          />
          <Route
            exact
            path="/verify-link/:uuid"
            component={ResetPasswordContainer}
          />
          <Route
            exact
            path="/notification-settings"
            component={NotificationSettingContainer}
          />
          <Route
            exact
            path="/notification-alerts"
            component={NotificationAlertsContainer}
          />
          <Route
            exact
            path="/notification-account-updates"
            component={NotificationAccountUpdatesContainer}
          />
          <Route
            exact
            path="/reset-password-link"
            component={ResetPasswordLinkContainer}
          />
          <Route exact path="/educator" component={EducatorContainer} />
          <Route
            exact
            path="/educator/home"
            component={EducatorClassesContainer}
          />
          <Route
            exact
            path="/educator/view-login-instructions/"
            component={ViewStudentLoginInstruction}
          />
          <Route
            exact
            path="/educator/view-login-instructions-mail/:classid/:studentid"
            component={ViewLogininstruction}
          />
          <Route
            exact
            path="/educator/insight-dashboard"
            component={EducatorInsightDashboardContainer}
          />
          <Route
            exact
            path="/educator/account"
            component={EducatorAccountContainer}
          />
          <Route
            exact
            path="/educator/contact-us"
            component={ContactUsContainer}
          />
          <Route
            exact
            path="/educator/edit-profile"
            component={EditProfileContainer}
          />
          <Route
            exact
            path="/educator/addclass"
            component={AddClassContainer}
          />
          <Route
            exact
            path="/download/classCode/"
            component={DownloadClassCode}
          />
          <Route
            exact
            path="/download/studentCode/"
            component={DownloadStudentInstructions}
          />
          <Route
            exact
            path="/download/studentCodeList/"
            component={DownloadStudentPasscodeList}
          />
          <Route
            exact
            path="/download/classReport/"
            component={DownloadClassReport}
          />
          <Route
            exact
            path="/download/studentReport/"
            component={DownloadStudentReport}
          />

          <Route exact path="/student" component={StudentContainer} />
          <Route exact path="/version" component={Version} />
        </Switch>
      </div>
    );
  }
}

export default Main;
