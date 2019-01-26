# roomy
Web application that helps people find roommates and places to live.

##Instructions
1) Go to the 'server' folder;
2) Run psql command in your terminal;
3) Inside of psql run 'CREATE DATABASE roomy OWNER labber';
4) Exit psql ('\q');
5) Run the latest migration ('knex migrate:latest')
6) Run seeds ('knex seed:run');