const { Schema, model } = require('mongoose');

const SkillsSchema = new Schema({
	name: String,
	meta: String,
});

module.exports = model('Skill', SkillsSchema);
