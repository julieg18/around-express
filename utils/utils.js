function sendError({ res, err, defaultErrMessage }) {
  let statusCode;
  let message;
  switch (err.name) {
    case 'ValidationError':
      statusCode = 400;
      message = err.message;
      break;
    case 'CastError':
      statusCode = 404;
      message = err.message;
      break;
    default:
      statusCode = 500;
      message = defaultErrMessage;
  }
  res.status(statusCode).send({ message });
}

module.exports = { sendError };
