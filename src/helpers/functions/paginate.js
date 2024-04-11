module.exports = (total, limit, page) => {
	console.log(total);
	const totalPages = Math.ceil(total / limit);
	const hasPreviousPage = page > 1;
	const hasNextPage = page < totalPages;
	const previousPage = page - 1;
	const nextPage = page + 1;

	let startEllipsis = false;
	let endEllipsis = false;
	let startPage = 1;
	let endPage = totalPages;

	if (totalPages > 5) {
		if (page > 3) {
			startEllipsis = true;
			startPage = page - 2;
		}
		if (page < totalPages - 2) {
			endEllipsis = true;
			endPage = page + 2;
		}
	}

	const pages = [];
	for (let i = startPage; i <= endPage; i++) {
		pages.push({
			page: i,
			isCurrent: i === page,
		});
	}

	return {
		hasPreviousPage,
		previousPage,
		hasNextPage,
		nextPage,
		pages,
		showStartEllipsis: startEllipsis,
		showEndEllipsis: endEllipsis,
		startPage,
		endPage,
		currentPage: page,
		totalPages,
	};
};
