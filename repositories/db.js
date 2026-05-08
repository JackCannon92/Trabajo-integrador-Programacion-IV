const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost', 
  database: 'tpi_programacion_iv',
  password: '8520', 
  port: 5432, 
});

module.exports = pool;