import {UPDATE_CONFIGURATIONS} from "../actions/timeTablesConfigurationsActions";

const initialState = {data: {}, apiError: null};

const timeTablesConfigurationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CONFIGURATIONS :
            return {...state, data: action.data, error: action.error};
        default:
            return state;
    }
};

export default timeTablesConfigurationsReducer;