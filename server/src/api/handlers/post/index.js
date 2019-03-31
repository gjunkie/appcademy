// Create all of your POST handlers in this folder, then import
// and export them here.
import artist from './artist';
import auth from './auth';
import film from './film';
import game from './game';
import joinGame from './joinGame';
import signUp from './signUp';

const routes = {
  artist,
  auth,
  film,
  game,
  joinGame,
  signUp,
};

export default routes;
