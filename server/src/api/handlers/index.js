import deleteHandlers from './delete';
import getHandlers from './get';
import postHandlers from './post';

module.exports = {
  get: {
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
