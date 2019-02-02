exports.seed = async function(knex, Promise) {
  function deleteUsers() {
    return knex('users').del()
  }

  function deletePlaces() {
    return knex('places').del()
  }

  function deleteRequestors() {
    return knex('requestors').del()
  }

  function insertUsers() {
    return knex('users').insert([
      {first_name: 'Alex', last_name: 'Peterson', email: 'alex@email.com', password: 'test', gender: 'male', smoker: false, pets: false, cleanliness: 'High', type: 'roomy', work_sched: 'Days', go_out_freq: 'high', guest_freq: 'high', hobbies: ['A', 'B'], diet: 'Vegan', personality: 'Introvert'},
      {first_name: 'Peter', last_name: 'Parker', email: 'peter@email.com', password: 'test', gender: 'male', smoker: true, pets: false, cleanliness: 'Moderate', type: 'roomy', work_sched: 'Nights', go_out_freq: 'moderate', guest_freq: 'moderate', hobbies: ['B'], diet: 'Vegeterian', personality: 'Extrovert'},
      {first_name: 'Math', last_name: 'Murdock', email: 'math@email.com', password: 'test', gender: 'male', smoker: true, pets: true, cleanliness: 'Low', type: 'roomy', work_sched: 'Days', go_out_freq: 'high', guest_freq: 'moderate', hobbies: ['A', 'B'], diet: 'Vegan', personality: 'Extrovert'},
      {first_name: 'Mary-Jane', last_name: 'Whatson', email: 'mary-jane@email.com', password: 'test', gender: 'female', smoker: false, pets: false, cleanliness: 'Low', type: 'roomy', work_sched: 'Various', go_out_freq: 'moderate', hobbies: ['A'], guest_freq: 'high' , diet: 'Lactose free', personality: 'Introvert'},
      {first_name: 'Eugenia', last_name: 'Dach', email: 'mary-jane@email.com', password: 'test', gender: 'female', smoker: false, pets: false, cleanliness: 'Low', type: 'roomy', work_sched: 'Nights', go_out_freq: 'moderate', guest_freq: 'high', hobbies: ['A', 'B'], diet: 'Gluten free', personality: 'Extrovert'},
      {first_name: 'Dawson', last_name: 'Dibbert', email: 'dawson@email.com', password: 'test', gender: 'male', smoker: false, pets: false, cleanliness: 'Low', type: 'roomy', work_sched: 'Days', go_out_freq: 'moderate', guest_freq: 'high', hobbies: ['B'], diet: 'Lactose free', personality: 'Extrovert'},
      {first_name: 'Tomas', last_name: 'Yost', email: 'tomas@email.com', password: 'test', gender: 'male', smoker: false, pets: false, cleanliness: 'Moderate', type: 'roomy', work_sched: 'Days', go_out_freq: 'high', guest_freq: 'high', hobbies: ['A', 'B'], diet: 'Vegan', personality: 'Introvert'},
      {first_name: 'Dahlia', last_name: 'Kling', email: 'dahlia@email.com', password: 'test', gender: 'female', smoker: true, pets: false, cleanliness: 'Low', type: 'roomy', work_sched: 'Various', go_out_freq: 'high', guest_freq: 'high', hobbies: ['A', 'B'], diet: 'Vegeterian', personality: 'Extrovert'},
      {first_name: 'Harry', last_name: 'Sanford', email: 'harry@email.com', password: 'test', gender: 'male', smoker: false, pets: false, cleanliness: 'Low', type: 'roomy', work_sched: 'Days', go_out_freq: 'high', guest_freq: 'high', hobbies: ['B'], diet: 'Vegan', personality: 'Introvert'},
      {first_name: 'Rick', last_name: 'Wilkinson', email: 'rick@email.com', password: 'test', gender: 'male', smoker: false, pets: true, cleanliness: 'Moderate', type: 'roomy', work_sched: 'Nights', go_out_freq: 'high', guest_freq: 'high', hobbies: ['A'], diet: 'Lactose free', personality: 'Introvert'},
      {first_name: 'Erna', last_name: 'Thompson', email: 'erna@email.com', password: 'test', gender: 'female', smoker: false, pets: false, cleanliness: 'Low', type: 'roomy', work_sched: 'Various', go_out_freq: 'high', guest_freq: 'high', hobbies: ['B'], diet: 'Lactose free', personality: 'Extrovert'},
      {first_name: 'Elenor', last_name: 'Olson', email: 'elenor@email.com', password: 'test', gender: 'female', smoker: true, pets: false, cleanliness: 'High', type: 'roomy', work_sched: 'Days', go_out_freq: 'high', guest_freq: 'moderate', hobbies: ['B'], diet: 'Gluten free', personality: 'Introvert'},
      {first_name: 'Magdalen', last_name: 'OHara', email: 'magdalen@email.com', password: 'test', gender: 'female', smoker: false, pets: false, cleanliness: 'High', type: 'roomy', work_sched: 'Days', go_out_freq: 'moderate', guest_freq: 'high', hobbies: ['B'], diet: 'Vegeterian', personality: 'Introvert'},
      {first_name: 'Elnora', last_name: 'Bernier', email: 'elnora@email.com', password: 'test', gender: 'female', smoker: false, pets: true, cleanliness: 'Low', type: 'roomy', work_sched: 'Various', go_out_freq: 'high', guest_freq: 'high', hobbies: ['A', 'B'], diet: 'Lactose free', personality: 'Introvert'},
      {first_name: 'Carl', last_name: 'Markowitz', email: 'carl@email.com', password: 'test', gender: 'male', smoker: true, pets: false, cleanliness: 'Moderate', type: 'roomy', work_sched: 'Days', go_out_freq: 'moderate', guest_freq: 'high', hobbies: ['A'], diet: 'Gluten free', personality: 'Extrovert'}
    ]).returning('*');
  }

  function insertPlaces(users) {
    return knex('places').insert([
      {user_id: users[0].id , postal_code: 'M4S 2H4', street_number: 45, street_name: 'Dunfield Avenue', unit_number: 11, city: 'Toronto', price: 1200.00, type_of_building: 'condo', description: 'Available immediately. Bright & spacious 9 foot ceilings, open concept layout', number_of_bathrooms: 2, laundry: true, furnished: true, air_condition: true, parking: true, picture_url: '', lat: 43.706198, lng: -79.394332 },
      {user_id: users[0].id , postal_code: 'M1P 2B7', street_number: 1159, street_name: 'Birchmount Rd', unit_number: 21, city: 'Toronto', price: 595.00, type_of_building: 'appartment', description: 'Nice cozy rooms available for rent.', number_of_bathrooms: 1, laundry: false, furnished: false, air_condition: false, parking: false, picture_url: '', lat: 43.741207, lng: -79.281756 },
      {user_id: users[0].id , postal_code: 'M5V 3Z1', street_number: 25, street_name: 'Telegram Mews', unit_number: 1, city: 'Toronto', price: 1000.00, type_of_building: 'condo', description: 'Move in now! Clean and nice appartment', number_of_bathrooms: 3, laundry: true, furnished: false, air_condition: true, parking: true, picture_url: '', lat: 43.640995, lng: -79.39457 },
      {user_id: users[0].id , postal_code: 'M6L 1B5', street_number: 1442, street_name: 'Lawrence Ave W ', unit_number: 23, city: 'Toronto', price: 1200.00, type_of_building: 'condo', description: 'Search no more! this is home sweet home...', number_of_bathrooms: 2, laundry: true, furnished: true, air_condition: true, parking: true, picture_url: '', lat: 43.708954, lng: -79.480525 },
      {user_id: users[0].id , postal_code: 'M6B 2G8', street_number: 100, street_name: 'Lotherton Ptway ', unit_number: 211, city: 'Toronto', price: 800.00, type_of_building: 'appartment', description: 'Close to TTC, gym and lots of amenities...', number_of_bathrooms: 1, laundry: true, furnished: false, air_condition: false, parking: true, picture_url: '', lat: 43.705604, lng: -79.467492 },
      {user_id: users[0].id , postal_code: 'M6B 3S7', street_number: 2925, street_name: 'Dufferin St', unit_number: 113, city: 'Toronto', price: 600.00, type_of_building: 'House', description: 'Bright & spacious 9 foot ceilings, open concept layout', number_of_bathrooms: 2, laundry: false, furnished: false, air_condition: false, parking: false, picture_url: '', lat: 43.709003, lng: -79.453307 },
      {user_id: users[0].id , postal_code: 'M1W 3E6', street_number: 2350, street_name: 'Bridletowne Cir', unit_number: 110, city: 'Toronto', price: 700.00, type_of_building: 'House', description: 'Newly renovated, bright and clean, one bedroom apartment', number_of_bathrooms: 2, laundry: true, furnished: false, air_condition: false, parking: false, picture_url: '', lat: 43.80069, lng: -79.317045 },
      {user_id: users[0].id , postal_code: 'M1V 2Z5', street_number: 110, street_name: 'Canongate Trail', unit_number: 221, city: 'Toronto', price: 600.00, type_of_building: 'condo', description: 'ROOM FOR RENT', number_of_bathrooms: 2, laundry: false, furnished: false, air_condition: false, parking: false, picture_url: '', lat: 43.820942, lng: -79.309229 },
      {user_id: users[0].id , postal_code: 'M3N 2W4', street_number: 4750, street_name: 'Jane St', unit_number: 301, city: 'Toronto', price: 750.00, type_of_building: 'condo', description: 'Please call for availability!', number_of_bathrooms: 3, laundry: true, furnished: false, air_condition: false, parking: false, picture_url: '', lat: 43.770569, lng: -79.521409 },
      {user_id: users[0].id , postal_code: 'M3J 3S1', street_number: 615, street_name: 'Sentinel Rd', unit_number: 141, city: 'Toronto', price: 800.00, type_of_building: 'House', description: 'Furnished one bedroom apartment with a balcony', number_of_bathrooms: 2, laundry: true, furnished: true, air_condition: false, parking: true, picture_url: '', lat: 43.766735, lng: -79.500741 },
      {user_id: users[0].id , postal_code: 'M4K 1V3', street_number: 33, street_name: 'Eastmount Ave', unit_number: 112, city: 'Toronto', price: 950.00, type_of_building: 'House', description: 'Clean, cozy and nice appartment', number_of_bathrooms: 2, laundry: true, furnished: false, air_condition: true, parking: true, picture_url: '', lat: 43.679004, lng: -79.361289 },
      {user_id: users[0].id , postal_code: 'M4G 3C4', street_number: 1710, street_name: 'Bayview Ave', unit_number: 131, city: 'Toronto', price: 900.00, type_of_building: 'condo', description: 'Quiet neighbourhood and close to TTC', number_of_bathrooms: 2, laundry: true, furnished: true, air_condition: false, parking: true, picture_url: '', lat: 43.709183, lng: -79.376786 },
      {user_id: users[0].id , postal_code: 'M4S 1X7', street_number: 703, street_name: 'Soudan Ave', unit_number: 411, city: 'Toronto', price: 700.00, type_of_building: 'House', description: 'Large, bright, spacious, junior one bedroom apartments', number_of_bathrooms: 2, laundry: true, furnished: false, air_condition: false, parking: false, picture_url: '', lat: 43.708431, lng: -79.376791 },
      {user_id: users[0].id , postal_code: 'M4C 1N4', street_number: 373, street_name: 'Strathmore Blvd', unit_number: 911, city: 'Toronto', price: 850.00, type_of_building: 'appartment', description: 'Location, Location, Location - The best of Toronto at your doorstep!', number_of_bathrooms: 2, laundry: true, furnished: true, air_condition: false, parking: true, picture_url: '', lat: 43.684383, lng: -79.32205 },
      {user_id: users[0].id , postal_code: 'M4J 1T6', street_number: 52, street_name: 'Milverton Blvd', unit_number: 4, city: 'Toronto', price: 700.00, type_of_building: 'House', description: 'A Dream Home for a Young Professional!!', number_of_bathrooms: 2, laundry: true, furnished: false, air_condition: false, parking: false, picture_url: '', lat: 43.683783, lng: -79.339237 },
      {user_id: users[0].id , postal_code: 'M4J 0A3', street_number: 280, street_name: 'Donlands Ave', unit_number: 98, city: 'Toronto', price: 800.00, type_of_building: 'condo', description: 'Minutes from downtown, fantastic views of downtown and acros ..', number_of_bathrooms: 1, laundry: true, furnished: false, air_condition: false, parking: false, picture_url: '', lat: 43.690519, lng: -79.341707 },
      {user_id: users[0].id , postal_code: 'M4J 3A7', street_number: 56, street_name: 'Woodycrest Ave', unit_number: 45, city: 'Toronto', price: 750.00, type_of_building: 'appartment', description: 'Live# On# The# Grid#! Never Be Far Away From Anything Ever ', number_of_bathrooms: 2, laundry: true, furnished: true, air_condition: false, parking: true, picture_url: '', lat: 43.681845, lng: -79.342967 },
      {user_id: users[0].id , postal_code: 'M9A 2C4', street_number: 11, street_name: 'Bournemouth Rd', unit_number: 81, city: 'Toronto', price: 700.00, type_of_building: 'condo', description: 'Call for appointment...', number_of_bathrooms: 1, laundry: true, furnished: false, air_condition: false, parking: false, picture_url: '', lat: 43.675913, lng: -79.546205 },
      {user_id: users[0].id , postal_code: 'M8W 2P9', street_number: 286, street_name: 'Lanor Ave', unit_number: 78, city: 'Toronto', price: 600.00, type_of_building: 'House', description: 'Charming, large 1 bedroom + den in a newly renovated house', number_of_bathrooms: 2, laundry: false, furnished: true, air_condition: false, parking: false, picture_url: '', lat: 43.611854, lng: -79.533375 },
      {user_id: users[0].id , postal_code: 'M8W 1Z1', street_number: 117, street_name: 'Burlingame Rd', unit_number: 71, city: 'Toronto', price: 800.00, type_of_building: 'condo', description: 'NEWLY RENOVATED! Freshly painted throughoutBrand NEW!', number_of_bathrooms: 1, laundry: false, furnished: true, air_condition: false, parking: true, picture_url: '', lat: 43.599838, lng: -79.55289 },
      {user_id: users[0].id , postal_code: 'M9B 6K4', street_number: 101, street_name: 'Subway Cres', unit_number: 32, city: 'Toronto', price: 750.00, type_of_building: 'condo', description: 'Bright, spacious bachelor apartment', number_of_bathrooms: 1, laundry: false, furnished: true, air_condition: false, parking: false, picture_url: '', lat: 43.634799, lng: -79.53947 },
      {user_id: users[0].id , postal_code: 'M8V 3W1', street_number: 75, street_name: 'Burlington St', unit_number: 9, city: 'Toronto', price: 850.00, type_of_building: 'House', description: 'Fully renovated one bedroom units with stainless steel appliances', number_of_bathrooms: 2, laundry: true, furnished: true, air_condition: true, parking: true, picture_url: '', lat: 43.619211, lng: -79.490992 },
      {user_id: users[0].id , postal_code: 'M3N 2H8', street_number: 2801, street_name: 'Jane St', unit_number: 7, city: 'Toronto', price: 600.00, type_of_building: 'condo', description: 'Studio Apartment for March 1st, 2019', number_of_bathrooms: 1, laundry: false, furnished: true, air_condition: false, parking: false, picture_url: '', lat: 43.750125, lng: -79.515677 },
      {user_id: users[0].id , postal_code: 'M5A 3W1', street_number: 280, street_name: 'Dundas St E', unit_number: 1108, city: 'Toronto', price: 900.00, type_of_building: 'appartment', description: 'Available immediately... please call for appointment', number_of_bathrooms: 1, laundry: true, furnished: false, air_condition: true, parking: true, picture_url: '', lat: 43.658481, lng: -79.371926 },
      {user_id: users[0].id , postal_code: 'M6P 2V2', street_number: 305, street_name: 'Quebec Ave', unit_number: 21, city: 'Toronto', price: 1000.00, type_of_building: 'condo', description: 'Clean, cozy and nice appartment', number_of_bathrooms: 2, laundry: true, furnished: false, air_condition: true, parking: true, picture_url: '', lat: 43.661056, lng: -79.46998 },
      {user_id: users[0].id , postal_code: 'M6S 3J4', street_number: 65, street_name: 'Windermere Ave', unit_number: 655, city: 'Toronto', price: 800.00, type_of_building: 'House', description: 'Search no more! this is home sweet home...', number_of_bathrooms: 2, laundry: true, furnished: true, air_condition: false, parking: false, picture_url: '', lat: 43.639156, lng: -79.471549 },
      {user_id: users[0].id , postal_code: 'M4M 1V7', street_number: 27, street_name: 'Austin Ave', unit_number: 199, city: 'Toronto', price: 900.00, type_of_building: 'appartment', description: 'Quiet neighbourhood and close to TTC', number_of_bathrooms: 1, laundry: true, furnished: false, air_condition: true, parking: true, picture_url: '', lat: 43.667027, lng: -79.33863 },
      {user_id: users[0].id , postal_code: 'M4M 3C6', street_number: 143, street_name: 'Leslie St', unit_number: 133, city: 'Toronto', price: 1000.00, type_of_building: 'condo', description: 'Short Term Negotiable - Luxuriously furnished, spacious', number_of_bathrooms: 1, laundry: true, furnished: true, air_condition: true, parking: true, picture_url: '', lat: 43.664691, lng: -79.330583 },
      {user_id: users[0].id , postal_code: 'M4C 5N3', street_number: 75, street_name: 'Eastdale Ave', unit_number: 200, city: 'Toronto', price: 900.00, type_of_building: 'condo', description: 'Great location!', number_of_bathrooms: 1, laundry: true, furnished: false, air_condition: true, parking: true, picture_url: '', lat: 43.695167, lng: -79.300346 },
      {user_id: users[0].id , postal_code: 'M4C 2E6', street_number: 767, street_name: 'Sammon Ave', unit_number: 742, city: 'Toronto', price: 800.00, type_of_building: 'House', description: 'Spacious 1 bedroom apartments', number_of_bathrooms: 2, laundry: true, furnished: false, air_condition: false, parking: false, picture_url: '', lat: 43.690105, lng: -79.318832 }
    ]).returning('*');
  }

  function insertRequestors (users, places) {
    return knex('requestors').insert([
      {userid: users[1].id, placeid: places[0].id, accepted: false},
      {userid: users[2].id, placeid: places[0].id, accepted: false},
      {userid: users[3].id, placeid: places[0].id, accepted: false},
      {userid: users[4].id, placeid: places[0].id, accepted: false},
      {userid: users[1].id, placeid: places[1].id, accepted: false},
      {userid: users[2].id, placeid: places[1].id, accepted: false},
      {userid: users[3].id, placeid: places[1].id, accepted: false}
    ])
  }

  //Delete existing data
  await deleteRequestors()
    .then(deleteUsers)
    .then(deletePlaces)

  const users = await insertUsers();
  const places = await insertPlaces(users);
  const requestors = await insertRequestors(users, places);
}
