var express = require('express');
var router = express.Router();

var articleController = require('../controller/articleController');
/* GET users listing. */
router.get('/', articleController.readarticle);

module.exports = router;
