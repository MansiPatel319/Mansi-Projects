export {
  signup,
  login,
  sendResetPasswordLink,
  sendResendemailLink,
  verifyResetPasswordLink,
  resetPassword,
  signupFromInvite,
  verifyInvitationLink,
  activateAccount,
  verifyAdminInvitationLink,
  signupFromAdminInvite,
} from "../network/Authentication/authentication";

export {
  findSchool,
  addSchool,
  getSchool,
  joinSchool,
  joinSchoolWithPut,
  uploadSchoolId,
  getSchoolDetails,
} from "../network/Authentication/School/school";

export {
  getAccountDetails,
  updateAccountDetails,
  inviteEducator,
  deleteEducator,
  removeEducatorFromClass,
  removeEducatorFromSchool,
  becomeSchoolAdmin,
  verifiedEducatorList,
  shareLoginInstructions,
  shareLoginInstructionsgetapi,
  joinSchoolRequest,
  verifyJoinRequest,
  declineJoinRequest,
  inviteAdmin,
  revmoveEducatorFromSchool, // handleRemoveDemoClass
  replaceEductorFromSchool,
  InviteEducatorSchool,
  ClassSchoolVerifiedEducatorList,
  SwitchSchool,
  saveSchool,
  dosetSwitchSchoolTimeStamp,
  resendInviteEmail,
  notificationClassListing,
  updateClassNotificationFlag,
  updateAlertNotificationFlag,
  updateAdminNotificationFlag
} from "../network/Educator/educator";

export {
  getSchoolData,
  changePassword,
  editProfile,
  contactUs,
  editSchoolDetails,
  addSchoolAdmin,
  handleRemoveDemoClass,
} from "../network/Educator/myaccount";

export {
  getAllClass,
  getAdminClasses,
  getClassDetails,
  getClassCodePdf,
  addStudents,
  updateStudentName,
  generatePasscode,
  updatePasscode,
  removeStudentFromClass,
  deleteStudent,
  updateClassName,
  printPasscodes,
  addStudentsUsingCsv,
  addClass,
  downloadStudentReport,
  downloadClassReport,
  getStudentList,
  getAllNotification,
  handleReadNotification,
  handleMarkAllReadNotification,

} from "../network/Educator/class";

export {
  getInsightAdminData,
  getinsightmoodbyday,
  getstudentWeblist,
  getaskstudentWeblist,
  getIndividualStudentData,
  getAllLogData,
  getFlaggedLogData,
  getPopularTopicData,
  statusResponseGetData,
  statusResponsePostData,
  doAskHowAreYou,
  deleteprofileimage,
  doGetMultipleClasses,
  getAllLogDataMultiple,
  getFlaggedLogDataMultiple,
  getPopularTopicDataMultiple,
} from "../network/Educator/insightData";

export {
  checkClassCode,
  checkPassCode,
  viewJournal,
  viewResponseJournal,
  ReadResponse,
  getMoodList,
  getBotResponse,
  addEmotion,
  editEmotion,
  latestEmotion,
} from "../network/Student/student";

export {
  selectedClassId
} from "./authActions"
