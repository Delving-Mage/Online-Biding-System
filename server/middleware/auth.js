const jwt = require('jsonwebtoken');

// Middleware to verify JWT
function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Verify token
    req.user = decoded; // Attach user info to request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
