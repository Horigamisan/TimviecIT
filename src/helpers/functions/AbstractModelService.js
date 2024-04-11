const LIMIT = 1;

module.exports = class {
	constructor(model) {
		this.model = model;
		this.stages = [];
		this.facet = {
			data: [],
			total: [{ $count: 'total' }],
		};
		this.specialProject = {
			data: 1,
			total: { $arrayElemAt: ['$total.total', 0] },
		};
		this.hasFacet = false;
	}

	async getTotalDocuments(conditions) {
		return this.model.countDocuments(conditions);
	}

	reset() {
		this.stages = [];
		this.facet = {
			data: [],
			total: [{ $count: 'total' }],
		};
		this.specialProject = {
			data: 1,
			total: { $arrayElemAt: ['$total.total', 0] },
		};
		this.hasFacet = false;
	}

	populate(from, localField, foreignField, as) {
		this.stages.push(
			{
				$lookup: {
					from,
					localField,
					foreignField: foreignField || '_id',
					as: as || localField,
				},
			},
			{
				$unwind: `$${as || localField}`,
			}
		);

		return this;
	}

	select(fields) {
		this.stages.push({
			$project: fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}),
		});

		return this;
	}

	sort(conditions) {
		this.stages.push({ $sort: conditions });

		return this;
	}

	match(criterias) {
		this.stages.push({ $match: criterias });
		return this;
	}

	top(quantity) {
		this.stages.push({ $limit: quantity });
		return this;
	}

	page(page) {
		if (this.hasFacet) {
			this.facet.data = [{ $skip: (page - 1) * LIMIT }, { $limit: LIMIT }];
			this.facet.total = [{ $count: 'total' }];
		} else {
			this.stages.push({ $skip: (page - 1) * LIMIT }, { $limit: LIMIT });
		}
		return this;
	}

	page(page) {
		if (this.hasFacet) {
			this.facet.data = [{ $skip: (page - 1) * LIMIT }, { $limit: LIMIT }];
			this.facet.total = [{ $count: 'total' }];
		} else {
			this.stages.push({ $skip: (page - 1) * LIMIT }, { $limit: LIMIT });
		}
		return this;
	}

	addFacet() {
		this.stages.push({ $facet: this.facet }, { $project: this.specialProject });
		this.hasFacet = true;

		return this;
	}

	exec() {
		const aggregate = this.model.aggregate(this.stages);
		this.reset();

		return aggregate;
	}

	get(criterias, selectedFields = []) {
		return this.model.findOne(criterias, selectedFields.join(' ')).lean();
	}

	getMany(payload) {
		return this.model.find(payload).lean();
	}

	create(payload) {
		return this.model.create(payload);
	}

	update(criterias, payload) {
		return this.model.findOneAndUpdate(criterias, payload, {
			new: true,
			lean: true,
		});
	}

	remove(criterias, sortRemove = true) {
		if (sortRemove) {
			return this.model.findOneAndUpdate(
				criterias,
				{ hidden: true },
				{
					new: true,
					lean: true,
				}
			);
		}

		return this.model.findOneAndDelete(criterias);
	}
};
