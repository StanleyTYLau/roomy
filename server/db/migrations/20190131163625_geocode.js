
exports.up = function(knex, Promise) {
  return knex.schema.table('places', function(t) {
    t.decimal('lat', 10, 7);
    t.decimal('lng', 10, 7);
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('places', function(t){
        t.dropColumn('lat');
        t.dropColumn('lng');
    });
};
