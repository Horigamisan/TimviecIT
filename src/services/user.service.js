const { UserModel } = require('../models');
const { AbstractModelService } = require('../helpers/functions');

module.exports = new AbstractModelService(UserModel);
