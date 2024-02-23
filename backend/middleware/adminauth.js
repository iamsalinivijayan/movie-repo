// Importing the 'jsonwebtoken' library for handling JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");

// Importing the User model for database operations related to users
const User = require("../model/userModel");

// Middleware for user authentication using JWT
const adminauth = async (req, res, next) => {
  try {
    // Retrieve the JWT token from the 'Authorization' cookie in the request
    const token = req.cookies?.Authorization;

    // If no token is found, respond with a 401 status and throw an error
    if (!token) {
      res.status(401);
      throw new Error("Token not found");
    }

    // Verify the JWT token using the secret key stored in the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token has expired, respond with a 401 status, and throw an error
    if (Date.now() > decoded.exp) {
      res.status(401);
      throw new Error("Token expired");
    }

    // Retrieve the user information from the database using the user ID in the token
    const user = await User.findById(decoded.sub);
    console.log("user", user)

    // If no user is found, respond with a 401 status and throw an error
    if (!user || !user.is_admin)  {
      res.status(401);
      throw new Error("Unauthorized user");
    }

    // Attach the user information to the request object for later use in route handlers
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Log any errors that occur during the authentication process
    console.log(error);
  }
};

// Exporting the authentication middleware for use in other modules
module.exports = adminauth;
