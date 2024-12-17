class AppError {
    message;
    statusCode;
  
    constructor(message, statusCode=400, error=null) {
      this.message = message;
      this.statusCode = statusCode;
      this.error = error;
    }
  }
  
  module.exports = AppError;