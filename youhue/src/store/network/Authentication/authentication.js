import axios from "../../../axiosUrl";
import {
  setLoader,
  setResetPasswordData,
  setInvitedUserData,
} from "../../actions/authActions";

export const signup = (param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/create-account/`, param, {
        headers: { "Content-Type": "application/json" },
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

export const signupFromInvite = (uuid, param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .put(`v5/set-password-invited-educator/${uuid}/`, param, {
        headers: { "Content-Type": "application/json" },
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

export const verifyInvitationLink = (uuid) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(`v5/verify-invited-educator-link/${uuid}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setInvitedUserData(res.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        dispatch(setInvitedUserData(err.response.data));
        console.log(err);
        return err.response.data;
      });
  };
};

export const login = (param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v5/login/`, param, {
        headers: { "Content-Type": "application/json" },
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

export const sendResendemailLink = (param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/resend-mail/`, param, {
        headers: {
          "Content-Type": "application/json",
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
export const sendResetPasswordLink = (param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v5/reset-password/`, param, {
        headers: {
          "Content-Type": "application/json",
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
export const verifyResetPasswordLink = (uuid) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v5/verify-link/${uuid}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setResetPasswordData(res.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        dispatch(setResetPasswordData(err.response.data));
        console.log(err.response.data);
        return err.response.data;
      });
  };
};

export const resetPassword = (uuid, param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .put(`v5/set-password/${uuid}/`, param, {
        headers: {
          "Content-Type": "application/json",
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

export const activateAccount = (uuid) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(`v6/activate/${uuid}`, {
        headers: {
          "Content-Type": "application/json",
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

export const signupFromAdminInvite = (uuid, sid, param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .put(`v6/set-password-invited-admin/${sid}/${uuid}/`, param, {
        headers: { "Content-Type": "application/json" },
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

export const verifyAdminInvitationLink = (uuid) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(`v6/verify-invited-admin-link/${uuid}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setInvitedUserData(res.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        dispatch(setInvitedUserData(err.response.data));
        console.log(err);
        return err.response.data;
      });
  };
};