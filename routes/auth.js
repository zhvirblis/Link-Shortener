var express = require('express');
var router = express.Router();
var regxp = require('../regexps.js');

module.exports = function(passport) {
  router.post('/login', function(req, res) {

    // Empty login
    if (!req.body.username) {
      return res.json({status: 'nonauth', message: 'Empty login'});
    }

    // Empty password
    if (!req.body.password) {
      return res.json({status: 'nonauth', message: 'Empty password'});
    }
    // Authentication
    passport.authenticate('login', function(err, user, info) {

      if (err) {return res.json({status: 'error',error: err.message});}
      if (!user) {
        return res.json({status: 'nonauth',message: req.flash('message')[0]});// Failed authentication
      }
      req.logIn(user, function(err) { // Login
        if (err) {return res.json({status: 'error',error: err.message});}
        return res.json({
          status: 'ok',
          username: req.user.username,
          email: req.user.email
        });
      });
    })(req, res);

  });

  // Registration

  router.post('/signup', function(req, res) {

    if (!req.body.username) {
      return res.json({status: 'nonreg', message: 'Empty login'});
    }

    if (!req.body.email) {
      return res.json({status: 'nonreg', message: 'Empty email'});
    }

    if (!req.body.password) {
      return res.json({status: 'nonreg', message: 'Empty password'});
    }

    if (!regxp.correctUsername(req.body.username)) {
      return res.json({status: 'nonreg', message: 'Invalid username'});
    }

    passport.authenticate('signup', function(err, user, info) {

      if (err) {return res.json({status: 'error',error: err.message});}

      if (!user) {
        return res.json({status: 'nonreg',message: req.flash('message')[0]});
      }

      req.logIn(user, function(err) {
        if (err) {return res.json({status: 'error',error: err.message});}
        return res.json({
          status: 'ok',
          username: req.user.username,
          email: req.user.email});
      });

    })(req, res);

  });
  // Logout
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/authtest', function(req, res) {
    if (req.isAuthenticated()) {
      res.json({auth: true});
    } else {
      res.json({auth: false});
    }
  });
  return router;
};

