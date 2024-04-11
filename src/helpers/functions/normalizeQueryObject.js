module.exports = (query) => {
	// const skills = query.skills && query.skills.split(',');
	if (query.skills) {
		query.skills = { $in: query.skills.split(',') };
	}

	if (query['work_type']) {
		query.workType = query['work_type'];
		delete query['work_type'];
	}

	if (query['years_of_experience']) {
		query.yearsOfExperience = query['years_of_experience'];
		delete query['years_of_experience'];
	}

	if (query.locations) {
		query[`locations.${query.locations}`] = { $exists: true };
		delete query.locations;
	}

	if (query.company) {
		query['company.meta'] = query.company;
		delete query.company;
	}

	if (query.due) {
		query.due = { $gt: Date.now() };
	}

	const search =
		query.search && query.search.replace(/\s+/g, ' ').trim().replace(' ', '|');

	if (search) {
		query.name = { $regex: search, $options: 'i' };

		delete query.search;
	}
};
