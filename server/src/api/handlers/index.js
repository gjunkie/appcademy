const deleteHandlers = require('./delete');
const getHandlers = require('./get');
const postHandlers = require('./post');

module.exports = {
  get: {
    login: getHandlers.login,
    user: getHandlers.user,
    users: getHandlers.users,
  },
  post: {
    user: postHandlers.user,
  },
  delete: {
    user: deleteHandlers.user,
  },
};
