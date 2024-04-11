const { provinces } = require('../../constants');

module.exports = (locations) => {
	const html = [];

	for (const [location, addressLine1s] of Object.entries(locations)) {
		const province = provinces.find((p) => p.meta === location)?.name;
		const addresses = addressLine1s
			.map((address) => `<li>${address}</li>`)
			.join('');

		html.push(
			`<span class="text-bold">${province}<span><br/><ul>${addresses}</ul>`
		);
	}

	return html.join('');
};
