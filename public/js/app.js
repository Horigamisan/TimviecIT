window.addEventListener('load', fn, false);

//  window.onload = function loader() {
function fn() {
	// Preloader
	if (document.getElementById('preloader')) {
		setTimeout(() => {
			document.getElementById('preloader').style.visibility = 'hidden';
			document.getElementById('preloader').style.opacity = '0';
		}, 350);
	}
	// Menus
	activateMenu();
}

//Menu
// Toggle menu
function toggleMenu() {
	document.getElementById('isToggle').classList.toggle('open');
	var isOpen = document.getElementById('navigation');
	if (isOpen.style.display === 'block') {
		isOpen.style.display = 'none';
	} else {
		isOpen.style.display = 'block';
	}
}

//Menu Active
function getClosest(elem, selector) {
	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function (s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Get the closest matching element
	for (; elem && elem !== document; elem = elem.parentNode) {
		if (elem.matches(selector)) return elem;
	}
	return null;
}

function activateMenu() {
	var menuItems = document.getElementsByClassName('sub-menu-item');
	if (menuItems) {
		var matchingMenuItem = null;
		for (var idx = 0; idx < menuItems.length; idx++) {
			if (menuItems[idx].href === window.location.href) {
				matchingMenuItem = menuItems[idx];
			}
		}

		if (matchingMenuItem) {
			matchingMenuItem.classList.add('active');
			var immediateParent = getClosest(matchingMenuItem, 'li');
			if (immediateParent) {
				immediateParent.classList.add('active');
			}

			var parent = getClosest(matchingMenuItem, '.parent-menu-item');
			if (parent) {
				parent.classList.add('active');
				var parentMenuitem = parent.querySelector('.menu-item');
				if (parentMenuitem) {
					parentMenuitem.classList.add('active');
				}
				var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
				if (parentOfParent) {
					parentOfParent.classList.add('active');
				}
			} else {
				var parentOfParent = getClosest(
					matchingMenuItem,
					'.parent-parent-menu-item'
				);
				if (parentOfParent) {
					parentOfParent.classList.add('active');
				}
			}
		}
	}
}

// Clickable Menu
if (document.getElementById('navigation')) {
	var elements = document
		.getElementById('navigation')
		.getElementsByTagName('a');
	for (var i = 0, len = elements.length; i < len; i++) {
		elements[i].onclick = function (elem) {
			if (elem.target.getAttribute('href') === 'javascript:void(0)') {
				var submenu = elem.target.nextElementSibling.nextElementSibling;
				submenu.classList.toggle('open');
			}
		};
	}
}

// Menu sticky
function windowScroll() {
	const navbar = document.getElementById('topnav');
	if (navbar != null) {
		if (
			document.body.scrollTop >= 50 ||
			document.documentElement.scrollTop >= 50
		) {
			navbar.classList.add('nav-sticky');
		} else {
			navbar.classList.remove('nav-sticky');
		}
	}
}

window.addEventListener('scroll', (ev) => {
	ev.preventDefault();
	windowScroll();
});

// back-to-top
var mybutton = document.getElementById('back-to-top');
window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (mybutton != null) {
		if (
			document.body.scrollTop > 500 ||
			document.documentElement.scrollTop > 500
		) {
			mybutton.style.display = 'block';
		} else {
			mybutton.style.display = 'none';
		}
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

//ACtive Sidebar
(function () {
	var current = location.pathname.substring(
		location.pathname.lastIndexOf('/') + 1
	);
	if (current === '') return;
	var menuItems = document.querySelectorAll('.sidebar-nav a');
	for (var i = 0, len = menuItems.length; i < len; i++) {
		if (menuItems[i].getAttribute('href').indexOf(current) !== -1) {
			menuItems[i].parentElement.className += ' active';
		}
	}
})();

//Feather icon
feather.replace();

// dd-menu
var ddmenu = document.getElementsByClassName('dd-menu');
for (var i = 0, len = ddmenu.length; i < len; i++) {
	ddmenu[i].onclick = function (elem) {
		elem.stopPropagation();
	};
}

//Tooltip
var tooltipTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
});

