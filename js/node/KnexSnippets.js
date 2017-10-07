/*
  knex allows you to do db things really easily in node

  npm install --save knex pg
*/


/*
#########POSTGRESQL COMMANDS########


sudo -u postgres psql postgres
  ∘ login to postgres user and run CLI
\q
  ∘ quit
\dt
  ∘ list tables
\l
  ∘ list databases
\du
  ∘ list users
SELECT * FROM __tablename__;
  ∘ shows all the rows in the table

CREATE ROLE username WITH LOGIN PASSWORD 'quoted password'

ALTER ROLE username CREATEDB;

CREATE DATABASE databasename;

GRANT ALL PRIVILEGES ON DATABASE databasename TO username;

DELETE FROM __tablename__;
    --empties table

*/

/*
#########KNEX COMMANDS#######

knex init
  ∘ generates knexfile.js

knex migrate:make migration_name
  ∘ make a new migration.js file

knex migrate:latest
  ∘ update database to latest migration

knex seed:make seed_name
  ∘ make a new seed

knex seed:run
  ∘ run the seeds
*/



/*
#########knexfile.js#######
*/
module.exports = {
  development: {
   client: 'pg',
   connection: {
     user: 'postgres',
     password: 'orangepi',
     database: 'passport_local_knex'
   },
   migrations: {
     directory: __dirname + '/db/migrations'
   },
   seeds: {
     directory: __dirname + '/db/seeds/development'
   }
  }
};



/*
#########normal JS########
*/


/*
  referencing knex first you need to call this

*/
const knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'postgres',
    password: 'orangepi',
    database: 'passport_local_knex'
  }
})


/*
  Inserting stuff into table
*/
knex('users').insert({
  username:"mreow",
  password:"mreow",
  admin:false,
  created_at:new Date()
}).then(function(resp){
  //success
}).catch(function(err){
  console.error(err);
});


/*
  Query table for values

  gets rows where votes >100 and then returns the rows but just the ID's
*/
var subquery = knex('users').where('votes', '>', 100).select('id');


/*
  Query table for values and functional programming it

  get rows where username=admin; resp is all the rows given in a promise
*/
knex('users').where({
  username: "admin"
}).then(function(resp){

});
