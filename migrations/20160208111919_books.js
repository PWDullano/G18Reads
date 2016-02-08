
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
    table.increments();
    table.text('title');
    table.text('genre');
    table.text('description');
    table.text('url');
    table.text('fname_1');
    table.text('lname_1');
    table.text('bio_1');
    table.text('url_1');
    table.text('fname_2');
    table.text('lname_2');
    table.text('bio_2');
    table.text('url_2');
    table.text('fname_3');
    table.text('lname_3');
    table.text('bio_3');
    table.text('url_3');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
