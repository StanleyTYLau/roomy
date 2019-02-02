exports.up = function(knex, Promise) {
  return knex.schema.createTable('requestors', function (table) {
      table.increments().primary();
      table.string('accepted');
      table.integer('placeid').references('id').inTable('places');
      table.integer('userid').references('id').inTable('users');

    });
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('requestors');
};