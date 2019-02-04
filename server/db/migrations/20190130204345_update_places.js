exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('places', function(table){
        table.dropColumn('province');
        table.dropColumn('type');
      }).then(data => {
        return knex.schema.table('places', table => {
          table.string('neighbourhood');
          table.string('type_of_building');
          table.string('description');
          table.boolean('laundry');
          table.boolean('furnished');
          table.boolean('air_condition');
          table.boolean('parking');
          table.string('picture_url');
        })
      })

    ])
  };

  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('places', function(table){
        table.dropColumn('neighbourhood');
        table.dropColumn('type_of_building');
        table.dropColumn('description');
        table.dropColumn('laundry');
        table.dropColumn('furnished');
        table.dropColumn('air_condition');
        table.dropColumn('parking');
        table.dropColumn('picture_url');
      }).then(data => {
        return knex.schema.table('clients', table => {
          table.string('province');
          table.enum('type')
        })
      })

    ])
  };