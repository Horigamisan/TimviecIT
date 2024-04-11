const { SkillModel } = require('../models');
const { AbstractModelService } = require('../helpers/functions');

module.exports = new AbstractModelService(SkillModel);
