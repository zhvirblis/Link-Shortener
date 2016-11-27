var Link = require('../../models/link');
var regxp = require('../../regexps.js');

module.exports = function(req, res) {
  if (req.isAuthenticated()) {
    if (!req.body.newurl) {
      return res.json({status: 'nonadd', message: 'Empty new url'});
    }
    if (!req.body.origin) {
      return res.json({status: 'nonadd', message: 'Empty origin url'});
    }
    if (!regxp.correctNewUrlCode(req.body.newurl)) {
      return res.json({status: 'nonadd', message: 'Incorrect new url'});
    }
    if (!regxp.correctUrl(req.body.origin)) {
      return res.json({status: 'nonadd', message: 'Incorrect origin url'});
    }
    Link.findOne({newurl: req.body.newurl}, function(err, link) {
      if (err) {
        return res.json({status: 'err', message: err.message});
      }

      if (link) {
        return res.json({status: 'nonadd', message: 'Link already exist'});
      }

      var newLink = new Link();
      newLink.newurl = req.body.newurl;
      newLink.origin = req.body.origin;
      newLink.author = req.user.username;

      if (req.body.tags) {
        if (Array.isArray(req.body.tags)) {
          newLink.tags = req.body.tags;
        }
      }

      newLink.save(function(err) {
        if (err) {
          return res.json({status: 'err', message: err.message});
        }
        return res.json({status: 'ok', newurl: newLink.newurl, origin: newLink.origin, tags: newLink.tags});
      });
    });

  } else {
    return res.json({status: 'nonadd', message: 'User is not authorized'});
  }
};
