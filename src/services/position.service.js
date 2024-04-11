const { PositionModel } = require('../models');
const { AbstractModelService } = require('../helpers/functions');

module.exports = new AbstractModelService(PositionModel);
