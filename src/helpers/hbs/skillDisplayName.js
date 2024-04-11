const { SkillModel } = require('../../models');

let metaMapped = {};

(async () => {
	const skills = await SkillModel.find({}).lean();

	metaMapped = skills.reduce(
		(acc, skill) => ({ ...acc, [skill.meta]: skill.name }),
		{}
	);
})();

module.exports = (meta) => {
	return metaMapped[meta];
};
