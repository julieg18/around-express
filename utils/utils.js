function sendError({
  res,
  err,
  castErrMessage = 'Not found',
  validationErrMessage = 'Validation failed',
}) {
  let statusCode;
  let message;
  switch (err.name) {
    case 'ValidationError':
      statusCode = 400;
      message = validationErrMessage;
      break;
    case 'CastError':
      statusCode = 404;
      message = castErrMessage;
      break;
    default:
      statusCode = 500;
      message = 'Internal server error';
  }
  res.status(statusCode).send({ message });
}

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = { sendError, urlRegex };
