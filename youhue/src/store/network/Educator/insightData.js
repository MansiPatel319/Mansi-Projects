import axios from "../../../axiosUrl";
import {
  setLoader,
  setinsightmoodbyday,
  setInsightAdminData,
  setstudentWeblist,
  setaskstudentWeblist,
  setIndividualStudentData,
  setAllLogsData,
  setFlaggedLogsData,
  setPopularTopicsData,
  setstudentWeblistLinkData,
  setaskstudentWeblistLinkData
} from "../../actions/authActions";

export const getInsightAdminData = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    const url = (param.start_time && param.end_time) ?  `v5/insight-admin/?class_id=${param.class_id}&start_date=${param.start_date}&end_date=${param.end_date}&page=${param.page}&start_time=${param.start_time}&end_time=${param.end_time}` : `v5/insight-admin/?class_id=${param.class_id}&start_date=${param.start_date}&end_date=${param.end_date}&page=${param.page}`
    return axios
      .get(
        url,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setInsightAdminData(res.data.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
};
export const getinsightmoodbyday = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    const url = (param.start_time && param.end_time) ?  `v5/mood-by-day/?class_id=${param.class_id}&start_date=${param.start_date}&end_date=${param.end_date}&page=${param.page}&start_time=${param.start_time}&end_time=${param.end_time}` : `v5/mood-by-day/?class_id=${param.class_id}&start_date=${param.start_date}&end_date=${param.end_date}&page=${param.page}`
    return axios
      .get(
        url,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setinsightmoodbyday(res?.data?.data));
        return res?.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        return err;
      });
  };
};
export const getstudentWeblist = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v6/get-student-web-list/?class_id=${param.class_id}&page=${param.page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setstudentWeblist(res.data.data));
        dispatch(setstudentWeblistLinkData(res.data.links));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
};
export const getaskstudentWeblist = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v6/ask-student-web-list/?class_id=${param.class_id}&page=${param.page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setaskstudentWeblist(res.data.data));
        dispatch(setaskstudentWeblistLinkData(res.data.links));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
};
export const getIndividualStudentData = (param) => {
  const token = localStorage.getItem("token");
  var mood_filter_lst = "";
  var tag_filter_lst = "";
  var start_time = param.start_time
  var end_time =param.end_time
  if (param.moods.length === 0) {
    mood_filter_lst = "";
  }
  if (param.moods.length === 1) {
    mood_filter_lst = param.moods[0];
  }
  if (param.moods.length > 1) {
    mood_filter_lst = param.moods.join();
  }
  if (param.tags.length === 0) {
    tag_filter_lst = "";
  }
  if (param.tags.length === 1) {
    tag_filter_lst = param.tags[0];
  }
  if (param.tags.length > 1) {
    tag_filter_lst = param.tags.join();
  }
  if (start_time === undefined || false ){
    start_time=''
  }if (end_time === undefined || false ){
    end_time=''
  }
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v5/student-view/?class_id=${param.class_id}&start_date=${param.start_date}&end_date=${param.end_date}&student_id=${param.student_id}&page=${param.page}&moods=${mood_filter_lst}&tags=${tag_filter_lst}&is_flagged=${param.is_flag}&start_time=${start_time}&end_time=${end_time}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(setIndividualStudentData(res.data.data));
        dispatch(setLoader(false));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
};

