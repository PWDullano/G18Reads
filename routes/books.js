var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Books(){
return knex('books');
};

function Authors(){
  return knex('author');
}


/* GET home page. */
router.get('/books', function(req, res, next) {
  Books().select().then(function(books){
    res.render('books/index', {books:books})
  })
});

router.get('/books/new', function(req, res, next) {
  res.render('books/new')
});

router.post('/books', function(req, res, next) {
  var bookFields = {title: req.body.title, genre: req.body.genre, description: req.body.description, url: req.body.url}
  var fullName = {first_name: req.body.first_name, last_name: req.body.last_name}
  Books().insert(bookFields).then(function(books){
    Authors().insert(fullName).then(function(authors){
      res.redirect('/books')
    })
  });
});

router.get('/books/:id', function(req, res, next) {
  Books().where('id', req.params.id).first().then(function(books){
    Authors().where('book_id', req.params.id).then(function(authors){
    res.render('books/show', {books:books})
    })
  })
});

router.get('/books/:id/edit', function(req, res){
  Books().where('id', req.params.id).first().then(function(books){
    Authors().where('book_id', req.params.id).then(function(authors){
      res.render('books/edit', {books: books, authors: authors})
    })
  })
})

router.post('/books/:id', function(req, res, next) {
  var bookFields = {title: req.body.title, genre: req.body.genre, description: req.body.description, url: req.body.url}
  var fullName = {first_name: req.body.first_name, last_name: req.body.last_name, book_id: req.params.id}
  Books().where('id', req.params.id).update(bookFields).then(function(books){
    Authors().where('book_id', req.params.id).update(fullName).then(function(authors){
      res.redirect('/books')
    })
  });
});

router.post('/books/:id/delete', function (req, res) {
  Books().where('id', req.params.id).del().then(function (result) {
    Authors().where('book_id', req.params.id).del().then(function(results){
      res.redirect('/books');
    })
  })
})

module.exports = router;
