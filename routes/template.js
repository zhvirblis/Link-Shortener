var express = require('express'),
router = express.Router();

router.get('/:page', function(req, res){
	if(req.params.page=='home'){
		if(req.isAuthenticated()){
		return res.render('template/home',{
			isAuth:true,
				user:{
					name:req.user.username,
					email:req.user.email
				}
			});
		}
		else{
			return res.render('template/home',{
			isAuth:false});
		}
	}
	res.status(400);
    return res.render('');
});

module.exports = router;