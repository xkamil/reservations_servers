export const UPDATE_RESOURCES = "UPDATE_RESOURCES";

const updateResources = (data, error) => ({
    type: UPDATE_RESOURCES,
    data,
    error
});

export const fetchResources = () => {
    return (dispatch, getState, api) => {
        return api.getResources().then(
            data => dispatch(updateResources(data)),
            error => dispatch(updateResources(null, error))
        );
    }
};


