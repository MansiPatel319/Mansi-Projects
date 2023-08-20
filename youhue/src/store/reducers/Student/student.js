import * as actionType from '../../actions/actionTypes';

const initialState = {
  studentMoodDetailCount: 0,
  studentClassData: [],
  studentJournalData: [],
  moodListData: [],
  botResponseData: {},
  moodDescriptionData: {},
  isEditEnable: false,
  studentSelectedClass: {},
  studentData: {},
  latestMoodData: {}
};

const setStudentMoodDetailCount = (state, action) => ({
  ...state,
  studentMoodDetailCount: action.studentMoodDetailCount
});

const setStudentClassData = (state, action) => ({
  ...state,
  studentClassData: action.studentClassData
})

const setStudentJournalData = (state, action) => ({
  ...state,
  studentJournalData: action.studentJournalData
})
const setStudentJournalResponseData = (state, action) => ({
  ...state,
  studentJournalResponseData: action.studentJournalResponseData
})

const setMoodListData = (state, action) => ({
  ...state,
  moodListData: action.moodListData
})

const setBotResponseData = (state, action) => ({
  ...state,
  botResponseData: action.botResponseData
})

const setMoodDescriptionData = (state, action) => ({
  ...state,
  moodDescriptionData: action.moodDescriptionData
})

const setEditEnable = (state, action) => ({
  ...state,
  isEditEnable: action.isEditEnable,
});

const setStudentSelectedClass = (state, action) => ({
  ...state,
  studentSelectedClass: action.studentSelectedClass,
});

const setStudentData = (state, action) => ({
  ...state,
  studentData: action.studentData,
});

const setLatestMoodData = (state, action) => ({
  ...state,
  latestMoodData: action.latestMoodData
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_STUDENT_MOOD_DETAIL_COUNT:
      return setStudentMoodDetailCount(state, action);
    case actionType.SET_STUDENT_CLASS_DATA:
      return setStudentClassData(state, action);
    case actionType.SET_STUDENT_JOURNAL_DATA:
      return setStudentJournalData(state, action);
      case actionType.SET_STUDENT_JOURNAL_RESPONSE_DATA:
        return setStudentJournalResponseData(state, action);
    case actionType.SET_MOOD_LIST_DATA:
      return setMoodListData(state, action);
    case actionType.SET_BOT_RESPONSE_DATA:
      return setBotResponseData(state, action);
    case actionType.SET_MOOD_DESCRIPTION_DATA:
      return setMoodDescriptionData(state, action);
    case actionType.SET_EDIT_MOOD_ENABLE_DATA:
      return setEditEnable(state, action)
    case actionType.SET_STUDENT_SELECTED_CLASS:
      return setStudentSelectedClass(state,action)
    case actionType.SET_STUDENT_DATA:
      return setStudentData(state, action);
    case actionType.SET_LATEST_MOOD_DATA:
      return setLatestMoodData(state, action);
    default:
      return state;
  }
};

export default reducer;
