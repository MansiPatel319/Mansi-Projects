const getBaseUrl = () => {
  return process.env.REACT_APP_REST_API_URL; // for server
};

const getAuthUrl = () => {
  return process.env.REACT_APP_AUTH_API_URL; // for server
};

const AUTH_URL = `${getAuthUrl()}`;
const BASE_URL = `${getBaseUrl()}`


export const ApiUrl = {
  BASE_URL,
  AUTH_URL,
  authModule: {
    userLogin: `${AUTH_URL}/login/`,
    userForgotpassword: `${BASE_URL}password/reset/`,
    userResetpassword: `${BASE_URL}password/forgot/reset/`,
    userProjectList: `${BASE_URL}projects/`,
    userList: `${BASE_URL}users/`,
    userListAuth: `${AUTH_URL}users/`,
    userOrganizeList: `${BASE_URL}organizations/`,
    authModule:`${AUTH_URL}users/me/`,
    regionsList:`${AUTH_URL}projects/regions/`,
    authUserApi:`${AUTH_URL}users/me/`,
  },
  dashboardModule: {
    accountManager: `${BASE_URL}users/account-managers/`,
    organization: `${BASE_URL}organizations/`,
  },
  project: {
    getProjectDetailsCall: `${BASE_URL}projects`,
    getUserList: `${BASE_URL}projects/members/`,
    getOrganizationRoleList: `${BASE_URL}projects/roles/`,
    updateOrgRole: `${BASE_URL}projects/role/update/`,
    removeUserFromOrg: `${BASE_URL}organizations/user/remove/`,
    getContactList: `${BASE_URL}projects/contacts/`,
    getLanguages: `${BASE_URL}preferences/language/`,
    getDateFormates: `${BASE_URL}preferences/date/format/`,
    getTimeFormates: `${BASE_URL}preferences/time/format/`,
    getCalenderDays: `${BASE_URL}preferences/calender/days/`,
    getAccountManagerList: `${BASE_URL}users/account-managers/`,
    getOrganization: `${BASE_URL}organizations/`,
    getOwner: `${BASE_URL}users/`,
    editProjectDetail: `${BASE_URL}projects`,
    getProjectSetting: `${BASE_URL}projects/settings/`,
    getBookingDetailData: `${BASE_URL}projects/booking-fields/`,
    updateProjectStatus: `${BASE_URL}projects/status/`,
    getTimes: `${BASE_URL}legacy/time/`,
    getSiteList:`${BASE_URL}sites/`,
    saveCoreFieldData: `${BASE_URL}projects/booking-fields/`,
    saveFlexibleFieldData: `${BASE_URL}projects/booking-fields/`,
    addFlexibleData: `${BASE_URL}projects/booking-fields/`,
    getVehicleTypes:`${BASE_URL}booking-fields/vehicle-type/`,
 
  },
Organization:{
  getOrganizationDetailsCall: `${BASE_URL}organizations`,
  addOrgDetail: `${BASE_URL}organizations`,
  getOrganizationusersCall:`${BASE_URL}organizations/users`,
  getOrganizationActivityCall:`${BASE_URL}auditlog/organization-list`,
},

  users: {
    organizationRoles: `${BASE_URL}organizations/roles/list`,
    getUserActivityCall:`${BASE_URL}auditlog/user-list`,
  }
};
