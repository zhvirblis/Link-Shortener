var Link = require('../../models/link');
var regxp=require('../../regexps.js');

module.exports = function(req, res){
	var search='';
	var tag=null;
	var count=0;
	var skip=0;
	var author=req.query.author;
	console.log(req.query.tag);
	var sort={newurl:1};
	if(req.query.search){
		search=req.query.search;
	}
	if(req.query.tag){
		tag=req.query.tag;
	}
	if(req.query.count){
		count=req.query.count;
		if(req.query.page){
			if(req.query.page>0){
				skip=count*(req.query.page-1);
			}
		}
	}

	if(req.query.sort){
		var str_sort=req.query.sort;
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

	var lastPage=1;

	var foundLinks = Link.find(findoc,{_id:0,__v:0})
	.sort(sort);

	foundLinks.exec(function(err, links){
		if(count&&count>0){
			lastPage = Math.ceil(links.length/count);
		}
		foundLinks
		.skip(skip)
		.limit(count)
		.exec(function(err, links){
		res.json({links:links, lastPage:lastPage});
		});
	});
}