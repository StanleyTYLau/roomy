
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.string('gender');
    t.boolean('smoker');
    t.boolean('pets');
    t.string('cleanliness');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
      t.dropColumn('gender');
      t.dropColumn('smoker');
      t.dropColumn('pets');
      t.dropColumn('cleanliness');
  });
};
