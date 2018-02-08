import React, {Component} from 'react';
import TimeTable from "../TimeTable/TimeTable";
import {connect} from "react-redux";
import {fetchConfigurations} from "../../actions/timeTablesConfigurationsActions";
import {fetchReservations} from "../../actions/reservationsActions";
import {fetchUsers, getMyIp} from "../../actions/usersActions";

class App extends Component {

    componentDidMount() {
        this.props.fetchConfigurations();
        this.props.fetchReservations();
        this.props.fetchUsers();
        this.props.getMyIp();
    }

    render() {
        const {configurations, reservations, location} = this.props;
        const games = Object.getOwnPropertyNames(configurations.data);

        return (
                <div className="App">
                    {console.log(this.props)}
                    <pre>{JSON.stringify(this.props.users)}</pre>

                    {games.map(name => {

                        if(location.pathname.endsWith(name))
                        return (<TimeTable
                            key={name}
                            reservations={reservations.data[name] || {}}
                            timeFrom={configurations.data[name].timeFrom}
                            timeTo={configurations.data[name].timeTo}
                            reservationTime={configurations.data[name].reservationTime}/>)}
                    )}

                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        configurations: state.configurations,
        reservations: state.reservations,
        users: state.users,
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchConfigurations: () => dispatch(fetchConfigurations()),
    fetchReservations: () => dispatch(fetchReservations()),
    fetchUsers: () => dispatch(fetchUsers()),
    getMyIp: () => dispatch(getMyIp())
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
