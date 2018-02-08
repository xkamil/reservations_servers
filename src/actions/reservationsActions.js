export const UPDATE_RESERVATIONS = "UPDATE_RESERVATIONS";

export const updateReservations = (data, error) => ({
    type: UPDATE_RESERVATIONS,
    data,
    error
});

export const fetchReservations = () => {
    return (dispatch, getState, api) => {
        return api.getReservations().then(
            data => dispatch(updateReservations(data)),
            error => dispatch(updateReservations(null, error))
        );
    }
};

