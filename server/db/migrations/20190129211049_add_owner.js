
exports.up = function(knex, Promise) {
    return knex.schema.table('places', function(t) {
        t.integer('user_id');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('places', function(t) {
        t.dropColumn('user_id');
    });
};
