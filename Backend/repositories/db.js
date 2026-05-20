const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost', 
  database: 'fcad_cursos',
  password: '8520', 
  port: 5432, 
});

module.exports = pool;