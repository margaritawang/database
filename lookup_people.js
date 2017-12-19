const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const req_param = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error('connection error', err);
  }
  // console.log(req_param);
  client.query('SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1::text OR last_name = $1::text', [req_param], (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log('Searching...');
    console.log(`Found ${result.rows.length} person(s) by the name ${req_param}: `);
    console.log(`- 1: ${result.rows[0].first_name} ${result.rows[0].last_name}, born ${result.rows[0].birthdate}`);
    client.end();
  });
});
