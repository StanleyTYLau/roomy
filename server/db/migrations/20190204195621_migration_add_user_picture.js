
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.string('picture_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
      t.dropColumn('picture_url');
  });
};

