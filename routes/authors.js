var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var validate = require('../lib/authorValidations')

function Authors(){
  return knex('author');
}

function Books(){
  return knex('books');
}

function authorBook(){
  return knex('author_book');
};

/* GET home page. */
router.get('/authors', function(req, res, next) {
  Authors().select().then(function(authors){
    knex.from('books').innerJoin('author_book', 'books.id', 'author_book.book_id').then(function(joined){
      res.render('authors/index', {authors: authors, books: joined});
    })
  })
});

router.get('/authors/new', function(req, res, next) {
  res.render('authors/new')
});

router.post('/authors', function(req, res, next) {
  var authorFields = {first_name: req.body.first_name, last_name: req.body.last_name, bio: req.body.bio, author_url: req.body.author_url}
  var bookFields = {title: req.body.title}
  var errors = validate(req.body);
   if(errors.length){
   res.render('authors/new', {info: req.body, errors: errors});
   }else{
     Authors().insert(authorFields).returning('id').then(function(authors){
       var author_id = authors[0]
       Books().insert(bookFields).returning('id').then(function(books){
         var book_id = books[0]
         authorBook().insert({book_id: book_id, author_id: author_id}).then(function(joined){
           res.redirect('/authors');
         })
      })
    })
  }
})

router.get('/authors/:id', function(req, res, next) {
  Authors().where('id', req.params.id).first().then(function(authors){
    knex.from('books').innerJoin('author_book', 'books.id', 'author_book.book_id').then(function(joined){
      res.render('authors/show', {authors: authors, books: joined});
    })
  })
});

router.get('/authors/:id/edit', function(req, res){
  Authors().where('id', req.params.id).first().then(function(authors){
    knex.from('books').innerJoin('author_book', 'books.id', 'author_book.book_id').then(function(joined){
      res.render('authors/edit', {authors: authors, books: joined})
    })
  })
})

router.post('/authors/:id', function(req, res, next) {
  var authorFields = {first_name: req.body.first_name, last_name: req.body.last_name, bio: req.body.bio, author_url: req.body.author_url}
  var bookFields = {title: req.body.title}
  var errors = validate(req.body);
   if(errors.length){
   Authors().where('id', req.params.id).first().then(function (authors) {
   res.render('authors/edit', {authors:authors, errors: errors});
   })

   }else{
     Authors().where('id', req.params.id).first().update(authorFields).returning('id').then(function(authors){
       var author_id = authors[0]
       knex.from('books').innerJoin('author_book', 'books.id', 'author_book.book_id').then(function(authorJoined){
         Books().where('id', authorJoined.id).update(bookFields).returning('id').then(function(books){
           var book_id = books[0]
           authorBook().insert({book_id: book_id, author_id: author_id}).then(function(joined){
             res.redirect('/authors');
           })
         })
       })
    })
  };
});

router.get('/authors/:id/delete', function (req, res) {
  Authors().where('id', req.params.id).first().then(function(authors){
    knex.from('books').innerJoin('author_book', 'books.id', 'author_book.book_id').then(function(joined){
      res.render('authors/delete', {authors: authors, books: joined});
    })
  })
})

router.post('/authors/:id/delete', function (req, res) {
  Authors().where('id', req.params.id).del().then(function(results){
    res.redirect('/authors');
  })
})


module.exports = router;
