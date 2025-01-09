const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and redirect unauthenticated users
const verifyTokenAndRedirect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    // Redirect to login page if no token is found
    return res.redirect('/login?error=no_token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If token is expired or invalid, redirect to login with an error message
    if (error instanceof jwt.TokenExpiredError) {
      return res.redirect('/login?error=token_expired');
    }
    // For other errors (invalid token)
    return res.redirect('/login?error=invalid_token');
  }
};

module.exports = verifyTokenAndRedirect;
