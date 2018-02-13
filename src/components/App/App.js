import React, {Component} from 'react';
import TimeTable from "../TimeTable/TimeTable";
import {connect} from "react-redux";
import {fetchReservations} from "../../actions/reservationsActions";
import {fetchUsers, logIn} from "../../actions/usersActions";
import {fetchResources} from "../../actions/resourcesActions";

class App extends Component {

    componentDidMount() {
        this.props.logIn('kamil.wrobel@pega.com');
        this.props.fetchUsers();

        setTimeout(this.props.fetchResources, 1000);
    }

    render() {
        const {users, reservations, resources} = this.props;

        return (
                <div className="App">
                    {console.log(this.props)}
                    <pre>{JSON.stringify(users)}</pre>
                    <pre>{JSON.stringify(reservations)}</pre>
                    <pre>{JSON.stringify(resources)}</pre>

                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        resources: state.resources,
        reservations: state.reservations,
        users: state.users,
    }
};

const mapDispatchToProps = (dispatch) => ({
    logIn: (email) => dispatch(logIn(email)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchResources: () => dispatch(fetchResources())
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
