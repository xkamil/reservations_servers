import {UPDATE_RESERVATIONS} from "../actions/reservationsActions";

const initialState = {data: {}, apiError: null};

const reservationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_RESERVATIONS :
            return {...state, data: action.data, error: action.error};
        default:
            return state;
    }
};

export default reservationsReducer;