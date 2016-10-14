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
};

// Generates hash using bCrypt
var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};