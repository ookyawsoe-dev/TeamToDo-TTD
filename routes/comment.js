var express = require('express');
var router = express.Router();
var commentController = require('../controller/commentController');

router.post('/add/:id', commentController.addComment);
// router.get('/edit/:id', commentController.editComment);
router.get('/delete/:id', commentController.deleteComment);

module.exports = router;
