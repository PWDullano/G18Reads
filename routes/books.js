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
  res.render('books/new')
});

router.post('/books', function(req, res, next) {
  Books().insert(req.body).then(function(results){
    res.redirect('/books')
  });
});

router.get('/:id', function(req, res, next) {
  Books().where('id', req.params.id).first().then(function(results){
    res.render('books/show', {books:results})
  })
});


module.exports = router;
