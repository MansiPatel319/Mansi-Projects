import * as types from '../actions/actionTypes';
const initialState = {
  currentStep: 1,
  schedulStreamStem1: {
    id: null,
  },
  schedulStreamStem2: {
    id: null,
  },
  schedulStreamStem3: {
    id: null,
  },
  schedulStreamStem4: {
    id: null,
  },
};
const CreatorScheduleStream = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SCHEDULE_STREAM_STEP_1:
      return {
        ...state,
        schedulStreamStem1: action.data,
      };
    case types.SET_SCHEDULE_STREAM_STEP_2:
      return {
        ...state,
        schedulStreamStem2: action.data,
      };
    case types.SET_SCHEDULE_STREAM_STEP_3:
      return {
        ...state,
        schedulStreamStem3: action.data,
      };
    case types.SET_SCHEDULE_STREAM_STEP_4:
      return {
        ...state,
        schedulStreamStem4: action.data,
      };
    case types.SET_SCHEDULE_STREAM_STEPS:
      return {
        ...state,
        currentStep: action.value,
      };
    default:
      return state;
  }
};

export default CreatorScheduleStream;
