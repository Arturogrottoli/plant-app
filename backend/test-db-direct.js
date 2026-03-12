require('dotenv').config();
const { Pool } = require('pg');

// Intentamos conexión directa sin pooler si el pooler falla
const directUrl = 'postgresql://postgres:nbafinals2022@db.sokpydptidpaexsxzxsv.supabase.co:5432/postgres';

const pool = new Pool({
  connectionString: directUrl,
  ssl: { rejectUnauthorized: false },
});

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('CONEXION EXITOSA DIRECTA:', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('ERROR DE CONEXION DIRECTA:', err.message);
    process.exit(1);
  }
}

test();
