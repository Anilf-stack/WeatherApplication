import express from 'express';
import pool from '../config/db.js'; // Importing the database connection pool
import axios from 'axios'; // Importing axios to make HTTP requests
import { verifyToken } from '../middleware/auth.js'; // Importing the token verification middleware

const router = express.Router();

// Route to search weather for a city
router.get('/:city', verifyToken, async (req, res) => {
  const { city } = req.params;
  const userId = req.user; // Access the user ID from the decoded token

  try {
    const apiKey = process.env.WEATHERSTACK_API_KEY; // Weatherstack API key from environment variable
    // Make an API call to Weatherstack to get weather info for the specified city
    const response = await axios.get('http://api.weatherstack.com/current', {
      params: { access_key: apiKey, query: city },
    });

    // If the API returns an error, respond with an error message
    if (response.data.success === false) {
      return res.status(400).json({ message: response.data.error.info });
    }

    const weatherInfo = response.data;

    // Save the weather information into the database for the authenticated user
    await pool.query(
      'INSERT INTO weather_searches (user_id, city, weather_info) VALUES (?, ?, ?)',
      [userId, city, JSON.stringify(weatherInfo)] // Store weather data as a JSON string
    );

    // Respond with the weather data from the API
    res.json(weatherInfo);
  } catch (err) {
    // In case of error, send a response with error message
    res.status(400).send('Error: ' + err.message);
  }
});

export default router;

