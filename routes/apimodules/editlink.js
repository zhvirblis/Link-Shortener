var Link = require('../../models/link');
var regxp = require('../../regexps.js');

module.exports = function(req, res) {

  if (!req.isAuthenticated()) {
    return res.json({status: 'nonedit', message: 'User is not authorized'});
  }
  Link.findOne({
    author: req.user.username,
    newurl: req.params.id
  }, function(err, link) {
    if (err) {
      return res.json({status: 'err', message: err.message});
    }
    if (!link) {
      return res.json({
        status: 'nonedit',
        message: 'This user\'s Link not found'});
    }
    if (req.body.newurl) {
      link.newurl = req.body.newurl;
    }
    if (req.body.origin) {
      link.origin = req.body.origin;
    }
    if (req.body.tags && Array.isArray(req.body.tags)) {
      link.tags = req.body.tags;
    }
    link.save();
    return res.json({status: 'ok', message: 'Link updated'});
  });
};
