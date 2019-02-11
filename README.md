# Roomy

Roomy is a web application created to connect people who are looking for a room to live and for a room to rent out. The core piece of the application is people. Roomy is built in the way that people could see their matching score with potential roommates and make a decision based on that score. The matching score is based on habits, cleanliness, working/partying schedules, food preferences and personality. 


## Features

- User can search for available places to live.
- Users can see matching score for every owner.
- Google maps markers navigate to corresponing place component and vice-verse.
- Users can request to be roommates of the owner and owner can decline or accept.
- Email notifcation sent to user once the owner accepts.

## Getting Started

1. Clone or download the project to a new directory
2. Navigate to client folder and run 'npm install' to install all the dependencies
3. Return to root directory and navigate to server folder
4. Inside of server folder run 'npm install' to install all the dependencies
5. Inside of server folder run 'knex migrate:latest' to create database tables
6. Inside of server folder run 'knex seed:run' to seed the database with data
7. Start Express server with command 'node server.js' (inside of server folder)
8. Navigate to client folder and start react server with command 'npm start'
9. In your browser type in 'localhost:3000' to see the app

## Dependencies

- React
- Reactstrap
- Axios
- Node.js
- Express
- Knex.js
- Postgres
- Mailgun
- Google Maps API

## Screenshots

!["Roomy Demo"](https://github.com/StanleyTYLau/chatty_app/blob/master/docs/Chatty02.gif)
!["Roomy Demo"](https://github.com/StanleyTYLau/chatty_app/blob/master/docs/Chatty02.gif)