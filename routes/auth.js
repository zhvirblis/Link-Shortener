var express = require('express');
var router = express.Router();

var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated())
   return next();
  res.redirect('/');
};

module.exports = function(passport) {
	 router.post('/login', function(req, res) {
    if (!req.body.username) {
        return res.json({status: 'nonauth', message: 'Empty login'});
      }
    if(!req.body.password){
        return res.json({status: 'nonauth', message: 'Empty password'});
    }
    passport.authenticate('login', function(err, user, info) {
      if (err) {return res.json({status: 'error',error: err.message});}
      if (!user) {
        return res.json({status: 'nonauth',message: req.flash('message')[0]});
      }
      req.logIn(user, function(err) {
        if (err) {return res.json({status: 'error',error: err.message});}
        return res.json({status: 'ok', username: req.user.username, email: req.user.email});
      });
    })(req, res);
	 });

	 router.post('/signup', function(req, res) {
    passport.authenticate('signup', function(err, user, info) {
      if (err) {return res.json({status: 'error',error: err.message});}
      if (!user) {
        return res.json({status: 'nonreg',message: req.flash('message')});
      }
      req.logIn(user, function(err) {
        if (err) {return res.json({status: 'error',error: err.message});}
        return res.json({status: 'ok', username: req.user.username, email: req.user.email});
      });
    })(req, res);
	 });
	 return router;
};
