import DELETE from './delete';
import GET from './get';
import PATCH from './patch';
import POST from './post';

module.exports = {
  get: {
    games: GET.games,
    user: GET.user,
    users: GET.users,
  },
  patch: {
    user: PATCH.user,
  },
  post: {
    auth: POST.auth,
    game: POST.game,
    film: POST.film,
    joinGame: POST.joinGame,
    signUp: POST.signUp,
  },
  delete: {
    user: DELETE.user,
  },
};
