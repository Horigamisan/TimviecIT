module.exports = (val, selectedVals) => {
	if (typeof selectedVals === 'string') {
		return selectedVals === val ? 'selected' : '';
	}

	if (selectedVals && typeof selectedVals[0] === 'string') {
		return selectedVals.includes(val) ? 'selected' : '';
	}
};
