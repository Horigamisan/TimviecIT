const skillDisplayName = require('./skillDisplayName');

module.exports = (data, itemClass) => {
	data = data.map((meta) => skillDisplayName(meta));

	let html = `<span class='skill-item'>${data[0]}</span>`;

	if (data.length > 1) {
		html += `<span 
                class='${itemClass || ''}'
                data-toggle="tooltip"
                data-placement="top" 
                data-html="true" 
                title="${data.slice(1).join('<br/>')}"
            >
                ${data.length - 1} kỹ năng khác
            </span>`;
	}

	return html;
};
