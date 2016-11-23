var correctUsername = function(username){
  var regex=/^[A-Za-z0-9-_]{3,15}$/;
  return regex.test(username);
};

var correctNewUrlCode = function(code){
	var regex=/^[A-Za-z0-9-_]{1,15}$/;
  	return regex.test(code);
}

var correctUrl = function(url){
	var regex=/^(https?:\/\/)?([\w\?\=\-\.]+)\.([a-z]{2,6}\.?)(\/[\w\?\=\-\.]*)*\/?$/;
	return regex.test(url);
};

module.exports.correctUsername=correctUsername;
module.exports.correctUrl=correctUrl;
module.exports.correctNewUrlCode=correctNewUrlCode;