module.exports = (province, addresses, selected) => {
	const lis = addresses.map(
		(address, i) => `
						<li><input type="checkbox" value="${address}" name="locations[${province}][]" id="${province}-address-${i}" ${
			Object.keys(selected).includes(province) &&
			selected[province]?.includes(address)
				? 'checked'
				: ''
		} >
						<label for="${province}-address-${i}">${address}</label></li>
					`
	);

	return `<ul style="list-style: none">${lis.join('')}</ul>`;
};
