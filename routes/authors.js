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
  var errors = validate(req.body);
   if(errors.length){
   res.render('authors/new', {info: req.body, errors: errors});
   }else{
     Authors().insert(req.body).then(function(result){
       res.redirect('/authors');
  })
 }
})

router.get('/authors/:id', function(req, res, next) {
  Authors().where('id', req.params.id).first().then(function(authors){
    knex.from('books').innerJoin('author_book', 'books.id', 'author_book.book_id').then(function(joined){
      res.render('authors/show', {authors: authors, books: joined});
      console.log(joined);
    })
  })
});

router.get('/authors/:id/edit', function(req, res){
  Authors().where('id', req.params.id).first().then(function(authors){
    res.render('authors/edit', {books: books, authors: authors})
  })
})

router.post('/authors/:id', function(req, res, next) {
  var errors = validate(req.body);
   if(errors.length){
   Authors().where('id', req.params.id).first().then(function (authors) {
   res.render('authors/edit', {authors:authors, errors: errors});
   })

   }else{
     Authors().where('id', req.params.id).update(req.body).then(function(result){
       res.redirect('/authors');
   })
  };
});

router.post('/authors/:id/delete', function (req, res) {
  Authors().where('id', req.params.id).del().then(function(results){
    res.redirect('/authors');
  })
})


module.exports = router;
