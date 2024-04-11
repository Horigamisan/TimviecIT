module.exports = (schema) => {
	const clonedSchema = schema.clone();
	const body = clonedSchema.fields.body.fields;

	for (const field of Object.keys(body)) {
		// Set the field as optional
		body[field] = body[field].optional();
	}

	return clonedSchema;
};
