import axios from 'axios'

const users = {
    'Kamil Wrobel' : '89.64.57.245'
};

const fakeConfigurations = {
    table_tennis: {
        timeFrom: 7,
        timeTo: 23,
        reservationTime: 15
    },

    pool_table: {
        timeFrom: 7,
        timeTo: 23,
        reservationTime: 20
    }
};

const fakeReservations = {
    table_tennis: {
        '7:15': 'Kamil Wróbel',
        '11:35': 'Patrycja Jabcoń',
        '8:00': 'Adam Michnik',
        '8:15': 'Kamil Wróbel',
        '10:15': 'Tomasz Młocek',
        '14:45': 'Kamil Wróbel',
        '11:15': 'Krzyskie Janosik',
        '16:45': 'Kamil Wróbel',
        '12:35': 'Roman Polański',
    },

    pool_table: {
        '7:20': 'Kamil Wróbel',
        '11:20': 'Patrycja Jabcoń',
        '8:40': 'Adam Michnik',
        '8:20': 'Kamil Wróbel',
        '10:00': 'Tomasz Młocek',
        '14:40': 'Kamil Wróbel',
        '11:00': 'Krzyskie Janosik',
        '16:20': 'Kamil Wróbel',
        '12:20': 'Roman Polański',
    }
};

class Api {
    static URL = '/api';

    static getTimeTablesConfigurations() {
        return Api.returnAfterDelay(fakeConfigurations)
    }

    static getReservations() {
        return Api.returnAfterDelay(fakeReservations)
    }

    static getUsers() {
        return Api.returnAfterDelay(users)
    }

    static getMyIp() {
        return new Promise((resolve, reject) => {
            axios.get('http://freegeoip.net/json/').then((response) => {
                const ip = response.data.ip;
                ip ? resolve(ip) : reject(response);
            }).catch(reject)
        });
    }

    //TODO remove
    static returnAfterDelay(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), 500)
        })
    }

    static _get(path) {
        return new Promise((resolve, reject) => {
            axios.get(Api.URL + path).then((response) => {
                resolve(response.data)
            }).catch(reject)
        });
    }

    static _post(path, data) {
        return new Promise((resolve, reject) => {
            axios.post(Api.URL + path, data).then((response) => {
                resolve(response.data)
            }).catch(reject)
        });
    }

    static _delete(path) {
        return new Promise((resolve, reject) => {
            axios.delete(Api.URL + path).then((response) => {
                resolve(response.data)
            }).catch(reject)
        });
    }

}

export default Api;


