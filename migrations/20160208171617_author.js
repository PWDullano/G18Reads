
exports.up = function(knex, Promise) {
  return knex.schema.createTable('author', function(table){
    table.increments();
    table.text('first_name');
    table.text('last_name');
    table.text('bio');
    table.text('author_url');
    table.integer('book_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('author');
};
