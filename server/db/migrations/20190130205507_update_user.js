
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.string('work_sched');
        t.string('go_out_freq');
        t.string('guest_freq');
        t.specificType('hobbies', 'text ARRAY');
        t.string('diet');
        t.string('personality');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('places', function(t) {
        t.dropColumn('work_sched');
        t.dropColumn('go_out_freq');
        t.dropColumn('quest_freq');
        t.dropColumn('hobbies');
        t.dropColumn('diet');
        t.dropColumn('personality');
    });
};
