const { PositionModel } = require('../../models');

let metaMapped = {};

(async () => {
	const positions = await PositionModel.find({}).lean();

	metaMapped = positions.reduce(
		(acc, position) => ({ ...acc, [position.meta]: position.name }),
		{}
	);
})();

module.exports = (positions) => {
	console.log('POSITIONS', positions);
	return positions.map((position) => metaMapped[position]).join(', ');
};
