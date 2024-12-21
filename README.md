Weather Application - README

### Overview

- The Weather Application is a full-stack project that allows users to:

- Register and log in to their accounts securely.

- Search for real-time weather data for any city.

- View a history of their weather searches, linked to their accounts.

- This application is built using the following technologies:

- Frontend: React.js

- Backend: Node.js, Express.js

- Database: MySQL

- Weather API: Weatherstack

## Frontend

- Features

- User Authentication: Secure user registration and login.

- Weather Search: Fetch real-time weather data for any city using the Weatherstack API.

- Search History: View a list of past searches.

- Responsive Design: Optimized for both desktop and mobile devices.

# Setup

- Navigate to the frontend directory:

- cd frontend

- Install dependencies:

- npm install

- Start the development server:

- npm start

- The application will be accessible at http://localhost:3000/.

- Environment Variables

- Create a .env file in the frontend directory with the following:

- REACT_APP_BACKEND_URL=http://localhost:5000

- Replace http://localhost:5000 with your backend's base URL if different.

## Backend

- Features

- User Authentication: Secure registration and login with hashed passwords.

- JWT Authentication: Protected routes using JSON Web Tokens.

- Weather Search: Fetch weather data for a city using the Weatherstack API.

- Search History: Store and retrieve user-specific search history.

# Setup

- Navigate to the backend directory:

- cd backend

- Install dependencies:

- npm install

- Create a MySQL database:

- CREATE DATABASE authentication;

- Set up the database schema:

- CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

- CREATE TABLE weather_searches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    city VARCHAR(255),
    weather_info JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

- Create a .env file in the backend directory with the following:

- DB_HOST=127.0.0.1
- DB_USER=root
- DB_PASSWORD=yourpassword
- DB_NAME=authentication
- DB_PORT=3306
- JWT_SECRET=your_jwt_secret
- WEATHERSTACK_API_KEY=your_weatherstack_api_key
- PORT=5000

- Replace the placeholders with your actual database credentials and Weatherstack API key.

- Start the server:

- npm start

- The backend will be accessible at http://localhost:5000/.

## API Endpoints

# Authentication

- POST /auth/register: Register a new user.

- POST /auth/login: Login and retrieve a JWT token.

# Weather

- GET /weather/:city: Fetch weather data for a city (protected).

# Reports

- GET /report/: Retrieve weather search history.

# Middleware

- verifyToken: Ensures that protected routes can only be accessed by authenticated users.

-Running the Full Application

- Start the backend server:

- cd backend
- npm start

- Start the frontend development server:

cd frontend
npm start

Open your browser and navigate to http://localhost:3000/ to use the application.

# Additional Notes

Ensure your MySQL server is running before starting the backend.

Replace placeholder values in the .env files with your actual credentials and keys.

Weather data is fetched using the Weatherstack API. Ensure your API key is valid and has sufficient usage limits.

# Future Improvements

Add password recovery functionality.

Implement role-based access control.

Enhance frontend design with animations and advanced features.

Optimize backend queries and add caching for frequently searched cities.

# License

This project is open-source and available under the MIT License.

