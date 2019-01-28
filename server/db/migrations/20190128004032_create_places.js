
exports.up = function(knex, Promise) {
    return knex.schema.createTable('places', function (table) {
        table.increments().primary();
        table.string('postal_code');
        table.integer('street_number');
        table.string('street_name');
        table.string('unit_number');
        table.string('province');
        table.string('city');
        table.decimal('price');
        table.enum('type', ['appartment_building', 'condo', 'private_house']).notNull();
        table.integer('number_of_bathrooms');
  
      });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('places');
};