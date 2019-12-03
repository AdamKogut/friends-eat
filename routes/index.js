var express = require('express');
var router = express.Router();
var auth=require('./auth');
var feedback=require('./feedback');

router.use('/auth',auth);
router.use('/feedback', feedback);

module.exports = router;
