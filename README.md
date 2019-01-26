# roomy
Web application that helps people find roommates and places to live.

##Instructions
1) goto root folder and run 'npm install' to get all dependencies.
2) Go to the 'server' folder;
3) Run psql command in your terminal;
4) Inside of psql run 'CREATE DATABASE roomy OWNER labber';
5) Exit psql ('\q');
6) Run the latest migration ('knex migrate:latest')
7) Run seeds ('knex seed:run');