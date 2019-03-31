import DELETE from './delete';
import GET from './get';
import PATCH from './patch';
import POST from './post';

module.exports = {
  get: {
    games: GET.games,
    nominees: GET.nominees,
    user: GET.user,
    users: GET.users,
  },
  patch: {
    artist: PATCH.artist,
    film: PATCH.film,
    user: PATCH.user,
  },
  post: {
    artist: POST.artist,
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
