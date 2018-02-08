export const UPDATE_USERS = "UPDATE_USERS";
export const UPDATE_MY_IP = "UPDATE_MY_IP";

export const updateUsers = (data, error) => ({
    type: UPDATE_USERS,
    data,
    error
});

export const updateMyIp = (data, error) => ({
    type: UPDATE_MY_IP,
    data,
    error
});

export const fetchUsers = () => {
    return (dispatch, getState, api) => {
        return api.getUsers().then(
            data => dispatch(updateUsers(data)),
            error => dispatch(updateUsers(null, error))
        );
    }
};

export const getMyIp = () => {
    return (dispatch, getState, api) => {
        return api.getMyIp().then(
            data => dispatch(updateMyIp(data)),
            error => dispatch(updateMyIp(null, error))
        );
    }
};

