
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
    table.increments();
    table.text('title');
    table.text('genre');
    table.text('description');
    table.text('url');
    table.integer('author_id');
    table.integer('author2_id');
    table.integer('author3_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
