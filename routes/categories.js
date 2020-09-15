var express = require('express');
var router = express.Router();
let categorycontroller = require('../controllers/categories')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/deleteCategory',categorycontroller.deleteCategory)

module.exports = router;
