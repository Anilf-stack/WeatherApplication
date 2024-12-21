import jwt from 'jsonwebtoken';  // Importing the jsonwebtoken library to handle JWTs

// Middleware function to verify the JWT token
export const verifyToken = (req, res, next) => {
  try {
    // Extract the token from the 'Authorization' header
    // The token is typically sent as 'Bearer <token>' so we split and get the second part
    const token = req.headers['authorization']?.split(' ')[1];

    // If no token is provided, return an unauthorized error
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token using the secret key stored in environment variables
    // jwt.verify will decode the token and throw an error if the token is invalid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store the decoded user ID from the token in the request object for further use
    // The 'decoded' object contains the information encoded in the JWT
    req.user = decoded.id;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid or expired, return a forbidden error
    return res.status(403).json({ message: 'Invalid token' });
  }
};
