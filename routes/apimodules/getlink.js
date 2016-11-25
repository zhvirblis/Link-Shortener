var Link = require('../../models/link');
var regxp = require('../../regexps.js');

module.exports = function(req, res) {
  Link.findOne({newurl: req.params.id}, function(err, link) {
    if (err) {
      return res.json({status: 'err', message: err.message});
    }
    if (!link) {
      return res.json({status: 'nonget', message: 'Link not found'});
    }
    if (req.isAuthenticated()) {
      return res.json({
        status: 'ok',
        newurl: link.newurl,
        origin: link.origin,
        author: link.author,
        tags: link.tags,
        views: link.views
      });
    } else {
      return res.json({status: 'ok',
        newurl: link.newurl,
        origin: link.origin,
        author: link.author,
        tags: link.tags
      });
    }
  });
};
