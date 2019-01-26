exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
      table.increments().primary();
      table.string('first_name');
      table.string('last_name');
      table.string('email').notNull();
      table.string('password').notNull();

    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
  };
  