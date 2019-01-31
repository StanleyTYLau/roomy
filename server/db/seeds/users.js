exports.seed = async function(knex, Promise) {
  function deleteUsers() {
    return knex('users').del()
  }

  function deletePlaces() {
    return knex('places').del()
  }

  function insertUsers() {
    return knex('users').insert([
      {first_name: 'Alex', last_name: 'Peterson', email: 'alex@email.com', password: 'password1', gender: 'male', smoker: false, pets: false, cleanliness: 'High', type: 'roomy'},
      {first_name: 'Peter', last_name: 'Parker', email: 'peter@email.com', password: 'password2', gender: 'male', smoker: true, pets: false, cleanliness: 'Moderate', type: 'roomy'},
      {first_name: 'Math', last_name: 'Murdock', email: 'math@email.com', password: 'password3', gender: 'male', smoker: true, pets: true, cleanliness: 'Low', type: 'roomy'},
      {first_name: 'Mary-Jane', last_name: 'Whatson', email: 'mary-jane@email.com', password: 'password4', gender: 'female', smoker: false, pets: false, cleanliness: 'Low', type: 'roomy'}
    ]).returning('*');
  }

  function insertPlaces(users) {
    return knex('places').insert([
      {user_id: users[0].id , postal_code: 'M4S 2H4', street_number: 45, street_name: 'Dunfield Avenue', city: 'Toronto', price: 1200.00, type_of_building: 'condo', number_of_bathrooms: 2 },
      {user_id: users[0].id , postal_code: 'M1P 2B7', street_number: 1159, street_name: 'Birchmount Rd', city: 'Toronto', price: 595.00, type_of_building: 'appartment_building', number_of_bathrooms: 1 },
      {user_id: users[0].id , postal_code: 'M5V 3Z1', street_number: 25, street_name: 'Telegram Mews', city: 'Toronto', price: 3000.00, type_of_building: 'condo', number_of_bathrooms: 3 }
    ]);
  }

  //Delete existing data
  await deletePlaces()
    .then(deleteUsers)

  const users = await insertUsers();
  const places = await insertPlaces(users);
}
