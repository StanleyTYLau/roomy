
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.string('type');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.dropColumn('type');
    });
};
