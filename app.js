var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Routes
var routes = require('./routes/index');
var api = require('./routes/api');
var tpl = require('./routes/template');
var redirect = require('./routes/redirect');


var app = express();

// Сonfiguration and creation of database
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
if(process.env.NODE_ENV=='test') {
  var createTestUser = require('./test/for test/create_test_user');
  mongoose.connect(dbConfig.test);
  mongoose.connection.collections['users'].drop( function(err) {
  	if(err){
  		console.log(err);
  	}
    console.log('collection dropped(users)');
  });
  mongoose.connection.collections['links'].drop( function(err) {
  	if(err){
  		console.log(err);
  	}
    console.log('collection dropped(links)');
  });
  createTestUser();
}
else {
  mongoose.connect(dbConfig.url);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuration Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: '0cpprtEErkokoUOnels'}));
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
var flash = require('connect-flash');
app.use(flash());

// Init passport
var initPassport = require('./passport/init');
initPassport(passport);
var auth = require('./routes/auth')(passport);

// Routes
app.use('/api', api);
app.use('/l', redirect);
app.use('/template', tpl);
app.use('/', auth);
app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
      });
  });

module.exports = app;
