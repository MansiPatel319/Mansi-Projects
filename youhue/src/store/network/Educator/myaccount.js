import axios from "../../../axiosUrl";
import { setLoader, setRemoveDemo } from "../../actions/authActions";

export const getSchoolData = () => {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(`v6/school-profile/`, {
        headers: { 
          "Content-Type": "application/json",
          'Authorization': token
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


export const changePassword = (param) => {
  const token = localStorage.getItem("token");
  const uuid = localStorage.getItem("educatorId");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .put(`v5/change-current-password/${uuid}/`, param, {
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

export const contactUs = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/contact-us/`, param, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
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

export const editProfile = (param) => {
  const token = localStorage.getItem("token");
  const pk = localStorage.getItem("educatorId");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .put(`v6/update-eductor-profile/${pk}/`, param, {
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

export const addSchoolAdmin = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/add-educator-as-admin/`, param, {
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

export const editSchoolDetails = (param, schoolId) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .put(`v6/school-update/${schoolId}/`, param, {
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
export const handleRemoveDemoClass = () => {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/is-demo-done/`, null,{
        headers: { 
          "Content-Type": "application/json",
          'Authorization': token
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setRemoveDemo())
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err.response.data;
      });
  };
};
