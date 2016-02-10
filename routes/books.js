var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var validate = require('../lib/validations')

function Books(){
return knex('books');
};

function Authors(){
  return knex('author');
};

function authorBook(){
  return knex('author_book');
};

/* GET home page. */
router.get('/books', function(req, res, next) {
  Books().select().then(function(books){
    knex.from('author').innerJoin('author_book', 'author.id', 'author_book.author_id').then(function(joined){
      res.render('books/index', {books: books, authors: joined});
    })
  })
});

router.get('/books/new', function(req, res, next) {
  res.render('books/new')
});

router.post('/books', function(req, res, next) {
  var bookFields = {title: req.body.title, genre: req.body.genre, description: req.body.description, url: req.body.url}
  var authorFields = {first_name: req.body.first_name, last_name: req.body.last_name}
  var errors = validate(req.body);
   if(errors.length){
   res.render('books/new', {info: req.body, errors: errors});
   }else{
     Books().insert(bookFields).returning('id').then(function(books){
       var book_id = books[0]
       Authors().insert(authorFields).returning('id').then(function(authors){
         var author_id = authors[0]
         authorBook().insert({book_id: book_id, author_id: author_id}).then(function(joined){
           res.redirect('/books');
         })
       })
     })
   }
})

router.get('/books/:id', function(req, res, next) {
  Books().where('id', req.params.id).first().then(function(books){
    knex.from('author').innerJoin('author_book', 'author.id', 'author_book.author_id').then(function(joined){
      res.render('books/show', {books: books, authors: joined});
    })
  })
});


router.get('/books/:id/edit', function(req, res){
  Books().where('id', req.params.id).first().then(function(books){
    knex.from('author').innerJoin('author_book', 'author.id', 'author_book.author_id').then(function(joined){
      res.render('books/edit', {books: books, authors: joined})
      console.log(joined);
    })
  })
})

router.post('/books/:id', function(req, res, next) {
  var errors = validate(req.body);
  var bookFields = {title: req.body.title, genre: req.body.genre, description: req.body.description, url: req.body.url}
  var authorFields = {first_name: req.body.first_name, last_name: req.body.last_name}
   if(errors.length){
   Books().where('id', req.params.id).first().then(function (books) {
   res.render('books/edit', {books:books, errors: errors});
   })

   }else{
     Books().where('id', req.params.id).first().update(bookFields).returning('id').then(function(books){
       var book_id = books[0]
       knex.from('author').innerJoin('author_book', 'author.id', 'author_book.author_id').then(function(joined){
       Authors().where('id', joined.author_id).update(authorFields).returning('id').then(function(authors){
         var author_id = authors[0]
         authorBook().insert({book_id: book_id, author_id: author_id}).then(function(joined){
           res.redirect('/books');
         })
         })
       })
     })
   };
});

router.get('/books/:id/delete', function(req, res, next) {
  Books().where('id', req.params.id).first().then(function(books){
    knex.from('author').innerJoin('author_book', 'author.id', 'author_book.author_id').then(function(joined){
      res.render('books/delete', {books: books, authors: joined});
    })
  })
});

router.post('/books/:id/delete', function (req, res) {
  Books().where('id', req.params.id).del().then(function (result) {
    res.redirect('/books');
  })
})

module.exports = router;
