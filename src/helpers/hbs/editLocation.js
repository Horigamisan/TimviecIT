const { provinces } = require('../../constants');

module.exports = (locations = {}) => {
	const html = [];

	for (const [province, addressesLine1] of Object.entries(locations)) {
		html.push(
			`
				<li>
					<select class="province">
						${optionsHtml(province)}
					</select>
					<button type="button" class="add-address" data-province=${province}>add</button>
					<ul>
						${addressesLine1Html(province, addressesLine1)}
					</ul>
				</li>
			`
		);
	}

	return html.join('');
};

function optionsHtml(currentProvince) {
	const options = [];

	for (const { meta, name } of provinces) {
		options.push(
			`<option value="${meta}" ${
				currentProvince === meta ? 'selected' : ''
			}>${name}</option>`
		);
	}

	return options.join('');
}

function addressesLine1Html(province, data) {
	return data.reduce(
		(acc, address) =>
			acc +
			`<li>
				<input type="text" name="locations[${province}][]" value="${address}">
				<button type="button" class="remove-address">Xóa</button>
			</li>`,
		''
	);
}
