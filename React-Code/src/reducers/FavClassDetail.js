import * as types from '../actions/actionTypes';
const initialState = {
    favClassId: "",
};
const FavClassDetail = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_FAV_CLASS:
            return {
                ...state,
                favClassId: action.value,
            };
        default:
            return state;
    }
};

export default FavClassDetail;