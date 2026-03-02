const express = require('express');
const authenticate = require('../middleware/auth');
const pool = require('../db');

const router = express.Router();
router.use(authenticate);

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM plants WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, species, image, watering_days, description, watering_info, sunlight, toxicity } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO plants (user_id, name, species, image, watering_days, description, watering_info, sunlight, toxicity)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [req.user.id, name, species, image, watering_days || 3, description, watering_info, sunlight, toxicity]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM plants WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
