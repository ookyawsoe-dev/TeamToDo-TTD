var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

router.get('/register', userController.register);
router.post('/register', userController.register);
router.get('/', userController.user);
router.get('/delete/:id', userController.delete);
router.get('/edit/:id', userController.edit);
router.post('/edit/:id', userController.edit);


module.exports = router;


