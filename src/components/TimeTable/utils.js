export const createTimeTableData = (timeFrom, timeTo, reservationTime) => {
    const tableData = [];

    let dataCountInRow = 60 / reservationTime;
    let dataInRowNo = 1;
    let row = [];

    for (let i = timeFrom * 100; i <= timeTo * 100; i += reservationTime) {
        const minutes = i % 100;
        const hours = i - minutes;

        if (minutes === 60) {
            i = hours + 100;
        }

        let time = '' + i;
        const timeLength = time.length;

        time = time.substr(0, timeLength - 2) + ':' + time.substr(timeLength - 2, timeLength - 1);

        if (dataInRowNo > dataCountInRow) {
            tableData.push(row.slice());
            row = [];
            dataInRowNo = 1;
        }

        row.push(time);
        dataInRowNo++;
    }

    return tableData;
};