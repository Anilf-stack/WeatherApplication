import express from "express";
import bcrypt from "bcrypt"; // Importing bcrypt to hash passwords
import pool from "../config/db.js"; // Importing the database connection pool
import jwt from "jsonwebtoken"; // Importing jsonwebtoken to generate JWT tokens
import dotenv from "dotenv"; // Importing dotenv for environment variables

dotenv.config(); // Loading environment variables from .env file

const router = express.Router();

// Registration Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate that all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Query the database to check if the user with the provided email already exists
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    // If the user already exists, return a conflict response
    if (rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password using bcrypt with a salt rounds value of 10
    const hashPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashPassword]);

    // Respond with a success message
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    // In case of error, respond with a server error message
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate that both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Query the database to find a user by email
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    // If no user found, return a 'User not found' response
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an unauthorized response
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Generate a JWT token with the user ID
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3h", // Set token expiration to 3 hours
    });

    // Respond with the generated JWT token
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    // In case of error, respond with a server error message
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

export default router;