//small menu
try {
	var spy = new Gumshoe('#navmenu-nav a');
} catch (err) {}

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$('#myToast').toast('show');
});

$('form#filter-form').submit((e) => {
	e.preventDefault();

	const search = $('.search-box').val();
	const location = $('#location-box').val();
	const position =
		$('#position-box').val() || $('.position-radio:checked').val();
	const workType = $('.work-type-box:checked').val();
	const yearsOfExperience = $('.years-of-experience-box:checked').val();
	const skills = $('#skills-picker :selected');

	let queries = [];

	if (skills.length > 0) {
		const skillsArray = [];

		$.each(skills, (_, skill) => {
			skillsArray.push(skill.value);
		});

		queries.push('skills=' + skillsArray.join(','));
	}

	if (search) {
		console.log(encodeURIComponent(search));
		queries.push('search=' + encodeURIComponent(search));
	}

	if (location) {
		queries.push('locations=' + location);
	}

	if (position) {
		queries.push('positions=' + position);
	}

	if (workType) {
		queries.push('work_type=' + workType);
	}

	if (yearsOfExperience) {
		queries.push('years_of_experience=' + yearsOfExperience);
	}

	window.location.href = 'jobs?' + queries.join('&');
});

$('li.page-item:not(.not-active)').each(function (index) {
	$(this).on('click', function () {
		$(this).addClass('active');
		$('li.page-item.active').removeClass('active');
	});
});

$('.page-item a').on('click', function (e) {
	e.preventDefault();
	const href = $(this).attr('href');
	const query = window.location.search.replace(/[?&]page=\d+/, '');

	if (query.startsWith('?')) {
		window.location.href = query + '&' + href.substring(1);
	} else {
		window.location.href = href;
	}
});

const skillPicker = $('#skills-picker');

if (skillPicker.length > 0) {
	skillPicker.selectpicker({
		size: 5,
		noneSelectedText: 'C#, Python...',
		maxOptions: 3,
		liveSearch: true,
	});
}

const workTypePicker = $('#work-type-picker');
if (workTypePicker.length > 0) {
	workTypePicker.selectpicker({
		size: 4,
		noneSelectedText: 'Toàn thời gian,...',
		maxOptions: 3,
	});
}

const positionPicker = $('#position-picker');
if (positionPicker.length > 0) {
	positionPicker.selectpicker({
		size: 4,
		noneSelectedText: 'Intern,...',
		maxOptions: 3,
	});
}

$('.previous-btn').click(function (e) {
	e.preventDefault;
	const currentPage = $('.page-item.active a').data('page');
	console.log(currentPage);

	if (yearsOfExperience) {
		queries.push('years_of_experience=' + yearsOfExperience);
	}

	window.location.href = 'jobs?' + queries.join('&');
});

$('li.page-item:not(.not-active)').each(function (index) {
	$(this).on('click', function () {
		$(this).addClass('active');
		$('li.page-item.active').removeClass('active');
	});
});

$('.page-item a').on('click', function (e) {
	e.preventDefault();
	const href = $(this).attr('href');
	const query = window.location.search.replace(/[?&]page=\d+/, '');

	if (query.startsWith('?')) {
		window.location.href = query + '&' + href.substring(1);
	} else {
		window.location.href = href;
	}
});

$('#client-login-form').submit(function (e) {
	e.preventDefault();

	const clickedBtn = $(document.activeElement).attr('id');
	if (clickedBtn === 'candidate-login-btn') {
		$(this).attr('action', '/auth/sign-in/candidate');
	} else if (clickedBtn === 'employer-login-btn') {
		$(this).attr('action', '/auth/sign-in/employer');
	}

	$(this).unbind('submit').submit();
});

$('#client-signup-form').submit(function (e) {
	e.preventDefault();

	const clickedBtn = $(document.activeElement).attr('id');
	if (clickedBtn === 'candidate-signup-btn') {
		$(this).attr('action', '/auth/sign-up/candidate');
	} else if (clickedBtn === 'employer-signup-btn') {
		$(this).attr('action', '/auth/sign-up/employer');
	}

	$(this).unbind('submit').submit();
});

