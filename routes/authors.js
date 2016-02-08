var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/authors', function(req, res, next) {
  res.render('authors/index');
});

module.exports = router;
