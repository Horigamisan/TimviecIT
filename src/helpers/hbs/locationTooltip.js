const locationDisplayName = require('./locationDisplayName');

module.exports = (data, itemClass) => {
    data = data.map(meta => locationDisplayName(meta))

    return `<span 
        class='${itemClass || ''}'
        data-toggle="tooltip"
        data-placement="top" 
        data-html="true" 
        title="${data.join('<br/>')}"
    >
        ${data[0]}
        ${data.length > 1 ? ` ${data.length - 1} nơi khác` : ''}
    </span>`;
}