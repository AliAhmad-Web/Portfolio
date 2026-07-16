export class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden', errors = null) {
    super(403, message, errors);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends ApiError {
  constructor(message = 'Validation failed', errors = null) {
    super(422, message, errors);
    this.name = 'ValidationError';
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(400, message);
    this.name = 'BadRequestError';
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(409, message);
    this.name = 'ConflictError';
  }
}
