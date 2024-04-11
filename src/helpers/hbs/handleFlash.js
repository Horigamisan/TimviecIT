module.exports = (messages) => {
    if (Array.isArray(messages)) {
        const tmp = messages.map((message) => `<li>${message}</li>`);
        return '<p>Lỗi</p><ul>' + tmp.join('') + '</ul>';
    }

    return `<span>${messages}</span>`;
}