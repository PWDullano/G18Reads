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
    res.render('authors/index', {authors:authors})
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
   Books().where('author_id', req.params.id).then(function(books){
    res.render('authors/show', {authors:authors, books:books})
    })
  })
});

router.get('/authors/:id/edit', function(req, res){
  Authors().where('id', req.params.id).first().then(function(authors){
    Books().where('author_id', req.params.id).then(function(books){
      res.render('authors/edit', {books: books, authors: authors})
    })
  })
})

router.post('/authors/:id', function(req, res, next) {
  var bookFields = {title: req.body.title}
  var fullName = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    author_url: req.body.author_url,
    bio: req.body.bio}
    Authors().where('id', req.params.id).update(fullName).then(function(authors){
      Books().where('author_id', req.params.id).update(bookFields).then(function(books){
      res.redirect('/authors')
    })
  });
});

router.post('/authors/:id/delete', function (req, res) {
  Authors().where('id', req.params.id).del().then(function(results){
    res.redirect('/authors');
  })
})


module.exports = router;
