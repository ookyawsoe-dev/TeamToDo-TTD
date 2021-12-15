var express = require('express');
var router = express.Router();
var articleController = require('../controller/articleController')
var userController = require('../controller/userController')
var auth = require('../Middleware/checkAuth')
/* GET home page. */

router.get('/', auth, articleController.readarticle );

router.get('/login', userController.login);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;
