
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: 'Alex', last_name: 'Peterson', email: 'alex@email.com', password: 'password1'},
        {first_name: 'Peter', last_name: 'Parker', email: 'peter@email.com', password: 'password2'},
        {first_name: 'Math', last_name: 'Murdock', email: 'marh@email.com', password: 'password3'}
      ]);
    });
};
