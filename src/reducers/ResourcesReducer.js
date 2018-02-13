import {UPDATE_RESOURCES} from "../actions/resourcesActions";

const initialState = {data: {}, apiError: null};

const resourcesReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_RESOURCES :
            return {...state, data: action.data, error: action.error};
        default:
            return state;
    }
};

export default resourcesReducer;