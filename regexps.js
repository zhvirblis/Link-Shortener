var correctUsername = function(username){
  var regex=/^[A-Za-z0-9]{3,15}$/;
  return regex.test(username);
};

module.exports.correctUsername=correctUsername;