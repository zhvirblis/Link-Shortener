var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res) {
  var user = null;
  if(req.isAuthenticated()){
    user = {
    	name: req.user.username,
    	email: req.user.email
    }
  }
  res.render('index', { 
  	title: 'Loading...' , 
  	isAuth: req.isAuthenticated(),
  	user: user
  });
});

module.exports = router;
