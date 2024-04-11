const formatTime = require('./formatTime');

module.exports = (due, meta, id) => {
	const timeLeft = formatTime(due, -1, false);

	if (timeLeft === 0) {
		return '<p class="text-danger text-bold">Hết hạn ứng tuyển</p>';
	}

	return `
        <p>
            Còn <strong>${timeLeft}</strong> để ứng tuyển
        </p>

        <div class='mt-4'>
            <button class='btn btn-outline-primary' data-toggle="modal" data-target="#ApplyNow">Apply Now
                <i class='mdi mdi-send'></i></button>
        </div>
    `;
};
