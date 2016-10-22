var Link = require('../../models/link');
var regxp=require('../../regexps.js');

module.exports = function(req, res){
	var search='';
	var tag=null;
	var count=0;
	var skip=0;
	var author=req.body.author;
	var sort={newurl:1};
	if(req.body.search){
		search=req.body.search;
	}
	if(req.body.tag){
		tag=req.body.tag;
	}
	if(req.body.count){
		count=req.body.count;
		if(req.body.page && Number.isInteger(req.body.page)){
			if(req.body.page>0){
				skip=count*(req.body.page-1);
			}
		}
	}
	if(req.body.sort){
		var str_sort=req.body.sort;
	}
	
	var findoc={$or:[{newurl:new RegExp(search)},{origin:new RegExp(search)}]};

	if(tag){
		findoc.tags=tag;
	}

	if(author&&req.isAuthenticated()){
		findoc.author=req.user.username;
	}

	switch(str_sort){
		case 'newurl':
		sort={newurl:1};
		break;
		case 'origin':
		sort={origin:1};
		break;
	}
	
	Link.find(findoc,{_id:0,__v:0})
	.sort(findoc.sort)
	.skip(skip)
	.limit(count)
	.exec(function(err, links){
		res.json(links);
	});
}