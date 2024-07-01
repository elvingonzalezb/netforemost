class ClientError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.statusCode = status;
  }
}

class CastError extends Error {
  constructor(message = 'Error types', status = 400) {
    super(message);
    this.statusCode = status;
  }
}

export { ClientError, CastError };
