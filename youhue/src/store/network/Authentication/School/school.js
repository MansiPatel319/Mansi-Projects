import axios from "../../../../axiosUrl";
import { setLoader } from "../../../actions/authActions";

export const findSchool = (param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v6/school-search/?search=${param.searchSchool}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      )
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

export const addSchool = (param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/add-school/`, param, {
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

export const getSchool = (param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/school-list/`, param, {
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

export const getSchoolDetails = (param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v6/school-details/${parseInt(param)}/`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      )
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

export const joinSchool = (param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/join-school/`, param, {
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
export const joinSchoolWithPut = (param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .put(`v6/join-school/`, param, {
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

export const uploadSchoolId = (param) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/upload-documents/`, param, {
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
