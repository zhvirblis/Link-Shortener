var Link = require('../../models/link');
var regxp=require('../../regexps.js');

module.exports = function(req, res){
	if(!regxp.correctNewUrlCode(req.params.id)){
		return res.json({status:'nondel', message:'Incorect code'});
	}

	if(!req.isAuthenticated()){
		return res.json({status:'nondel', message:'User is not authorized'});
	}

	Link.remove({author:req.user.username, newurl:req.params.id},function(err){
		if (err) {
			return res.json({status:'err', message:err.message});
		}
		return res.json({status:'ok', message:'Link deleted'});
	});
}