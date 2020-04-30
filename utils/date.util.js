const moment = require('moment');

module.exports = {
    moment,
    getDateRangeAfter: (noOfDays, dateFormat) => {
        let dates = [];
        for (let i = 0; i < noOfDays; i++) {
            let date = moment();
            date.add(i, 'day').format(dateFormat);
            dates.push(date);
        }
        return dates;
    },
    getDateRangeBefore: (noOfDays, dateFormat) => {
        let dates = [];
        for (let i = 0; i < noOfDays; i++) {
            let date = moment();
            dates.push(date.subtract(i, 'day').format('YYYY-MM-DD'));
        }
        return dates;
    },
    addTime: (data) => {
        let { sec = 0, min = 0, hour = 0 } = { ...data };
        return moment()
            .add(sec, 'seconds')
            .add(min, 'minutes')
            .add(hour, 'hours');
    }
};