import deleteHandlers from './delete';
import getHandlers from './get';
import patchHandlers from './patch';
import postHandlers from './post';

module.exports = {
  get: {
    games: getHandlers.games,
    user: getHandlers.user,
    users: getHandlers.users,
  },
  patch: {
    user: patchHandlers.user,
  },
  post: {
    auth: postHandlers.auth,
    game: postHandlers.game,
    signUp: postHandlers.signUp,
  },
  delete: {
    user: deleteHandlers.user,
  },
};
