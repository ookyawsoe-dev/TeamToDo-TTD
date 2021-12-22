var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

router.get('/register', userController.register);
router.post('/register', userController.register);
router.get('/user', userController.user);
router.get('/user/delete/:id', userController.delete);
router.get('/user/edit/:id', userController.edit);
router.post('/user/edit/:id', userController.edit);


module.exports = router;


