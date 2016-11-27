var User = require('../../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(){
	var newUser = new User();
	newUser.username = 'UserTest';
    newUser.password = createHash('89787hjvbb');
    newUser.email = 'user@test.com';
    newUser.save(function(err) {
            if (err) {
              throw err;
            }
        });
    var newUser2 = new User();
    newUser2.username = 'UserTest2';
    newUser2.password = createHash('89787hjvsfd');
    newUser2.email = 'user@test2.com';
    newUser2.save(function(err) {
            if (err) {
              throw err;
            }
        });
};

// Generates hash using bCrypt
var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};