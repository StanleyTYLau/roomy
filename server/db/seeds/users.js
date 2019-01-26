
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: 'Alex', last_name: 'Peterson', email: 'alex@email.com', password: 'password1', gender: 'male', smoker: false, pets: false, cleanliness: 'High'},
        {first_name: 'Peter', last_name: 'Parker', email: 'peter@email.com', password: 'password2', gender: 'male', smoker: true, pets: false, cleanliness: 'Media'},
        {first_name: 'Math', last_name: 'Murdock', email: 'math@email.com', password: 'password3', gender: 'male', smoker: true, pets: true, cleanliness: 'Low'},
        {first_name: 'Mary-Jane', last_name: 'Whatson', email: 'math@email.com', password: 'password4', gender: 'female', smoker: false, pets: false, cleanliness: 'Low'}
      ]);
    });
};
