import {UPDATE_USERS, UPDATE_USER_INFO} from "../actions/usersActions";

const initialState = {data: {}, apiError: null};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USERS :
            return {...state, data: action.data, error: action.error};
        case UPDATE_USER_INFO :
            return {...state, userinfo: action.data, error: action.error};
        default:
            return state;
    }
};

export default usersReducer;