const { unauthorized, internalError } = require('../utils/library/statusCode');

module.exports = (request, resolve, next) => {
  try {
    const { user: { role } } = request;
    if (role !== 'admin') {
      return resolve.status(unauthorized).json({ error: { message: 'Invalid user, not admin' } });
    }
    next();
  } catch (error) {
    console.log('ADMIN AUTH:', error);
    return resolve.status(internalError).json({ error: { message: 'Internal Server Error' } });
  }
};
