const getBaseUrl = () => {
  return process.env.REACT_APP_BASE_URL
};

const AUTH_URL = `${getBaseUrl() }/api/auth`;
const BASE_URL = `${getBaseUrl() }/api/v1`

export const ApiUrl = {
  authModule: {
    // userLogin: `${BASE_URL}/users/login/`,

    userLogin: `${AUTH_URL}/jwt/token/`,
    userForgotpassword: `${BASE_URL}/users/password/reset/`,
    userResetpassword: `${BASE_URL}/users/password/forgot/reset/`,
    projectRoles: `${BASE_URL}/projects/roles/`,
    userInvite: `${BASE_URL}/users/invite/`,
    userProjectList: `${BASE_URL}/projects/`,
    companylist:`${BASE_URL}/users/organization/suggestion/`,
    userSignup:`${BASE_URL}/users/signup/`,
    organizationdata:`${BASE_URL}/users/activate/`,
    authUserApi:`${AUTH_URL}/users/me/`
  },
  profileModule: {
    getProjectDetailsCall:`${BASE_URL}/projects/`,
    getAccountUserDetails:`${BASE_URL}/users/me/`,
    getAccountUserPreferenceDetails:`${BASE_URL}/users/mypreference/`,
    getLanguages:`${BASE_URL}/preferences/language/`,
    getDateFormates:`${BASE_URL}/preferences/date/format/`,
    getTimeFormates:`${BASE_URL}/preferences/time/format/`,
    getCalenderDays:`${BASE_URL}/preferences/calender/days/`,
    addUserDetail:`${BASE_URL}/users/me/`,
    userUpdatepassword:`${BASE_URL}/users/password/change/`,
    getOrganizationDetails:`${BASE_URL}/organizations/me/`,
    getUserList: `${BASE_URL}/organizations/users/`,
    getOrganizationRoleList: `${BASE_URL}/organizations/roles/list/`,
    updateOrgRole: `${BASE_URL}/organizations/role/update/`,
    removeUserFromOrg: `${BASE_URL}/organizations/user/remove/`,
    updateOrganizationDetails: `${BASE_URL}/organizations/`,
    getBookingDetailData: `${BASE_URL}/projects/booking-fields/`,
  },
  siteManagement: {
    getSiteList:`${BASE_URL}/sites/`,
    getListProject:`${BASE_URL}/projects/`,    
    getListAccesspoint:`${BASE_URL}/projects/access-point/`,    
    getSiteDetail:`${BASE_URL}/projects/details/`,   
    getContactList:`${BASE_URL}/projects/contacts/`,
    getResourceList: `${BASE_URL}/projects/resource/`,
    getTimes: `${BASE_URL}/legacy/time/`,
    getSite: `${BASE_URL}/sites/`,
    getSiteAvailablity: `${BASE_URL}/projects/sites/availability/`,

  },
  Availability:{
    getResourceList:`${BASE_URL}/projects/resource/`,
    getAvailablity:`${BASE_URL}/availability/`,
    getTimes: `${BASE_URL}/legacy/time/`,
    addSiteBreak: `${BASE_URL}/projects/sites/`,
  },
  UserManagement:{
    getUserList:`${BASE_URL}/users/`,
    getUserdetailbyid:`${BASE_URL}/users/`,
    postUserdetail:`${BASE_URL}/users/`,
    organization: `${BASE_URL}/organizations/`,
    updateProjectRole: `${BASE_URL}/projects/role/update/`,
    removeUserFromProject: `${BASE_URL}/projects/user/remove/`,
   
  },
  booking: {
    getVehicleTypes:`${BASE_URL}/projects/vehicle-type/`,
    reserveSlots:`${BASE_URL}/bookings/slots/reserve/`,
    createBookingcall:`${BASE_URL}/bookings/`,
    slots:`${BASE_URL}/slots/`,
    getProjectSetting: `${BASE_URL}/projects/settings/`,
    
  }
};
export const getUrl=(url1:string, url2:string,site:any)=>{
  return url1+site+url2
}