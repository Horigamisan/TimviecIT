const moment = require('moment');

module.exports = (date, format) => {
	if (date) {
		console.log(moment(new Date(date)).format(format));
		return moment(new Date(date)).format(format);
	}
};
