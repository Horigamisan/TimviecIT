const { Schema, model } = require('mongoose');

const PositionSchema = new Schema({
	name: String,
	meta: String,
});

module.exports = model('Position', PositionSchema);
