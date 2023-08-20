import axios from "../../../axiosUrl";
import {
  setLoader,
  setEducatorData,
  setIsNotificationBanner,
  setSwitchSchoolData,
  switchSchoolTimeStamp,
} from "../../actions/authActions";

export const getAccountDetails = () => {
  const token = localStorage.getItem("token");
  const uuid = localStorage.getItem("educatorId");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(`v5/account-details/${uuid}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        // console.log(
        //   "res.data.data",
        //   res.data.data,
        //   localStorage.getItem("isShowNotificationBanner")
        // );
        if (
          res.data.data.role === "Educator" &&
          !res.data.data.verifiy_educator &&
          localStorage.getItem("isShowNotificationBanner") === null
        ) {
          // console.log("ok1");
          localStorage.setItem("isShowNotificationBanner", true);
          dispatch(setIsNotificationBanner(true));
        } else if (
          res.data.data.role === "Educator" &&
          !res.data.data.verifiy_educator &&
          localStorage.getItem("isShowNotificationBanner") === "true"
        ) {
          dispatch(setIsNotificationBanner(true));
        } else {
          dispatch(setIsNotificationBanner(false));
        }
        dispatch(setEducatorData(res.data.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
};

export const updateAccountDetails = (param) => {
  const token = localStorage.getItem("token");
  const uuid = localStorage.getItem("educatorId");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .put(`v5/account-update/${uuid}/`, param, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const inviteEducator = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v5/invite-educator/`, param, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const inviteAdmin = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/invite-admin/`, param, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const deleteEducator = (uuid) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .delete(`v5/educator-delete/${uuid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const removeEducatorFromClass = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v5/remove-educator-class/`, param, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const removeEducatorFromSchool = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // dispatch(setLoader(true));
    return axios
      .post(`v6/remove-educator-school/`, param, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        // dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        // dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const becomeSchoolAdmin = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/become-school-admin/`, param, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const verifiedEducatorList = () => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // dispatch(setLoader(true));
    return axios
      .get(`v6/school-verified-educator-list/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        // dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        // dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const shareLoginInstructions = (params) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/share-login-instructions/`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};
export const shareLoginInstructionsgetapi = (classid, studentid) => {
  // const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(`v6/share-login-instructions/${classid}/${studentid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};
export const joinSchoolRequest = () => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(`v6/join-school-request`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const verifyJoinRequest = (params) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/verify-educator-request/`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const declineJoinRequest = (params) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/decline-educator-request/`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};
export const revmoveEducatorFromSchool = (params) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // dispatch(setLoader(true));
    return axios
      .post(`v6/remove-educator-school/`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        // dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        // dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};
export const replaceEductorFromSchool = (params) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/replace-educator/`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};
export const InviteEducatorSchool = (params) => {
  
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/invite-educator-school/`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};
export const ClassSchoolVerifiedEducatorList = (param) => {
  
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(`v6/class-school-verified-educator-list/${param}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const SwitchSchool = (param) => {
  
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return axios
      .get(`v6/district-school-list/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setSwitchSchoolData(res.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};

export const saveSchool = (param) => {
  let school = {school_id:param}
  
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/district-school-change/`, school,{
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(switchSchoolTimeStamp(Date.now()));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};


export const resendInviteEmail = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v5/invite-educator-resendemail/`, param,{
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};


export const dosetSwitchSchoolTimeStamp = (param) => {  
  return (dispatch) => {
        dispatch(switchSchoolTimeStamp(Date.now()));
  };
};

export const notificationClassListing = () => {
  const token = localStorage.getItem('token');
  return (dispatch) => {
      dispatch(setLoader(true));
      return axios.get(`v6/notification-class-listing/`,
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
              }
          }).then(res => {
              dispatch(setLoader(false));
              return res.data;
          }).catch(err => {
              dispatch(setLoader(false));
              console.log(err);
              return err;
          });
  }
}

export const updateClassNotificationFlag = (params) => {
  const token = localStorage.getItem('token');
  return (dispatch) => {
      dispatch(setLoader(true));
      return axios.post(`v6/notification-class-flag/`, params,
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
              }
          }).then(res => {
              dispatch(setLoader(false));
              return res.data;
          }).catch(err => {
              dispatch(setLoader(false));
              console.log(err);
              return err;
          });
  }
}

export const updateAlertNotificationFlag = (params) => {
  const token = localStorage.getItem('token');
  return (dispatch) => {
      dispatch(setLoader(true));
      return axios.post(`v6/notification-flag/`, params,
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
              }
          }).then(res => {
              dispatch(setLoader(false));
              return res.data;
          }).catch(err => {
              dispatch(setLoader(false));
              console.log(err);
              return err;
          });
  }
}

export const updateAdminNotificationFlag = (params) => {
  const token = localStorage.getItem('token');
  return (dispatch) => {
      dispatch(setLoader(true));
      return axios.post(`v6/notification-admin-flag/`, params,
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
              }
          }).then(res => {
              dispatch(setLoader(false));
              return res.data;
          }).catch(err => {
              dispatch(setLoader(false));
              console.log(err);
              return err;
          });
  }
}