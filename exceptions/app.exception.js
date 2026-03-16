export class AppException extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationException extends AppException {
  constructor(message) {
    super(message, 400);
  }
}

export class NotFoundException extends AppException {
  constructor(message) {
    super(message, 404);
  }
}

export class InternalException extends AppException {
  constructor(message) {
    super(message, 500, false);
  }
}
