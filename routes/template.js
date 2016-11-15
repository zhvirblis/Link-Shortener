var express = require('express'),
router = express.Router();

router.get('/:page', function(req, res){
	var isAuth = req.isAuthenticated();
	if(req.params.page=='home'){
		return res.render('template/home', isAuth);
	}
	if(req.params.page=='list'){
		return res.render('template/list', isAuth);
	}
	res.status(400);
    return res.render('Not Found');
});

module.exports = router;