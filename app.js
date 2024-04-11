require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const { engine } = require('express-handlebars');

const { db } = require('./configs');
const indexRouter = require('./src/routes');
const helpersHbs = require('./src/helpers/hbs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');
app.engine(
	'hbs',
	engine({
		extname: 'hbs',
		defaultLayout: 'main',
		helpers: { ...helpersHbs, log: console.log },
		partialsDir: path.join(__dirname, 'src/views/partials'),
	})
);

app.use(
	logger('dev'),
	express.urlencoded({ extended: true }),
	express.static(path.join(__dirname, 'public')),
	session({
		secret: 'keyboard cat',
		resave: true,
		saveUninitialized: true,
	}),
	passport.initialize(),
	passport.session()
);

app.use((req, res, next) => {
	if (req.path === '/favicon.ico') return next();

	res.locals.flash = req.session.flash ? { ...req.session.flash } : undefined;
	res.locals.form = { ...req.session.form };

	res.locals.isCandidate = req.session.user || req.user; // due to having 2 method to

	res.locals.isEmployer = req.session.company;
	res.locals.isAuth =
		res.locals.isCandidate || res.locals.isEmployer ? true : false;
	res.locals.temp = true;

	delete req.session.form;
	delete req.session.flash;

	next();
});

app.use('/', indexRouter);

app.use(function (_, __, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, _) {
	if (err.status === 403) {
		return res.render('error/403');
	}

	if (err.status === 404) {
		return res.render('error/404');
	}

	if (err.status === 500) {
		return res.render('error/500');
	}

	req.session.flash = {
		isFormError: err.isFormError,
		title: 'Lỗi',
		type: 'danger',
		message: err.message instanceof Array ? err.message : [err.message],
	};

	res.redirect(req.get('referer') || '/');
});

db.connect();

module.exports = app;
