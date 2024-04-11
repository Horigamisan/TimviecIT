module.exports = (text) => {
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^\w\s]/gi, '')
		.replace(/\s+/g, '-')
		.toLowerCase();
};
