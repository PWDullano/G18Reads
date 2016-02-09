function firstNameIsNotEmpty(input){
  return !input.trim() ? 'First Name cannot be Empty' : true;
}
function lastNameIsNotEmpty(input){
  return !input.trim() ? 'Last Name cannot be Empty' : true;
}
function bioIsNotEmpty(input){
  return !input.trim() ? 'Biography cannot be Empty' : true;
}
function authorUrlIsNotEmpty(input){
  return !input.trim() ? 'Author picture URL cannot be Empty' : true;
}


module.exports = function(input){
  var errors = [];
  errors.push(firstNameIsNotEmpty(input.first_name))
  errors.push(lastNameIsNotEmpty(input.last_name))
  errors.push(bioIsNotEmpty(input.bio))
  errors.push(authorUrlIsNotEmpty(input.author_url))

  return errors.filter(function(error){
    return error !== true;
  })
}
