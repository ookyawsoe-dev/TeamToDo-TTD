var express = require('express');
var router = express.Router();
<<<<<<< Updated upstream


=======
 var articleController = require('../controller/articleController');
/* GET users listing. */
router.get('/', articleController.readarticle);
>>>>>>> Stashed changes

module.exports = router;
