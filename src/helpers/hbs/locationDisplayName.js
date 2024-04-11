const { provinces } = require('../../constants');

const metaMapped = provinces.reduce(
	(acc, province) => ({ ...acc, [province.meta]: province.name }),
	{}
);

module.exports = (meta) => {
	return metaMapped[meta];
};
