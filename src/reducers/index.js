import {combineReducers} from 'redux';
import timeTablesConfigurationsReducer from './TimeTablesConfigurationsReducer';
import reservationsReducer from './ReservationsReducer';
import usersReducer from "./UsersReducer";

const reducers = combineReducers({
    configurations: timeTablesConfigurationsReducer,
    reservations: reservationsReducer,
    users: usersReducer
});

export default reducers;