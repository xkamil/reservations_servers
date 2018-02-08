import {UPDATE_USERS, UPDATE_MY_IP} from "../actions/usersActions";

const initialState = {data: {}, apiError: null};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USERS :
            return {...state, data: action.data, error: action.error};
        case UPDATE_MY_IP :
            return {...state, ip: action.data, error: action.error};
        default:
            return state;
    }
};

export default usersReducer;