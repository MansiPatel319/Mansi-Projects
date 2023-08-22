import * as types from '../actions/actionTypes';
const initialState = {
    searchResult: "",
};
const UserSearchResult = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SEARCH_RESULT_DATA:
            return {
                ...state,
                searchResult: action.value,
            };
        default:
            return state;
    }
};

export default UserSearchResult;
