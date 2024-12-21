import mysql from 'mysql2/promise';  // Import MySQL library with promise support
import dotenv from 'dotenv';  // Import dotenv to load environment variables from .env file

// Load environment variables from the .env file
dotenv.config();

// Create a MySQL connection pool to manage multiple database connections
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',  // Database host (defaults to localhost if not specified)
  user: process.env.DB_USER || 'root',  // Database username (defaults to 'root' if not specified)
  password: process.env.DB_PASSWORD || '',  // Database password (defaults to an empty string if not specified)
  database: process.env.DB_NAME || 'authentication',  // Database name (defaults to 'authentication' if not specified)
  port: process.env.DB_PORT || 3306,  // Database port (defaults to 3306 if not specified)
  waitForConnections: true,  // Allow connections to be queued when the pool is at its connection limit
  connectionLimit: 10,  // Maximum number of connections to create at once in the pool
  queueLimit: 0,  // Limit for the number of queued connection requests (0 means no limit)
});

// Test the database connection by getting a connection from the pool
pool.getConnection()
  .then((connection) => {
    // If connection is successful, log success and release the connection back to the pool
    console.log("Database connected successfully");
    connection.release();  // Release the connection back to the pool to be reused
  })
  .catch((err) => {
    // If the connection fails, log the error details including message, stack trace, and error code
    console.error("Database connection failed:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
    });
  });


export default pool;