$('.toggle-edit-mode-btn').click(function (e) {
	$('form.profile').toggleClass('edit-mode');
});

// $('.toggle-edit-mode-btn').click(function (e) {
// 	const form = $('form.profile');
// 	$.each($('.editable-content'), (_, elem) => {
// 		const val = $(elem).text() || $(elem).val();

// 		$(elem).replaceWith(
// 			form.hasClass('edit-mode')
// 				? `<input type="text" class="form-control editable-content mt-2" value="${val}">`
// 				: `<span class="editable-content">${val}</span>`
// 		);
// 	});
// });

$('button.delete-social').on('click', function () {
	$(this).parent().remove();
});

$('#add-social').click(function () {
	const count = $('.social-list li').length;

	$('.social-list').append(
		`
			<li class='list-inline-item'>
				<select name="socials[${count}][platform]">
					<option value="facebook">facebook</option>
					<option value="google" selected>google</option>
					<option value="instagram">instagram</option>
				</select>

				<input type="text" name="socials[${count}][link]" />
				<button type="button" class="delete-social">delete</button>
			</li>
		`
	);

	$('button.delete-social').on('click', function () {
		$(this).parent().remove();
	});
});

$('button.delete-edu').on('click', function () {
	$(this).parent().parent().remove();
});

$('.remove-address').click(function () {
	$(this).parent().remove();
});

$('.add-address').click(function () {
	const province = $(this).data('province');

	$(this)
		.parent()
		.find('ul')
		.append(
			`
				<li>
					<input type="text" name="locations[${province}][]">
					<button type="button" class="remove-address">Xóa</button>
				</li>
			`
		);

	$('.remove-address').click(function () {
		$(this).parent().remove();
	});
});

$('#add-edu').click(function () {
	const count = $('.social-list li').length;

	$('.edu-list').append(
		`
			<div class='col-lg-12 mt-4 pt-2'>
				<div class='d-flex'>
					<div class='company-logo text-muted h6 me-3 text-center mr-5'>
						<input type="text" name="education[${count}][start]">
						-
						<input type="text" name="education[${count}][end]">
					</div>
					<div class='flex-1'>
						<input type="text" name="education[${count}][university]">
						<input type="text" name="education[${count}][major]">
						<input type="text" name="education[${count}][degree]">
					</div>
					<button type="button" class="delete-edu">delete</button>
				</div>
			</div>
		`
	);

	$('button.delete-edu').on('click', removeTwoLevel);
});

$('button.delete-project').on('click', function () {
	$(this).parent().parent().remove();
});

$('#add-project').click(function () {
	const count = $('.project-list li').length;

	$('.project-list').append(
		`
			<li class='col-md-6 col-12 mt-4 pt-2'>
				<div class='card border-0 work-container work-classic'>
					<div class='card-body p-0'>
						<div class='content pt-3'>
							<input type="text" name="projects[${count}][name]">
							<textarea name="projects[${count}][description]" rows="2"></textarea>
							<input type="text" name="projects[${count}][source]" >
							<input type="text" name="projects[${count}][demo]">
						</div>
					</div>
					<button type="button" class="delete-project">delete</button>
				</div>
			</li>
		`
	);

	$('button.delete-project').on('click', removeTwoLevel);
});

$('button.delete-experience').on('click', removeTwoLevel);

$('#add-experience').click(function () {
	const count = $('.experience-list li').length;

	$('.experience-list').append(
		`
			<li class='col-lg-12 mt-4 pt-2'>
				<div class='d-flex'>
					<div class='company-logo text-muted h6 me-3 text-center mr-5'>
						<input type="text" name="experience[${count}][start]">
						-
						<input type="text" name="experience[${count}][end]">
					</div>
					<div class='flex-1'>
						<input type="text" name="experience[${count}][job]">
						<input type="text" name="experience[${count}][company]">
						<input type="text" name="experience[${count}][description]">
					</div>
					<button type="button" class="delete-experience">xóa</button>
				</div>
			</li>
		`
	);

	$('button.delete-experience').on('click', removeTwoLevel);
});

