var express = require('express'),
router = express.Router(),
addlink = require('../routes/apimodules/addlink'),
getlink = require('../routes/apimodules/getlink'),
getlist = require('../routes/apimodules/getlist'),
dellink = require('../routes/apimodules/dellink'),
editlink = require('../routes/apimodules/editlink');

router.post('/link',addlink)
.get('/linklist',getlist)
.get('/link/:id',getlink)
.put('/link/:id',editlink)
.delete('/link/:id',dellink);

module.exports = router;