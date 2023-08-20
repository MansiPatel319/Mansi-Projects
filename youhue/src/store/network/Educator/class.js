import axios from '../../../axiosUrl';
import {
    setLoader, setClassData, setClassDetailData,
    setClassList, setClassListAdmin,
    setNotificationListing
} from "../../actions/authActions";

export const getAllClass = () => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.get(`v5/class-list/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then(res => {
                dispatch(setLoader(false));
                dispatch(setClassData(res.data.data))
                res.data.data.map(data => {
                    data['text'] = data['name']
                    return data
                })
                dispatch(setClassListAdmin(res.data.data))
                return res.data;
            }).catch(err => {
                dispatch(setLoader(false));
                console.log(err);
                return err;
            });
    }
}

export const getAdminClasses = () => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.get(`v5/school-class-list/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then(res => {
                dispatch(setLoader(false));
                dispatch(setClassData(res.data.data))
                res.data.data.map(data => {
                    data['text'] = data['name']
                    return data
                })
                dispatch(setClassList(res.data.data))
                return res.data;
            }).catch(err => {
                dispatch(setLoader(false));
                console.log(err);
                return err;
            });
    }
}

export const getClassDetails = (uuid) => {
    const token = localStorage.getItem('token');
    if(uuid != undefined){
        return dispatch => {
            dispatch(setLoader(true));
            return axios.get(`v5/class-details/${uuid}/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).then(res => {
                    dispatch(setLoader(false));
                    dispatch(setClassDetailData(res.data.data))
                    return res.data;
                }).catch(err => {
                    dispatch(setLoader(false));
                    console.log(err);
                    return err;
                });
        }
    }
}

export const addStudents = (param) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v5/add-student/`, param,
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
                return err.response.data;
            });
    }
}

export const addStudentsUsingCsv = (param) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v5/upload-student-csv-file/`, param,
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
                return err.response.data;
            });
    }
}

export const downloadStudentReport = (param) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v6/download-student-report/` + param,
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
                return err.response.data;
            });
    }
}

export const downloadClassReport = (param) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v6/download-class-report/` , param,
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
                return err.response.data;
            });
    }
}

export const getStudentList = (param) => {
    console.log(param, "param");
    // let lst = []
    // lst.push(param)
    // console.log(lst,"lst");
    // let formData = new FormData()
    // formData.append("class_id",lst)
    // let data = {
    //     "class_id":param
    // }
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v6/get-student-class/` , param,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then(res => {
                dispatch(setLoader(false));
                console.log(res.data,"res.data.getstudetnlist");
                return res.data;
            }).catch(err => {
                dispatch(setLoader(false));
                console.log(err);
                return err.response.data;
            });
    }
}

export const generatePasscode = (uuid) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.get(`v5/passcode-generate/${uuid}/`,
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
                return err.response.data;
            });
    }
}

export const updatePasscode = (uuid, param) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.put(`v5/passcode-update/${uuid}/`, param,
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
                return err.response.data;
            });
    }
}

export const updateStudentName = (uuid, param) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.put(`v5/student-update/${uuid}/`, param,
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
                return err.response.data;
            });
    }
}

export const removeStudentFromClass = (param) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v5/remove-student-class/`, param,
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
                return err.response.data;
            });
    }
}

export const deleteStudent = (uuid) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.delete(`v5/student-delete/${uuid}`,
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
                return err.response.data;
            });
    }
}

export const updateClassName = (uuid, param) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.put(`v5/class-update/${uuid}/`, param,
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
                return err.response.data;
            });
    }
}

export const printPasscodes = (param) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v5/export-pdf/`, param,
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
                return err.response.data;
            });
    }
}


export const addClass = (param) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v5/class-add/`, param,
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
                return err.response.data;
            });
    }
}
export const getAllNotification = () => {
    const token = localStorage.getItem('token');

    return dispatch => {
        // dispatch(setLoader(true));
        return axios.get(`v6/notification-listing/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then(res => {
                // dispatch(setLoader(false));
                dispatch(setNotificationListing(res.data.data))
                return res.data;
            }).catch(err => {
                // dispatch(setLoader(false));
                console.log(err);
                return err;
            });
    }
}
export const handleReadNotification = (notificationId) => {
    const token = localStorage.getItem('token');

    return dispatch => {
        // dispatch(setLoader(true));
        return axios.post(`v6/notification-read/${notificationId}/`, null,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then(res => {
                // dispatch(setLoader(false));
                return res.data;
            }).catch(err => {
                // dispatch(setLoader(false));
                console.log(err);
                return err.response.data;
            });
    }
}
export const handleMarkAllReadNotification = () => {
    const token = localStorage.getItem('token');

    return dispatch => {
        dispatch(setLoader(true));
        return axios.get(`v6/notification-all-read/`,
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
                return err.response.data;
            });
    }
}

export const getClassCodePdf = (uuid) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(setLoader(true));
        return axios.post(`v6/download-class-code/${uuid}/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then(res => {
                dispatch(setLoader(false));
                return res;
            }).catch(err => {
                dispatch(setLoader(false));
                console.log(err);
                return err.response.data;
            });
    }
}