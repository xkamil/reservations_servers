import {combineReducers} from 'redux';
import resourcesReducer from './ResourcesReducer';
import reservationsReducer from './ReservationsReducer';
import usersReducer from "./UsersReducer";

const reducers = combineReducers({
    resources: resourcesReducer,
    reservations: reservationsReducer,
    users: usersReducer
});

export default reducers;