$('#preview-img').click(() => {
	$('#image-input').click();
});

$('#image-input').change(function (e) {
	const reader = new FileReader();

	reader.onload = function () {
		const preview = $('#preview-img');
		preview.attr('src', reader.result);
	};
	reader.readAsDataURL(e.target.files[0]);
});

function removeOneLevel(_this) {
	$(_this).parent().remove();
}

function removeTwoLevel(_this) {
	$(_this).parent().parent().remove();
}

function addProvince(_this) {
	const provinces = $(_this).data('province');

	const newProvinceItem = $(`<li>
		<select class="province">
			${provinces.map(
				(province) =>
					`<option value=${province.meta} ${
						province.meta === 'ha-noi' ? 'selected' : ''
					}>${province.name}</option>`
			)}
		</select>
		<button type="button" class="add-address" data-province="ha-noi">add</button>
		<ul>
			<li>
				<input type="text" name="locations[ha-noi][]">
				<button type="button" class="remove-address" onclick="removeOneLevel(this)">Xóa</button>
			</li>
		</ul>
	</li>`);

	$('.list-locations').append(newProvinceItem);

	$(newProvinceItem)
		.find('select.province')
		.change(function () {
			const newProvince = $(this).val();
			const button = $(this).parent().find('button.add-address');
			button.data('province', newProvince);

			const addressInputs = $(this).parent().find('ul li input');

			$.each(addressInputs, function (_, address) {
				$(address).attr('name', 'locations[' + newProvince + '][]');
			});
		});

	$(newProvinceItem)
		.find('.add-address')
		.click(function () {
			const province = $(this).data('province');

			$(this)
				.parent()
				.find('ul')
				.append(
					`
				<li>
					<input type="text" name="locations[${province}][]">
					<button type="button" class="remove-address">Xóa</button>
				</li>
			`
				);

			$('.remove-address').click(function () {
				$(this).parent().remove();
			});
		});
}

$('select.province').change(function () {
	const newProvince = $(this).val();
	const button = $(this).parent().find('button.add-address');
	button.data('province', newProvince);

	const addressInputs = $(this).parent().find('ul li input');

	$.each(addressInputs, function (_, address) {
		$(address).attr('name', 'locations[' + newProvince + '][]');
	});
});

const ckeditors = {};

if (document.querySelector('#company-introduction-editor')) {
	ClassicEditor.create(
		document.querySelector('#company-introduction-editor'),
		{}
	).then((editor) => (ckeditors['#company-introduction-editor'] = editor));
}

if (document.querySelector('#company-benefit-editor')) {
	ClassicEditor.create(
		document.querySelector('#company-benefit-editor'),
		{}
	).then((editor) => (ckeditors['#company-benefit-editor'] = editor));
}

if (document.querySelector('#job-requirement-editor')) {
	ClassicEditor.create(
		document.querySelector('#job-requirement-editor'),
		{}
	).then((editor) => (ckeditors['#job-requirement-editor'] = editor));
}

if (document.querySelector('#job-introduction-editor')) {
	ClassicEditor.create(
		document.querySelector('#job-introduction-editor'),
		{}
	).then((editor) => (ckeditors['#job-introduction-editor'] = editor));
}

if (document.querySelector('#job-description-editor')) {
	ClassicEditor.create(
		document.querySelector('#job-description-editor'),
		{}
	).then((editor) => (ckeditors['#job-description-editor'] = editor));
}

$('.salary-input').hide();

$('input#deal').change(function () {
	if ($(this).is(':checked')) {
		$('.salary-input').hide();
	}
});

$('input#real-salary').change(function () {
	if ($(this).is(':checked')) {
		$('.salary-input').show();
		$('input#salary-input').change(function () {
			$('input#real-salary').val($(this).val());
		});
	}
});
