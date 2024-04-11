const { JobModel } = require('../models');
const { AbstractModelService } = require('../helpers/functions');

class JobService extends AbstractModelService {
	constructor() {
		super(JobModel);
	}

	addWorkTypeCount() {
		this.facet.jobsTypeCount = [
			{
				$unwind: '$workType',
			},
			{
				$group: {
					_id: '$workType',
					count: { $sum: 1 },
				},
			},
			{
				$project: {
					workType: '$_id',
					count: 1,
					_id: 0,
				},
			},
			{
				$group: {
					_id: null,
					jobsTypeCount: { $push: { workType: '$workType', count: '$count' } },
				},
			},
			{
				$project: {
					_id: 0,
					jobsTypeCount: {
						$arrayToObject: {
							$map: {
								input: '$jobsTypeCount',
								in: { k: '$$this.workType', v: '$$this.count' },
							},
						},
					},
				},
			},
		];

		this.specialProject.jobsTypeCount = {
			$arrayElemAt: ['$jobsTypeCount.jobsTypeCount', 0],
		};

		return this;
	}

	reduceLocations() {
		this.stages.push({
			$addFields: {
				locations: {
					$map: {
						input: { $objectToArray: '$locations' },
						in: '$$this.k',
					},
				},
			},
		});

		return this;
	}

	getManyWithTotalApplyForms(from, localField, foreignField, as, projection) {
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
				$project: {
					...projection.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}),
					totalApplyForms: { $size: '$applyForms' },
				},
			}
		);

		return this;
	}
}

module.exports = new JobService();
