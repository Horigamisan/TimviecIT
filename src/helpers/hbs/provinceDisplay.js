const { provinces } = require('../../constants');

module.exports = (meta) => {
	return provinces.find((province) => province.meta === meta)?.name;
};
