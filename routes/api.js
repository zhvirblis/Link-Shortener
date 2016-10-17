var express = require('express');
var router = express.Router();
var addlink = require('../routes/apimodules/addlink');
var dellink = require('../routes/apimodules/dellink');

router.post('/link',addlink);

router.del('/link:id',dellink);

module.exports = router;