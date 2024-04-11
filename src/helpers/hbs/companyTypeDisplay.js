const { companyTypes } = require('../../constants');

module.exports = (type) => companyTypes[type] || 'Unknown';
