var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

router.get('/register', userController.register);
router.post('/register', userController.register);
router.get('/user', userController.user);
router.get('/deleteuser/:id', userController.deleteuser);

module.exports = router;


