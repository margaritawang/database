const settings = require('./settings');
const pg = require('pg');
const moment = require('moment');
const knex = require('knex') ({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

const req_param = process.argv.slice(2);

if (req_param.length != 3) {
  console.log('wrong format!');
  knex.destroy();
} else {
  knex('famous_people').insert({
    first_name: req_param[0],
    last_name: req_param[1],
    birthdate: req_param[2]
  }).asCallback(function(err, rows) {
    if (err) return console.error(err);
    console.log('Inserted!');
    // console.log(`Found ${rows.length} person(s) by the name ${req_param}: `);
    // console.log(`- ${rows[0].id}: ${rows[0].first_name} ${rows[0].last_name}, born ${moment(rows[0].birthdate).format('YYYY-MM-DD')}`);
});
}

knex.destroy();