export const getAllLogData = (param) => {
  const token = localStorage.getItem("token");
  var mood_filter_lst = "";
  var tag_filter_lst = "";
  var start_time = param.start_time
  var end_time = param.end_time
  if (param.start_time === undefined || false ){
    start_time=''
  }if (param.end_time === undefined || false ){
    end_time=''
  }
  if (param.moods.length === 0) {
    mood_filter_lst = "";
  }
  if (param.moods.length === 1) {
    mood_filter_lst = param.moods[0];
  }
  if (param.moods.length > 1) {
    mood_filter_lst = param.moods.join();
  }
  if (param.tags.length === 0) {
    tag_filter_lst = "";
  }
  if (param.tags.length === 1) {
    tag_filter_lst = param.tags[0];
  }
  if (param.tags.length > 1) {
    tag_filter_lst = param.tags.join();
  }
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v5/view-all-log/?class_id=${param.class_id}&start_date=${
          param.start_date
        }&end_date=${param.end_date}&page=${
          param.page ? param.page : 1
        }&moods=${mood_filter_lst}&tags=${tag_filter_lst}&is_flagged=${
          param.is_flag
        }&start_time=${start_time}&end_time=${end_time}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setAllLogsData(res.data.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
};

export const getFlaggedLogData = (param) => {
  const token = localStorage.getItem("token");
  var start_time = param.start_time
  var end_time = param.end_time
  if (param.start_time === undefined || false ){
    start_time=''
  }if (param.end_time === undefined || false ){
    end_time=''
  }
    return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v5/flagged-logs/?class_id=${param.class_id}&start_date=${
          param.start_date
        }&end_date=${param.end_date}&page=${param.page ? param.page : 1}&tags=${param.tags}&keywords=${param.keywords}&start_time=${start_time}&end_time=${end_time}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setFlaggedLogsData(res.data.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
};

export const getPopularTopicData = (param) => {
  const token = localStorage.getItem("token");
  var start_time = param.start_time
  var end_time = param.end_time
  if (param.start_time === undefined || false ){
    start_time=''
  }if (param.end_time === undefined || false ){
    end_time=''
  }
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v5/popular-topic/?class_id=${param.class_id}&start_date=${
          param.start_date
        }&end_date=${param.end_date}&page=${param.page ? param.page : 1}&tags=${param.tags}&keywords=${param.keywords}&start_time=${start_time}&end_time=${end_time}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setPopularTopicsData(res.data.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
};
export const statusResponseGetData = (statusId) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // dispatch(setLoader(true));
    return axios
      .get(`v6/status-response-view/${statusId}/`, {
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
        return err;
      });
  };
};
export const statusResponsePostData = (statusId, data) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/status-responses-view/`,data, {
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
        return err;
      });
  };
};

export const doAskHowAreYou = (data) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .post(`v6/ask-how-are-you/`, data,{
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
        return err;
      });
  };
}
export const deleteprofileimage = (data) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .delete(`v6/delete-eductor-profile_pic/${data}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoader(false));
        return res?.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
}

export const doGetMultipleClasses = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v5/insight-multiple-class-admin/?class_id=${param.class_id}&start_date=${param.start_date}&end_date=${param.end_date}&page=${param.page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setInsightAdminData(res.data.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
}


export const getAllLogDataMultiple = (param) => {
  const token = localStorage.getItem("token");
  var mood_filter_lst = "";
  var tag_filter_lst = "";
  if (param.moods.length === 0) {
    mood_filter_lst = "";
  }
  if (param.moods.length === 1) {
    mood_filter_lst = param.moods[0];
  }
  if (param.moods.length > 1) {
    mood_filter_lst = param.moods.join();
  }
  if (param.tags.length === 0) {
    tag_filter_lst = "";
  }
  if (param.tags.length === 1) {
    tag_filter_lst = param.tags[0];
  }
  if (param.tags.length > 1) {
    tag_filter_lst = param.tags.join();
  }
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v5/multiple-class-view-all-log/?class_id=${param.class_id}&start_date=${
          param.start_date
        }&end_date=${param.end_date}&page=${
          param.page ? param.page : 1
        }&moods=${mood_filter_lst}&tags=${tag_filter_lst}&is_flagged=${
          param.is_flag
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setAllLogsData(res.data.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
};

export const getFlaggedLogDataMultiple = (param) => {
  const token = localStorage.getItem("token");
    return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v5/multiple-class-flagged-logs/?class_id=${param.class_id}&start_date=${
          param.start_date
        }&end_date=${param.end_date}&page=${param.page ? param.page : 1}&tags=${param.tags}&keywords=${param.keywords}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setFlaggedLogsData(res?.data?.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
};

export const getPopularTopicDataMultiple = (param) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(setLoader(true));
    return axios
      .get(
        `v5/multiple-class-popular-topic/?class_id=${param.class_id}&start_date=${
          param.start_date
        }&end_date=${param.end_date}&page=${param.page ? param.page : 1}&tags=${param.tags}&keywords=${param.keywords}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(setLoader(false));
        dispatch(setPopularTopicsData(res.data.data));
        return res.data;
      })
      .catch((err) => {
        dispatch(setLoader(false));
        console.log(err);
        return err;
      });
  };
};