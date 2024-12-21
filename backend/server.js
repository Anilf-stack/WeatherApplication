import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRoutes.js';
import weatherRoutes from './routers/weather.js';
import reportRoutes from './routers/report.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express(); 

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Weather Routes
app.use('/weather', weatherRoutes);
app.use('/report', reportRoutes);

// Auth Routes
app.use('/auth', authRouter);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send({ error: 'Page Not Found' });
});

// Server listening on specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
