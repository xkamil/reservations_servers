export const UPDATE_USERS = "UPDATE_USERS";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";

export const updateUserInfo = (data, error) => ({
    type: UPDATE_USER_INFO,
    data,
    error
});

export const updateUsers = (data, error) => ({
    type: UPDATE_USERS,
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

export const logIn = (email) => {
    return (dispatch, getState, api) => {
        return api.logIn(email).then(
            data => dispatch(updateUserInfo(data)),
            error => dispatch(updateUserInfo(null, error))
        );
    }
};

