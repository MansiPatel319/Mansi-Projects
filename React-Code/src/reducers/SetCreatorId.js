import * as types from '../actions/actionTypes';
const initialState = {
    setCreatorId: "",
};
const SetCreatorId = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CREATOR_ID:
            return {
                ...state,
                setCreatorId: action.data,
            };
        default:
            return state;
    }
};

export default SetCreatorId;
