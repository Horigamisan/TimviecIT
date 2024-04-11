module.exports = (since, base) => {
	const time = base * (Date.now() - since.getTime());

	if (time <= 0 && base === -1) return 0;

	const minutes = Math.floor(time / (1000 * 60));

	if (minutes < 60) return base === 1 ? `${minutes}m` : `${minutes} phút`;

	const hours = Math.floor(minutes / 60);
	if (hours < 24) return base === 1 ? `${hours}h` : `${hours} giờ`;

	const days = Math.floor(hours / 24);
	if (days < 31) return base === 1 ? `${days}d` : `${days} ngày`;

	const months = Math.floor(days / 30);
	if (months < 12) return base === 1 ? `${months}m` : `${months} tháng`;

	return base === 1
		? `${Math.floor(months / 12)}y`
		: `${Math.floor(months / 12)} năm`;
};
