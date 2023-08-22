import * as types from '../actions/actionTypes';
const initialState = {
    previousRoute: "",
};
const PreviousRoutes = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PREVIOUS_PATH:
            return {
                ...state,
                previousRoute: action.value,
            };
        default:
            return state;
    }
};

export default PreviousRoutes;