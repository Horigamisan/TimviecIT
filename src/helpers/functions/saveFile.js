const path = require('path');
const fs = require('fs');

module.exports = (image, type = 'images') => {
	const tmpPath = image.filepath;
	const dir = path.join(__dirname, '../../../public/uploads/' + type);
	const extension = image.originalFilename.split('.')[1];
	const newFilename = image.newFilename + '-' + Date.now() + '.' + extension;

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	fs.rename(tmpPath, path.join(dir, newFilename), (err) => {
		if (err) throw err;
	});

	return '/uploads/' + type + '/' + newFilename;
};
