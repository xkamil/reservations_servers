import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { status, statusColor } from "./const";

class TimeTableCell extends Component {

    static propTypes = {
        isMyReservation: PropTypes.bool,
        reservedBy: PropTypes.string,
        time: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            opacity: 1
        }
    }

    isDisabled() {
        const time = parseInt(this.props.time.replace(':', ''));
        const date = new Date();
        const currentTime = (date.getHours() * 100) + date.getMinutes();

        return currentTime > time;
    }

    handleMouseOver = () => {
        if (!this.isDisabled()) {
            this.setState({opacity: 0.5})
        }
    };

    handleMouseOut = () => {
        if (!this.isDisabled()) {
            this.setState({opacity: 1})
        }
    };

    handleReservation = () => {
        //todo
    };

    render() {
        const {isMyReservation, reservedBy, time} = this.props;
        const opacity = this.isDisabled() ? 0.5 : this.state.opacity;
        const reservationStatus = reservedBy ? isMyReservation ? status.RESERVED_BY_ME : status.RESERVED : status.FREE;
        const backgroundColor = statusColor[reservationStatus];

        return (
            <td>
                <div className="time-table-cell-container"
                     onMouseOver={this.handleMouseOver}
                     onMouseOut={this.handleMouseOut}
                     onClick={this.handleReservation}
                     style={{backgroundColor, opacity}}>

                    <div className="time-table-cell time-table-cell-small"><strong>{time}</strong></div>
                    {reservedBy &&
                    <div className="time-table-cell time-table-cell-big">{reservedBy}</div>}
                </div>
            </td>
        );
    }
}

export default TimeTableCell;