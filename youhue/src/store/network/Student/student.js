import axios from '../../../axiosUrl';
import { setLoader,
    setStudentClassData, setStudentJournalData,setStudentJournalResponseData,
    setMoodListData, setBotResponseData,
    setMoodDescriptionData, setEditEnable,
    setStudentData, setLatestMoodData
} from "../../actions/authActions";

export const checkClassCode = (param) => {
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v5/check-classcode/`, param, 
            {headers:  {'Content-Type': 'application/json'}}).then(res => {
                dispatch(setLoader(false));
                dispatch(setStudentClassData(res.data.data));
                return res.data;
        }).catch(err => {
            dispatch(setLoader(false));
            console.log(err);
            return err.response.data;
        });
    }
}

export const checkPassCode = (param) => {
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v5/check-passcode/`,param, {headers: {'Content-Type': 'application/json'}}).then(res => {
            dispatch(setLoader(false));
            dispatch(setStudentData(res.data.data));
            localStorage.setItem("studentToken", res.data.data.token)
            return res.data;
        }).catch(err => {
            dispatch(setLoader(false));
            console.log(err);
            return err.response.data;
        });
    }
}

export const viewJournal = () => {
    const token = localStorage.getItem('studentToken')
    return dispatch => {
        dispatch(setLoader(true));
        return axios.get(`v5/journal/`, 
            {headers: 
                {'Content-Type': 'application/json',
                'Authorization': token}
            }).then(res => {
                dispatch(setLoader(false));
                dispatch(setStudentJournalData(res.data.data))
                return res.data;
        }).catch(err => {
            dispatch(setLoader(false));
            console.log(err);
            return err.response.data;
        });
    }
}
export const viewResponseJournal = (params) => {
            
    const token = localStorage.getItem('studentToken')
    return dispatch => {
        dispatch(setLoader(true));
        return axios.get(`v6/status-response-view/${params}/`, 
            {headers: 
                {'Content-Type': 'application/json',
                'Authorization': token}
            }).then(res => {
                dispatch(setLoader(false));
                dispatch(setStudentJournalResponseData(res.data.data))
                return res.data;
        }).catch(err => {
            dispatch(setLoader(false));
            console.log(err);
            return err.response.data;
        });
    }
}
export const ReadResponse = (params) => {
 
    const token = localStorage.getItem('studentToken')
    let formData = new FormData();
    formData.append('std_id', params)
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v6/all-journals-read/`,formData, 
            {headers: 
                {'Content-Type': 'application/json',
                'Authorization': token}
            }).then(res => {
                dispatch(setLoader(false));
                return res.data;
        }).catch(err => {
            dispatch(setLoader(false));
            console.log(err);
            return err.response.data;
        });
    }
}
export const getMoodList = () => {
    return dispatch => {
        dispatch(setLoader(true));
        return axios.get(`v5/mood-list/`, {headers: {'Content-Type': 'application/json',}}).then(res => {
            dispatch(setLoader(false));
            dispatch(setMoodListData(res.data.data))
            return res.data;
        }).catch(err => {
            dispatch(setLoader(false));
            console.log(err);
            return err.response.data;
        });
    }
}

export const getBotResponse = (uuid) => {
    const token = localStorage.getItem('studentToken');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.get(`v5/bot-response/${uuid}`, 
            {headers:  
                {'Content-Type': 'application/json',
                'Authorization': token}
        }).then(res => {
            dispatch(setLoader(false));
            dispatch(setBotResponseData(res.data.data))
            return res.data;
        }).catch(err => {
            dispatch(setLoader(false));
            console.log(err);
            return err;
        });
    }
}

export const addEmotion = (param) => {
    const token = localStorage.getItem('studentToken');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v5/add-emotion/`, param,
            {headers:  
                {'Content-Type': 'application/json',
                'Authorization': token}
        }).then(res => {
            dispatch(setLoader(false));
            dispatch(setEditEnable(true));
            dispatch(setMoodDescriptionData(res.data.data));
            return res.data;
        }).catch(err => {
            dispatch(setLoader(false));
            console.log(err);
            return err.response.data;
        });
    }
}

export const editEmotion = (uuid, param) => {
    const token = localStorage.getItem('studentToken');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v5/edit-emotion/${uuid}`, param,
            {headers:  
                {'Content-Type': 'application/json',
                'Authorization': token}
        }).then(res => {
            dispatch(setLoader(false));
            dispatch(setEditEnable(false));
            dispatch(setMoodDescriptionData(res.data.data));
            return res.data;
        }).catch(err => {
            dispatch(setLoader(false));
            console.log(err);
            return err.response.data;
        });
    }
}

export const latestEmotion = () => {
    const token = localStorage.getItem('studentToken');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.get(`v5/latest-mood-list`,
            {headers:  
                {'Content-Type': 'application/json',
                'Authorization': token}
        }).then(res => {
            dispatch(setLoader(false));
            dispatch(setLatestMoodData(res.data.data));
            return res.data;
        }).catch(err => {
            dispatch(setLoader(false));
            console.log(err);
            return err.response.data;
        });
    }
}