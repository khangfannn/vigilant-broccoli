var createError = require('http-errors');
var express = require('express');
var path = require('path');
var Cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('./mongo/category.model');
require('./mongo/products.model');
require('./mongo/user.model');
//http://localhost:3000
//khai báo các routing của project
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');

var app = express();
// const corsOptions = {
//   origin: 'https://yourdomain.com',
//   optionsSuccessStatus: 200 // some legacy browsers choke on 204
// };

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(Cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost:27017/RestfulNodeJS')
  .then(() => { console.log('Ket Noi Thanh Cong'); })
  .catch(err => { console.log('That Bai :', err); });

//định nghĩa routing
//http://localhost:3000/
app.use('/', indexRouter);
//http://localhost:3000/users
app.use('/users', usersRouter);
//http://localhost:3000/products
app.use('/products', productsRouter);
//http://localhost:3000/categories
app.use('/categories', categoriesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
