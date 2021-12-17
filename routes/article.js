var express = require('express');
var router = express.Router();

var articleController = require('../controller/articleController');
/* GET users listing. */
router.get('/', articleController.showarticle);
router.get('/add', articleController.addarticle);
router.post('/add', articleController.addarticle);
router.get('/todo/:id', articleController.todo);
router.get('/process/:id', articleController.process);
router.get('/done/:id', articleController.done);
router.get('/delete/:id', articleController.delete);
router.get('/edit/:id', articleController.edit);
router.post('/edit/:id', articleController.edit);

module.exports = router;
