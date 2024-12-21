import express from 'express';
import pool from '../config/db.js'; // Importing the database connection pool

const router = express.Router();

// Route to fetch weather reports along with user information
router.get('/', async (req, res) => {
  try {
    // Query to join users and weather_searches tables to get relevant weather reports
    const [rows] = await pool.query(`
      SELECT u.username, w.city, w.weather_info, w.created_at
      FROM weather_searches w
      JOIN users u ON w.user_id = u.id
    `);

    // Respond with the rows (weather reports)
    res.json(rows);
  } catch (err) {
    // In case of error, send a response with error message
    res.status(400).send('Error: ' + err.message);
  }
});

export default router;
