import * as actionType from '../../actions/actionTypes';

const initialState = {
    loading: false,
    resetPasswordData: {},
    invitedUserData: {},
    selectedClassToRemove: '',
    studentweblistlink:{},
    askstudentweblistlink:{}
};

const setLoader = (state, action) => ({
    ...state,
    loading: action.loading,
});

const setResetPasswordData = (state, action) => ({
    ...state,
    resetPasswordData: action.resetPasswordData,
});

const setInvitedUserData = (state, action) => ({
    ...state,
    invitedUserData: action.invitedUserData,
});
const setSelctedClassId = (state, action) => ({
    ...state,
    selectedClassId: action.selectedClassId,
});
const setSelectedMoodData = (state, action) => ({
    ...state,
    moodByData: action.moodbydaydata,
});
const setSelectedstudentList = (state, action) => ({
    ...state,
    studentweblist: action.studentweblistdata,
});
const setSelectedstudentLinkList = (state, action) => ({
    ...state,
    studentweblistlink: action.studentweblistlinkdata,
});
const setAskSelectedstudentLinkList = (state, action) => ({
    ...state,
    askstudentweblistlink: action.askstudentweblistlinkdata,
});
const setSelectedaskstudentList = (state, action) => ({
    ...state,
    studentaskweblist: action.studentaskweblistdata,
});
const setRemoveSelectedClass = (state, action) => ({
    ...state,
    selectedClassToRemove: action.selectedClassToRemove,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_LOADER:
        return setLoader(state, action);
    case actionType.SET_RESET_PASSWORD_DATA:
        return setResetPasswordData(state, action);
    case actionType.SET_INVITED_USER_DATA:
        return setInvitedUserData(state, action);
    case actionType.SELECTED_CLASS_ID:
        return setSelctedClassId(state, action);
    case actionType.SET_MOODBYDAY_DATA:
        return setSelectedMoodData(state, action);
    case actionType.SET_STUDENT_ALL_DATA:
        return setSelectedstudentList(state, action);
    case actionType.SET_STUDENT_WEBLIST_LINK_DATA:
        return setSelectedstudentLinkList(state, action);
    case actionType.SET_ASK_STUDENT_ALL_DATA:
            return setSelectedaskstudentList(state, action);
    case actionType.SET_ASKSTUDENT_WEBLIST_LINK_DATA:
        return setAskSelectedstudentLinkList(state, action);
    case actionType.SET_REMOVE_SELECTED_NAME:
            return setRemoveSelectedClass(state, action)   
    default:
        return state;
  }
};

export default reducer;
