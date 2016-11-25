var express = require('express');
var Link = require('../models/link');
router = express.Router();

router.get('/:id', function(req, res) {

  Link.findOne({newurl: req.params.id}, function(err, link) {
    if (err) {
      return res.send('Error:' + err.message);
    }
    if (!link) {
      res.status(404);
      return res.send('Error 404 Link not found');
    }
    link.views.push(new Date());
    link.save();
    return res.redirect(302, link.origin);
  });
});
module.exports = router;
