var express = require('express');
var router = express.Router();

var articleController = require('../controller/articleController');
/* GET users listing. */
router.get('/article', articleController.readarticle);
router.get('/addarticle', articleController.addarticle);
router.post('/addarticle', articleController.addarticle);
router.get('/deletearticle/:id', articleController.deletearticle);
router.post('/deletearticle/:id', articleController.deletearticle)


module.exports = router;
