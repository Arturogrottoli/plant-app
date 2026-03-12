require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('CONEXION EXITOSA:', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('ERROR DE CONEXION:', err.message);
    process.exit(1);
  }
}

test();
