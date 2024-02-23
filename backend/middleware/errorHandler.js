// Importing the statusCodes object from the constants module
const { statusCodes } = require("../constants/constants");

// Custom error handling middleware function
const errorHandler = (err, req, res, next) => {
  // Determine the HTTP status code from the response or default to 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Switch statement to handle different HTTP status codes
  switch (statusCode) {
    // Handling validation errors
    case statusCodes.VALIDATION_ERROR:
      res.json({
        title: "Validation error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    // Handling not found errors
    case statusCodes.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    // Handling unauthorized errors
    case statusCodes.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    // Handling internal server errors
    case statusCodes.INTERNAL_SERVER_ERROR:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    // Default case for other status codes, treating them as a general error
    default:
      res.status(400).json({
        error: true,
        title: "Something Went Wrong",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

// Exporting the errorHandler function for use in other modules
module.exports = errorHandler;
