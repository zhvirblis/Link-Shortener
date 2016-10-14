var mongoose = require('mongoose');
module.exports = mongoose.model('Link',{
	newurl: String,
	origin: String,
	author: String,
	tags: [String],
	views: [Date]
});