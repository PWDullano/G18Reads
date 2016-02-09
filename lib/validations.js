function titleIsNotEmpty(input){
  return !input.trim() ? 'Title cannot be Empty' : true;
}
function genreIsNotEmpty(input){
  return !input.trim() ? 'Genre cannot be Empty' : true;
}
function descriptionIsNotEmpty(input){
  return !input.trim() ? 'Description cannot be Empty' : true;
}
function urlIsNotEmpty(input){
  return !input.trim() ? 'Book picture URL cannot be Empty' : true;
}


module.exports = function(input){
  var errors = [];
  errors.push(titleIsNotEmpty(input.title))
  errors.push(genreIsNotEmpty(input.genre))
  errors.push(descriptionIsNotEmpty(input.description))
  errors.push(urlIsNotEmpty(input.url))

  return errors.filter(function(error){
    return error !== true;
  })
}
