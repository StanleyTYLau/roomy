
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('requestors', function(table){
      table.dropColumn('accepted');
    }).then(data => {
      return knex.schema.table('requestors', table => {
        table.boolean('accepted');
      })
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('requestors', function(table){
      table.dropColumn('accepted');
    }).then(data => {
      return knex.schema.table('requestors', table => {
        table.string('accepted');
      })
    })

  ])
};