const { CompanyModel } = require('../models');
const { AbstractModelService } = require('../helpers/functions');

class CompanyService extends AbstractModelService {
	constructor() {
		super(CompanyModel);
	}

	getTop(conditions, limit, projection) {
		return CompanyModel.find(conditions, projection)
			.sort({ rating: -1 })
			.limit(limit)
			.lean();
	}

	getOne(conditions, projection) {
		return CompanyModel.findOne(conditions).lean();
	}
}

module.exports = new CompanyService();
