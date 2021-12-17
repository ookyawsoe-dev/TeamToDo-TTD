var express = require('express');
var router = express.Router();
var commentController = require('../controller/commentController');

router.post('/comment/add/:id', commentController.add);

module.exports = router;
