
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shows', function(table){
    table.increments();
    table.string('name');
    table.string('channel');
    table.string('genre');
    table.integer('rating');
    table.boolean('explicit');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shows');
};
