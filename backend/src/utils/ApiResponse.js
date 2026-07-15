export class ApiResponse {
  constructor(statusCode, message, data = null, meta = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }

  static ok(message, data = null, meta = null) {
    return new ApiResponse(200, message, data, meta);
  }

  static created(message, data = null) {
    return new ApiResponse(201, message, data);
  }

  static noContent() {
    return new ApiResponse(204, 'No content');
  }
}

export function sendResponse(res, apiResponse) {
  const { statusCode, message, data, meta, success } = apiResponse;

  if (statusCode === 204) {
    return res.status(204).send();
  }

  const payload = {
    success,
    message,
    ...(data !== null && { data }),
    ...(meta !== null && { meta }),
  };

  return res.status(statusCode).json(payload);
}
