export const UPDATE_CONFIGURATIONS = "UPDATE_CONFIGURATION";

export const updateConfigurations = (data, error) => ({
    type: UPDATE_CONFIGURATIONS,
    data,
    error
});

export const fetchConfigurations = () => {
    return (dispatch, getState, api) => {
        return api.getTimeTablesConfigurations().then(
            data => dispatch(updateConfigurations(data)),
            error => dispatch(updateConfigurations(null, error))
        );
    }
};

