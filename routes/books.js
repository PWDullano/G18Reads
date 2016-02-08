var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Books(){
return knex('books');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  Books().then(function(results){
    res.render('books/index', {books:results})
  })
});

router.get('/new', function(req, res, next) {
  Books().then(function(results){
    res.render('books/new')
  })
});

module.exports = router;
