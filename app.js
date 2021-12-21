var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.config();
var mysql2 = require('mysql2/promise');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var expressLayouts = require('express-ejs-layouts');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');
var commentRouter = require('./routes/comment');
var app = express();

var options = {
  host: process.env.DB_HOST ,
  port:  process.env.DB_PORT,
  user:  process.env.DB_USER,
  password:  process.env.DB_PASS,
  database:  process.env.DB_NAME
};

var connection = mysql2.createPool(options);

//session
var sessionStore = new MySQLStore({}, connection);

// Session Management
app.use(session({
  name: 'tdd_id',
  secret: 'tdd2021',
  resave: true,
  store: sessionStore,
  saveUninitialized: false,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// //layout setup
// app.use(expressLayouts);
// app.set('layout','layouts/default');

// routes middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);
app.use ('/comments', commentRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
