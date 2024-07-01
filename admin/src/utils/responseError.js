import { CastError } from '../utils/errors';

const responseError = (res, err) => { 
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Error server';

  if (err instanceof CastError) {
    statusCode = 400;
    message = 'Error types';
  }
  
  res.status(statusCode).json({
    error: true,
    message,
  });
};
  
export default responseError;
