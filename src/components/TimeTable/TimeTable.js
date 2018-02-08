import React, {Component} from 'react';
import "./TimeTable.css";
import TimeTableCell from "./TimeTableCell";
import PropTypes from "prop-types";
import {createTimeTableData} from "./utils";


class TimeTable extends Component {

    static propTypes = {
        timeFrom: PropTypes.number.isRequired,
        timeTo: PropTypes.number.isRequired,
        reservationTime: PropTypes.number.isRequired,
        reservations: PropTypes.object
    };

    render() {
        const {timeFrom, timeTo, reservationTime, reservations} = this.props;
        const timeTableData = createTimeTableData(timeFrom, timeTo, reservationTime);

        return (
            <table className="time-table">
                <tbody>

                {timeTableData.map((row, rowIdx) => <tr key={rowIdx}>{row.map((cell, cellIdx) =>
                    <TimeTableCell
                        key={cellIdx}
                        time={cell}
                        reservedBy={reservations[cell]}
                        isMyReservation={reservations[cell] && true}
                    />)}</tr>)}
                </tbody>
            </table>
        );
    }
}

export default TimeTable;